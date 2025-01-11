import {
  HistoricalDataProvider,
  HistoricalDataProviderError,
  HistoricalDataProviderOptions,
} from './HistoricalDataProvider.class.js'
import { SomeHistoricalDataAdapter } from '../adapters/SomeHistoricalDataAdapter.class.js'
import type { HistoricalRecord } from '../adapters/HistoricalDataAdapter.class.js'


export type RapidApiHistoricalData = {
  chart: {
    error?: {
      code: string
      description: string
    }
    result: {
      timestamp: number[]
      indicators: {
        quote: {
          open: number[]
          high: number[]
          low: number[]
          close: number[]
          volume: number[]
        }[]
      }
    }[]
  }
}


export class RapidApiHistoricalDataProvider extends HistoricalDataProvider {
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
    const json = await response.json() as RapidApiHistoricalData
    if (json.chart.error) {
      throw new HistoricalDataProviderError(json.chart.error.description)
    }
    return this.adapter.normalize(json)
  }

  // TODO implement dates
  private buildRequestPayload(companySymbol: string, startDate: string, endDate: string) {
    // get the very beginning of "start date" day
    // (see https://rapidapi.com/apidojo/api/yh-finance/playground/apiendpoint_8db71d88-e9a5-4b0c-8de9-4400f8559dfd)
    const startTime = (new Date(startDate).setHours(0, 0, 0) / 1000).toFixed(0)
    // get the very end of "end date" day
    const endTime = (new Date(endDate).setHours(24, 0, 0) / 1000).toFixed(0)

    return {
      symbol: companySymbol,
      interval: '1d',
      // range: '5y', // let's use period1 and period2 instead
      region: 'US',
      includePrePost: 'false',
      useYfid: 'true',
      includeAdjustedClose: 'true',
      events: 'capitalGain%2Cdiv%2Csplit',
      period1: startTime,
      period2: endTime,
    }
  }

  public buildUrl(companySymbol: string, startDate: string, endDate: string) {
    const payload = this.buildRequestPayload(companySymbol, startDate, endDate)
    const queryParams = new URLSearchParams(Object.entries(payload))
    return `https://yh-finance.p.rapidapi.com/stock/v3/get-chart?${queryParams}`
  }
}
