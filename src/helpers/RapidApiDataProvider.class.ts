import fetch from 'node-fetch'
import { DataProvider } from './DataProvider.class.js'


export class RapidApiDataProvider extends DataProvider {
  async fetchData(companySymbol: string, startDate: string, endDate: string) {
    const url = this.buildUrl(companySymbol, startDate, endDate);
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
        'x-rapidapi-key': this.options.key,
      },
    })
    return result.json()
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
