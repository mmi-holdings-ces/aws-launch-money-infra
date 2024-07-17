import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { CachePolicy, Distribution, Function, FunctionCode, FunctionEventType } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Account } from "./constants";

export class LaunchMoneyCloudFrontFunction extends Construct {
    cfFunction: Function

    constructor(scope: Construct, id: string, env: string) {
        super(scope, id)

        this.cfFunction = new Function(this, `LaunchMoneyFunction${env.toLowerCase()}`, {
            functionName: Account.FUNCTION_NAME,
            code: FunctionCode.fromFile({
              filePath: 'resources/spa.js'
            }),
        })
    }
}

export class LaunchMoneyCloudFront extends Construct {
    cloudFrontDistro:Distribution

    constructor(scope: Construct, id: string, env: string) {
        super(scope, id)

        const envAppend = env.toUpperCase()

        const requestFunction = Function.fromFunctionAttributes(this, `LaunchMoneyRedirectSpa${envAppend}`, {
            functionName: Account.FUNCTION_NAME,
            functionArn: Account.getValueOf(env, Account.FUNCTION_ARN)
        })

        const bucket = new Bucket(this, `LaunchMoneyOnboardingBucket${env.toUpperCase()}`, {
            bucketName: `launch-web-onboarding-${env}`,
            encryption: BucketEncryption.S3_MANAGED,
        })
        

        const certificateArn = Account.getValueOf(env, Account.MOM_MONEY_CERT)
        const domainNames = [ Account.getValueOf(env, Account.DOMAIN_NAME) ]

        console.log(domainNames)

        this.cloudFrontDistro = new Distribution(this, `LaunchMoneyDistro${envAppend}`, {
            certificate: Certificate.fromCertificateArn(this, `LaunchMoneyCert${envAppend}`, certificateArn),
            domainNames:domainNames,
            defaultBehavior: {
              origin: new S3Origin(bucket, {}),
              cachePolicy: (env !== Account.PROD) ? CachePolicy.CACHING_DISABLED : CachePolicy.CACHING_OPTIMIZED,
              functionAssociations: [{
                  function: requestFunction,
                  eventType: FunctionEventType.VIEWER_REQUEST,
              }]
            }
        })
    }
}