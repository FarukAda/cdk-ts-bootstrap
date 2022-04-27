import * as yargs from 'yargs';

// Input received from the runner
export const InputValue = async () => {
    return yargs.options({
        name: {
            alias: 'n',
            type: 'string',
            demandOption: true,
            description: 'Repository name as stated on Github. Will also be used to name CDK stack.',
        },
    }).argv;
};