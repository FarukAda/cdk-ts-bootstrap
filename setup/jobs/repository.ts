import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';
import simpleGit, { SimpleGit } from 'simple-git';

// Creates a new repository and pushed new stack
export const RepositoryCreation = async (newRepoPath: string, newRepoName: string, OWNER: string, GITHUB_TOKEN: string) => {
    const newRepoGit: SimpleGit = simpleGit(newRepoPath);
    const newRepoRemote = `https://${GITHUB_TOKEN}@github.com/${OWNER}/${newRepoName}.git`;

    await newRepoGit.init();
    await newRepoGit.addRemote('origin', newRepoRemote);

    const remoteResponse = await newRepoGit.listRemote([newRepoRemote]);
    if (remoteResponse !== '') {
        throw new Error('Remote repository is not empty!');
    }

    // remove setup dependencies and install needed dependencies
    execSync(`cd ${newRepoPath} && npm install && npm up`);

    await newRepoGit.addConfig('user.name', 'github-actions');
    await newRepoGit.addConfig('user.email', 'faruk88ada@gmail.com');
    await newRepoGit.add('./*');
    await newRepoGit.commit('Initial commit');
    await newRepoGit.branch(['-M', 'main']);
    await newRepoGit.push('origin', 'main');
};

export const BranchAutoDeletion = async (
    repoName: string,
    OWNER: string,
    octokit: Octokit,
) => {
    await octokit.request('PATCH /repos/{owner}/{repo}', {
        owner: OWNER,
        repo: repoName,
        delete_branch_on_merge: true,
    });
};