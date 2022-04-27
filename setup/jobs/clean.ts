import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export const CleanFiles = async (newRepoPath: string) => {
    const githubSetupAction = path.resolve(newRepoPath, '.github', 'workflows', 'create_stack.yaml');
    fs.rm(githubSetupAction, (err: any) => {
        if (err) {
            console.log(err)
        }
    });
};

export const CleanDirectory = async (newRepoPath: string) => {
    const setupDirectory = path.resolve(newRepoPath, 'setup');
    fs.rm(setupDirectory, { recursive: true, force: true }, (err: any) => {
        if (err) {
            console.log(err)
        }
    });
};

export const CleanDependencies = async (newRepoPath: string) => {
    const setupDependencies = '@octokit/rest @octokit/types @types/camelcase @types/yargs @types/libsodium-wrappers acorn ajv ajv-keywords camelcase dotenv replace-in-file simple-git standard-version libsodium-wrappers yargs';
    execSync(`cd ${newRepoPath} && npm uninstall ${setupDependencies}`);
}
