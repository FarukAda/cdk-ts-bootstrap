#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTsBootstrapStack } from '../lib/cdk-ts-bootstrap-stack';

// importing configuration based on environment
import environmentConfig from './stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new CdkTsBootstrapStack(app, 'cdk-ts-bootstrap', environmentConfig);