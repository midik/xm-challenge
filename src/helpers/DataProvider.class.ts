import { HistoricalDataAdapter } from './HistoricalDataAdapter.class.js'

export type DataProviderOptions = {
  url: string
  key: string
}


export abstract class DataProvider {
  protected options: DataProviderOptions
  protected abstract adapter: HistoricalDataAdapter

  constructor(options: DataProviderOptions) {
    this.options = options
  }

  abstract fetchData(companySymbol: string, startDate: string, endDate: string): Promise<any>
}
