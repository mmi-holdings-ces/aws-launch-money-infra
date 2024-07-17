import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackType } from './constants';
import { LaunchMoneyCloudFront, LaunchMoneyCloudFrontFunction } from './money-cloud-front';

export interface AwsWebOnboardingProps extends cdk.StackProps {
  envName: string,
  stackType: string
}

export class LaunchmoneyInfraStack extends cdk.Stack {
  moneyFunction: LaunchMoneyCloudFrontFunction
  moneyCfDistro: LaunchMoneyCloudFront
  constructor(scope: Construct, id: string, props: AwsWebOnboardingProps) {
    super(scope, id, props);

    const env = props.envName
    const stack = props.stackType

    console.log(`stack selected: ${stack}`)

    if (stack == StackType.FUNCTION || stack == StackType.ALL) {
      this.moneyFunction = new LaunchMoneyCloudFrontFunction(this, `MoneyCfFunction${env.toUpperCase()}`, env)
    }

    if (stack == StackType.CLOUD_FRONT || stack == StackType.ALL) {
      this.moneyCfDistro = new LaunchMoneyCloudFront(this, `MoneyCf${env.toUpperCase()}`, env)
    }
  }
}
