[![CDK Version](https://img.shields.io/badge/CDK-2.29.1-orange)](https://docs.aws.amazon.com/cdk/api/versions.html)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-4.7.4-blue)](https://www.typescriptlang.org/download)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fatrox%2Fsync-dotenv%2Fbadge&style=flat)](https://github.com/CodingWithFaruci/cdk-ts-bootstrap/actions)

# **AWS CDK TypeScript Bootstrap**

## **Description:**

    This repository can be used to bootstrap a new AWS CDK TypeScript project on GitHub.
    Bootstrapped project will contain: 
        * Jest for unit testing.
        * ESLint for static code analysis.
        * Webpack for compression.
        * GitHub Action CI/CD workflows for deploying to the AWS Cloud.

### **Overview:**

<p align="center">
    <img src="./setup/bootstrap.png" width="800" height="200" />
</p>

### **Prerequisites:**

In order to use this project you will need:

* a GitHub Organisation Account
* a GitHub Personal access tokens
* an AWS Account
* AWS Programmatic access:
  * AWS_ACCESS_KEY_ID
  * AWS_SECRET_ACCESS_KEY

### **Usage:**

* Fork this repository to your own GitHub organisation.
* Save your GitHub Personal access tokens in the secrets of the forked repository.
* Save your AWS acces key and secret acces key in the secrets  of the forked repository.
* Change the value for OWNER to your GitHub organisation in ./setup/index.ts.
* Run the create workflow by entering new project name.

### **Useful commands:**

| Command  | Description    |
|----------|----------------|
|`npm run build`|compile typescript to js|
|`npm run test`|perform the jest unit tests|
|`npm run lint`|perform static analyses on code|
|`cdk bootstrap`|bootstrap aws for cdk on first time using cdk|
|`cdk diff`|compare deployed stack with current state|
|`cdk synth`|emits the synthesized CloudFormation template|
|`cdk deploy`| deploy this stack to your default AWS account/region|
