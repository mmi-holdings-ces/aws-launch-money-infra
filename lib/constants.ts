import { App } from "aws-cdk-lib"

export class StackType {
    static readonly ALL: string = 'all'
    static readonly FUNCTION: string = 'function'
    static readonly CLOUD_FRONT: string = 'cloud_front'
}

export class Args {

    static readonly ENV: string = 'env'
    static readonly STACK: string = 'component'
    static readonly REGION: string = 'region'

    static readonly defaults: any = {
        env: 'pre',
        component: StackType.ALL,
        region: 'af-south-1'
    }

    static getValue (name: string, app:App) {
        console.log(`getting args value ${name}`)
        if (this.defaults[name] == undefined) {
            throw Error(`unknown argument provided ${name}`)
        }

        try {
            return app.node.getContext(name)
        } catch (error) {
            return this.defaults[name]
        }
    }


}

export class Account {

    static readonly PRE: string = 'pre'
    static readonly PROD: string = 'prod'
    static readonly MOM_MONEY_CERT: string = 'MOM_MONEY_CERT'
    static readonly DOMAIN_NAME: string = 'DOMAIN_NAMES'
    static readonly FUNCTION_NAME: string = 'web-onboarding-spa'
    static readonly FUNCTION_ARN: string = 'FUNCTION_ARN'

    private static DOMAIN: string = 'join.momentummoney.co.za'

    private static PRE_CERT_ARN: string = 'arn:aws:acm:us-east-1:737245153745:certificate/dd01e7f8-d183-4611-b343-4142888d7386'
    private static PRE_FUNCTION_ARN: string = 'arn:aws:cloudfront::737245153745:function/web-onboarding-spa'

    private static PROD_CERT_ARN: string = 'arn:aws:acm:us-east-1:081138765061:certificate/e7699389-f1db-4b82-bfb1-517133d29dc7'
    private static PROD_FUNCTION_ARN: string = 'arn:aws:cloudfront::081138765061:function/web-onboarding-spa'

    static readonly distros: any = {
        PRE: 'pre',
        PRE1: 'pre1',
        PRE2: 'pre2',
        PROD: 'prod'
    }

    static getNumber (env: string) {
        if (env == this.PROD) {
            return '081138765061'
        }

        return '737245153745'
    }

    static getValueOf (env: string, itemName: string): string {
        const cantFindConstError = 'could not find itemName '
        if (env == 'pre') {
            switch (itemName) {
                case this.MOM_MONEY_CERT: return this.PRE_CERT_ARN
                case this.DOMAIN_NAME: return `pre-${this.DOMAIN}`
                case this.FUNCTION_ARN: return this.PRE_FUNCTION_ARN
                default: throw Error(cantFindConstError.concat(itemName))
            }
        }

        if (env == 'pre1') {
            switch (itemName) {
                case this.MOM_MONEY_CERT: return this.PRE_CERT_ARN
                case this.DOMAIN_NAME: return `pre1-${this.DOMAIN}`
                case this.FUNCTION_ARN: return this.PRE_FUNCTION_ARN
                default: throw Error(cantFindConstError.concat(itemName))
            }
        }

        if (env == 'pre2') {
            switch (itemName) {
                case this.MOM_MONEY_CERT: return this.PRE_CERT_ARN
                case this.DOMAIN_NAME: return `pre2-${this.DOMAIN}`
                case this.FUNCTION_ARN: return this.PRE_FUNCTION_ARN
                default: throw Error(cantFindConstError.concat(itemName))
            }
        }

        if (env == 'prod') {
            switch (itemName) {
                case this.MOM_MONEY_CERT: return this.PROD_CERT_ARN
                case this.DOMAIN_NAME: return this.DOMAIN
                case this.FUNCTION_ARN: return this.PROD_FUNCTION_ARN
                default: throw Error(cantFindConstError.concat(itemName))
            }
        }

        throw Error(`unknown env provided ${env}`)
    }
}
