import fetch from 'node-fetch'
import { DataProvider, DataProviderOptions } from './DataProvider.class.js'
import { SomeHistoricalDataAdapter } from './SomeHistoricalDataAdapter.class.js'
import { HistoricalRecord } from './HistoricalDataAdapter.class.js'


export class RapidApiDataProvider extends DataProvider {
  adapter: SomeHistoricalDataAdapter

  constructor(options: DataProviderOptions) {
    super(options)
    this.adapter = new SomeHistoricalDataAdapter()
  }

  async fetchData(companySymbol: string, startDate: string, endDate: string): Promise<HistoricalRecord[]> {
    const url = this.buildUrl(companySymbol, startDate, endDate)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
        'x-rapidapi-key': this.options.key,
      },
    })
    const json = await response.json()
    return this.adapter.normalize(json)
  }

  // todo implement dates
  private buildRequestPayload(companySymbol: string, startDate: string, endDate: string) {
    return {
      symbol: companySymbol,
      interval: '1mo',
      range: '5y',
      region: 'US',
      includePrePost: 'false',
      useYfid: 'true',
      includeAdjustedClose: 'true',
      events: 'capitalGain%2Cdiv%2Csplit',
    }
  }

  private buildUrl(companySymbol: string, startDate: string, endDate: string) {
    const payload = this.buildRequestPayload(companySymbol, startDate, endDate)
    const queryParams = new URLSearchParams(Object.entries(payload))
    return `https://yh-finance.p.rapidapi.com/stock/v3/get-chart?${queryParams}`
  }
}
