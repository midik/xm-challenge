import type { CollectionSlug, Config } from 'payload'

export type HistoricalDataProviderConfig = {
  collections?: Partial<Record<CollectionSlug, true>>
  disabled?: boolean
}

// https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=AMRN&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit

export const historicalDataProvider =
  (pluginOptions: HistoricalDataProviderConfig) =>
  (config: Config): Config => {
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
            }
          ],
        },
      ],
    })

    if (pluginOptions.collections) {
      for (const collectionSlug in pluginOptions.collections) {
        const collection = config.collections.find(
          (collection) => collection.slug === collectionSlug,
        )

        if (collection) {
          collection.fields.push({
            name: 'addedByPlugin',
            type: 'text',
            admin: {
              position: 'sidebar',
            },
          })
        }
      }
    }

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
      handler: () => {
        return Response.json({ message: 'Hello from historicalData endpoint' })
      },
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
