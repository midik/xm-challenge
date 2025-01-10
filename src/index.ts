import type { Config } from 'payload'
import type { HistoricalDataProviderConfig } from './types.js'
import { getHistoricalData } from './api/index.js'


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

    if (!config.endpoints) {
      config.endpoints = []
    }

    config.endpoints.push({
      handler: getHistoricalData, // todo fix type error
      method: 'get',
      path: '/historicalData',
    })

    return config
  }
