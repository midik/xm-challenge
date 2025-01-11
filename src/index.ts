import type { Config } from 'payload'
import { HistoricalDataApi } from './api/index.js'
import { RapidApiDataProvider } from './providers/RapidApiHistoricalDataProvider.class.js'
import { Validator } from './validators/validator.class.js'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'


type HistoricalDataProviderPluginConfig = {
  rapidAPIUrl: string,
  rapidAPIKey: string,
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
    const provider = new RapidApiDataProvider({
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
      handler: api.getHistoricalData.bind(api), // todo fix type error
      method: 'get',
      path: '/historicalData',
    })
    // ...we can bind other endpoints here in the future

    // put this to the envs
    config.email = nodemailerAdapter({
      defaultFromAddress: 'info@payloadcms.com',
      defaultFromName: 'PayloadCMS',
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: true,
        auth: {
          user: 'aaron12@ethereal.email',
          pass: 'X3xYznNqY8gt87Bhb9'
        },
        verify: false
      }
    })

    return config
  }
