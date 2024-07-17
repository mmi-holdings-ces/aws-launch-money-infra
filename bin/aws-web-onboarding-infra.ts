#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LaunchmoneyInfraStack } from '../lib/aws-web-onboarding-infra-stack';
import { Account, Args, StackType } from '../lib/constants';

const app = new cdk.App();
app.node.getContext('env')
const env: string = Args.getValue(Args.ENV, app)
const stack: string = Args.getValue(Args.STACK, app)
const region: string = Args.getValue(Args.REGION, app)


console.log(stack)

new LaunchmoneyInfraStack(app, `LaunchmoneyInfraStack${env.toUpperCase()}`, {
  envName: env,
  stackType: stack,
  env: {
    account: Account.getNumber(env),
    region: region
  }
})

console.log("Printing account number",Account.getNumber(env))

app.synth()