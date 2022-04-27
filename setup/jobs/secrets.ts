import { Octokit } from '@octokit/rest';
import { EncryptSecret } from './encrypt';

export interface GithubRepo {
    id: number,
    name: string
}

// Adds encrypted secret to github repository
export const addGithubSecret = async (
    repo: GithubRepo,
    secret: string,
    secretName: string,
    octokit: Octokit,
    OWNER: string,
) => {
    const { encrypted, keyId } = await EncryptSecret(repo.name, secret, OWNER, octokit);
    await octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
        owner: OWNER,
        repo: repo.name,
        secret_name: secretName,
        encrypted_value: encrypted,
        key_id: keyId,
    });
};

// Adds acces key and secret key to reporitory environment
export const SecretGitHub = async (
    repo: GithubRepo,
    octokit: Octokit,
    OWNER: string,
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
) => {
    await addGithubSecret(repo, AWS_ACCESS_KEY_ID, 'AWS_ACCESS_KEY_ID', octokit, OWNER);
    await addGithubSecret(repo, AWS_SECRET_ACCESS_KEY, 'AWS_SECRET_ACCESS_KEY', octokit, OWNER);
};