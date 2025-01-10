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

    if (!config.collections) {
      config.collections = []
    }

    // will it been removed if plugin is disabled?
    config.collections.push({
      slug: 'historical-data-provider-symbols',
      fields: [
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'financialStatus',
          type: 'select',
          options: [
            {
              label: 'D',
              value: 'D',
            },
            {
              label: 'K',
              value: 'K',
            },
            {
              label: 'N',
              value: 'N',
            },
          ],
        },
        {
          name: 'marketCategory',
          type: 'select',
          options: [
            {
              label: 'Q',
              value: 'Q',
            },
            {
              label: 'G',
              value: 'G',
            },
            {
              label: 'S',
              value: 'S',
            },
          ],
        },
        {
          name: 'RoundLotSize',
          type: 'number',
        },
        {
          name: 'SecurityName',
          type: 'text',
        },
        {
          name: 'Symbol',
          type: 'text',
        },
        {
          name: 'TestIssue',
          type: 'select',
          options: [
            {
              label: 'Y',
              value: 'Y',
            },
            {
              label: 'N',
              value: 'N',
            },
          ],
        },
      ],
    })

    if (!config.endpoints) {
      config.endpoints = []
    }

    config.endpoints.push({
      handler: getHistoricalData, // todo fix type error
      method: 'get',
      path: '/historicalData',
    })

    if (!config.admin) {
      config.admin = {}
    }

    if (!config.admin.components) {
      config.admin.components = {}
    }

    const incomingOnInit = config.onInit

    config.onInit = async (payload) => {
      // Ensure we are executing any existing onInit functions before running our own.
      if (incomingOnInit) {
        await incomingOnInit(payload)
      }

      // extra onInit logic here
    }

    return config
  }
