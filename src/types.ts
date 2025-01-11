// todo spread this to corresponding modules

import type { CollectionSlug, PayloadRequest } from 'payload'

export type getHistoricalDataQuery = {
  companySymbol: string;
  startDate: string;
  endDate: string;
  email: string;
}

export type getHistoricalDataRequest = PayloadRequest & {
  query: getHistoricalDataQuery
}

export type HistoricalDataProviderPluginConfig = {
  collections?: Partial<Record<CollectionSlug, true>>
  rapidAPIUrl: string,
  rapidAPIKey: string,
  disabled?: boolean
}
