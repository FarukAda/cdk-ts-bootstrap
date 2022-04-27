import { ICdkTsBootstrapStackProps } from './stack-environment-types';

const devEnvironmentConfig: ICdkTsBootstrapStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkTsBootstrap',
  },
  environment: 'dev',
};

export default devEnvironmentConfig;