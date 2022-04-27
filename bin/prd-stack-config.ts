import { ICdkTsBootstrapStackProps } from './stack-environment-types';

const prdEnvironmentConfig: ICdkTsBootstrapStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkTsBootstrap',
  },
  environment: 'prd',
};

export default prdEnvironmentConfig;