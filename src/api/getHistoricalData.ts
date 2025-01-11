import { Validator } from '../validators/validator.class.js'
import { HistoricalDataProvider } from '../providers/HistoricalDataProvider.class.js'
import type { getHistoricalDataQuery, getHistoricalDataRequest } from '../types.js'
import * as console from 'node:console'


export class HistoricalDataApi {
  dataProvider: HistoricalDataProvider
  validator: Validator

  constructor(dataProvider: HistoricalDataProvider, validator: Validator) {
    this.dataProvider = dataProvider
    this.validator = validator
  }

  /**
   * The handler for GET historical data endpoint
   * @param req
   */
  public async getHistoricalData(req: getHistoricalDataRequest){
    const query: getHistoricalDataQuery = req.query

    if (!this.validator.isValid(query)) {
      return Response.json({
        message: 'Bad request',
      })
    }

    const data = await this.dataProvider.fetchData(query.companySymbol, query.startDate, query.endDate)

    // todo email stuff

    return Response.json(data)
  }
}
