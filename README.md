# Web Onboarding Infra

This project is for the web onboarding infra which is a CloudFront distribution with an S3 bucket <br/>
to host a static SPA site

## Prerequisites

* AWS Momentum Money Account
* Node JS
* AWS CDK

## Getting started

### Deploy the Function stack first

The function should be considered as a separate component to the cloudfront distro<br/>
this is because we want the flexibility to update 1 without the other.

### Deploying the CloudFront distribution stack

Once the function is deployed copy the ARN into the project and deploy the distro
The **S3 bucket has delete protection** and has to be **manually deleted** when after you destroy the stack

### Deploying to different environments

For maintaining separate environments we use long live branching strategy<br/>

#### Branches:

* pre: used for testing and pre setup
* prod: changes from pre to be merged into this one


Pre environment settings

```typescript
const env: string = Args.getValue(Args.ENV, app)
const stack: string = Args.getValue(Args.STACK, app)
const region: string = Args.getValue(Args.REGION, app)
```

```bash
cdk deploy -c env=pre
```

Deploying to the prod environment

Prod environment settings

```typescript
const env: string = Args.getValue(Args.ENV, app)
const stack: string = Args.getValue(Args.STACK, app)
const region: string = Args.getValue(Args.REGION, app)
```

```bash
cdk deploy -c env=prod
```

Important functions for pre

deploy changes
```bash
cdk deploy -c env=pre
```

delete all infra
```bash
cdk destroy -c env=pre
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
