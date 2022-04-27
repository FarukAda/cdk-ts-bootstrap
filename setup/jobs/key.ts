import { Octokit } from '@octokit/rest';

export interface GithubEnvPublicKey {
    key: string,
    keyId: string
}

// Get github key for pushing to new repo
export const KeyGitHub = async (
    repoName: string,
    OWNER: string,
    octokit: Octokit,
): Promise<GithubEnvPublicKey> => {
    const keyResponse = await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
        owner: OWNER,
        repo: repoName,
    });
    const newEnvKey = { key: keyResponse.data.key, keyId: keyResponse.data.key_id };
    return newEnvKey;
};