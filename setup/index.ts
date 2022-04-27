import 'dotenv/config';
import * as fs from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';
import { Octokit } from '@octokit/rest';

// Importing jobs for setup
import { InputValue } from './jobs/input';
import { ValidateInput } from './jobs/validate';
import { RenameStack } from './jobs/rename';
import { SecretGitHub } from './jobs/secrets';
import * as repo from './jobs/repository';
import * as clean from './jobs/clean';

export interface GithubRepo {
    id: number,
    name: string
}

const OWNER = 'FarukAda';
const GITHUB_TOKEN = process.env.MT_GITHUB_TOKEN as string;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

// initialized in main()
let octokit: Octokit;

const main = async () => {
    const argv = await InputValue();
    const newRepoName = argv.name;
    const newRepoPath = './' + newRepoName;

    octokit = new Octokit({
        auth: GITHUB_TOKEN,
    });

    // create repository in github.
    await octokit.repos.createInOrg({
        org: OWNER,
        name: newRepoName,
        private: true,
    });
    console.log('(1/8) Repository Created...');

    const newGithubRepo: GithubRepo = await ValidateInput(
        newRepoName,
        newRepoPath,
        octokit,
        OWNER,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
    );
    console.log('(2/8) Validation Done...');

    // setup aws account(s) as github secrets.
    await Promise.all([
        SecretGitHub(
            newGithubRepo,
            octokit,
            OWNER,
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY,
        ),
    ]);
    console.log('(3/8) Creating Github Secrets...');

    // checkout boilerplate repo and remove git information.
    const boilerplateGit: SimpleGit = simpleGit();
    await boilerplateGit.clone(`https://${GITHUB_TOKEN}@github.com/${OWNER}/mt-aws-cdk-bootstrap.git`, newRepoPath);
    fs.rmdirSync(`${newRepoPath}/.git`, { recursive: true });
    console.log('(4/8) Cloned mt-aws-cdk-bootstrap...');

    // repace boilerplate names with new repo names.
    await RenameStack(
        newRepoPath,
        newGithubRepo.name,
    );
    console.log('(5/8) Done Renaming New Stack...');

    // cleanup setup before committing.
    await clean.CleanFiles(newRepoPath);
    await clean.CleanDirectory(newRepoPath);
    await clean.CleanDependencies(newRepoPath);
    console.log('(6/8) Cleaned up setup files...');

    // initialize new repo and push the initial commit.
    await repo.RepositoryCreation(
        newRepoPath,
        newGithubRepo.name,
        OWNER,
        GITHUB_TOKEN,
    );
    console.log('(7/8) Pushed Changes to Github...');

    await repo.BranchAutoDeletion(
        newGithubRepo.name,
        OWNER,
        octokit,
    );
    console.log('(8/8) Finished...');
};

main().catch((error: any) => {
    console.error(error);
    process.exit(1);
});