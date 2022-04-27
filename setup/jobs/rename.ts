import * as fs from 'fs';
import * as path from 'path';
import * as camelcase from 'camelcase';
import * as replace from 'replace-in-file';

export const RenameStack = async (newRepoPath: string, newRepoName: string) => {
    const newReponamePascalCase = camelcase(newRepoName, { pascalCase: true });

    const stackFileName = path.resolve(newRepoPath, 'lib', 'cdk-ts-bootstrap-stack.ts');
    const appFileName = path.resolve(newRepoPath, 'bin', 'cdk-ts-bootstrap-stack.ts');
    const environmentFilesDev = path.resolve(newRepoPath, 'bin', 'dev-stack-config.ts');
    const environmentFilesTst = path.resolve(newRepoPath, 'bin', 'tst-stack-config.ts');
    const environmentFilesPrd = path.resolve(newRepoPath, 'bin', 'prd-stack-config.ts');
    const stackInterface = path.resolve(newRepoPath, 'bin', 'stack-environment-types.ts');
    const cdkTestFileName = path.resolve(newRepoPath, 'test', 'cdk-ts-bootstrap.test.ts');
    const packageFileName = path.resolve(newRepoPath, 'package.json');
    const cdkFileName = path.resolve(newRepoPath, 'cdk.json');

    await replace.replaceInFile({
        files: [stackFileName, environmentFilesDev, environmentFilesTst, environmentFilesPrd, stackInterface],
        from: /ICdkTsBootstrapStackProps/g,
        to: `I${newReponamePascalCase}StackProps`,
    });
    await replace.replaceInFile({
        files: [stackFileName, appFileName, cdkTestFileName],
        from: /CdkTsBootstrapStack/g,
        to: `${newReponamePascalCase}Stack`,
    });
    await replace.replaceInFile({
        files: [appFileName, cdkTestFileName, packageFileName, cdkFileName],
        from: /cdk-ts-bootstrap/g,
        to: newRepoName,
    });

    fs.renameSync(stackFileName, path.resolve(newRepoPath, 'lib', `${newRepoName}-stack.ts`));
    fs.renameSync(appFileName, path.resolve(newRepoPath, 'bin', `${newRepoName}.ts`));
    fs.renameSync(cdkTestFileName, path.resolve(newRepoPath, 'test', `${newRepoName}.test.ts`));
};