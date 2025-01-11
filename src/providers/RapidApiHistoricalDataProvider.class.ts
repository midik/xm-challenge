import fetch from 'node-fetch'
import { HistoricalDataProvider, HistoricalDataProviderOptions } from './HistoricalDataProvider.class.js'
import { RapidApiHistoricalData, SomeHistoricalDataAdapter } from '../adapters/SomeHistoricalDataAdapter.class.js'
import type { HistoricalRecord } from '../adapters/HistoricalDataAdapter.class.js'


export class RapidApiDataProvider extends HistoricalDataProvider {
  adapter: SomeHistoricalDataAdapter

  constructor(options: HistoricalDataProviderOptions) {
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
    return this.adapter.normalize(json as RapidApiHistoricalData)
  }

  // TODO implement dates
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
