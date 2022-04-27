import { Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

// extended stack environment props
import { ICdkTsBootstrapStackProps } from '../bin/stack-environment-types';

export class CdkTsBootstrapStack extends Stack {
  constructor(scope: Construct, id: string, props: ICdkTsBootstrapStackProps) {
    super(scope, id, props);

    // example resource
    new sqs.Queue(this, 'CdkTsBootstrapQueue', {
      queueName: 'testName',
      visibilityTimeout: Duration.seconds(300),
    });
  }
}
