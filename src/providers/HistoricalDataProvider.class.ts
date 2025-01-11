import { HistoricalDataAdapter } from '../adapters/HistoricalDataAdapter.class.js'

export type HistoricalDataProviderOptions = {
  url: string
  key: string
}

export class HistoricalDataProviderError extends Error {}


export abstract class HistoricalDataProvider {
  protected options: HistoricalDataProviderOptions
  protected abstract adapter: HistoricalDataAdapter

  protected constructor(options: HistoricalDataProviderOptions) {
    this.options = options
  }

  abstract fetchData(companySymbol: string, startDate: string, endDate: string)
    : Promise<ReturnType<HistoricalDataAdapter['normalize']>>
}
