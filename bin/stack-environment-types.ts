import { StackProps } from 'aws-cdk-lib';

export interface ICdkTsBootstrapStackProps extends StackProps {
  environment: string
}