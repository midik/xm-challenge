import type { Config } from 'payload'
import type { HistoricalDataProviderConfig } from './types.js'
import { HistoricalDataApi } from './api/index.js'
import { RapidApiDataProvider } from './helpers/RapidApiDataProvider.class.js'
import { Validator } from './helpers/validator.class.js'


export const historicalDataProvider =
  (pluginOptions: HistoricalDataProviderConfig) =>
  (config: Config): Config => {
    /**
     * If the plugin is disabled, we still want to keep added collections/fields so the database schema is consistent which is important for migrations.
     * If your plugin heavily modifies the database schema, you may want to remove this property.
     */
    if (pluginOptions.disabled) {
      return config
    }

    // we can choose provider type here based on some config etc
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

    return config
  }
