#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTsBootstrapStack } from '../lib/cdk-ts-bootstrap-stack';

// importing configuration based on environment
import devEnvironmentConfig from './dev-stack-config';
import tstEnvironmentConfig from './tst-stack-config';
import prdEnvironmentConfig from './prd-stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new CdkTsBootstrapStack(app, 'cdk-ts-bootstrap-dev', devEnvironmentConfig);
new CdkTsBootstrapStack(app, 'cdk-ts-bootstrap-tst', tstEnvironmentConfig);
new CdkTsBootstrapStack(app, 'cdk-ts-bootstrap-prd', prdEnvironmentConfig);