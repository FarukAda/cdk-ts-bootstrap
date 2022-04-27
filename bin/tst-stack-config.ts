import { ICdkTsBootstrapStackProps } from './stack-environment-types';

const tstEnvironmentConfig: ICdkTsBootstrapStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkTsBootstrap',
  },
  environment: 'tst',
};

export default tstEnvironmentConfig;