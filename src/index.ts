import type { Config } from 'payload'
import { HistoricalDataApi } from './api/index.js'
import { RapidApiHistoricalDataProvider } from './providers/RapidApiHistoricalDataProvider.class.js'
import { Validator } from './validators/validator.class.js'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'


type HistoricalDataProviderPluginConfig = {
  rapidAPIUrl: string,
  rapidAPIKey: string,
  defaultFromAddress: string,
  defaultFromName: string,
  smtpHost: string,
  smtpPort: number,
  smtpUser: string,
  smtpPass: string,
  disabled?: boolean
}


export const historicalDataProviderPlugin =
  (pluginOptions: HistoricalDataProviderPluginConfig) =>
  (config: Config): Config => {
    // exit early if the plugin is disabled
    if (pluginOptions.disabled) {
      return config
    }

    // here we can choose a data provider, e.g. based on some config...
    const provider = new RapidApiHistoricalDataProvider({
      key: pluginOptions.rapidAPIKey,
      url: pluginOptions.rapidAPIUrl,
    })

    // ...same for a validator
    const validator = new Validator()

    // ... and inject them into the API
    const api = new HistoricalDataApi(provider, validator)

    if (!config.endpoints) {
      config.endpoints = []
    }


    config.endpoints.push({
      // @ts-ignore
      handler: api.getHistoricalData.bind(api), // todo fix type error
      method: 'get',
      path: '/historicalData',
    })
    // ...we can bind other endpoints here in the future

    config.email = nodemailerAdapter({
      defaultFromAddress: pluginOptions.defaultFromAddress,
      defaultFromName: pluginOptions.defaultFromName,
      transportOptions: {
        host: pluginOptions.smtpHost,
        auth: {
          user: pluginOptions.smtpUser,
          pass: pluginOptions.smtpPass,
        },
        port: pluginOptions.smtpPort ?? 587,
        secure: false,
      }
    })

    return config
  }
