import { Validator } from '../helpers/validator.class.js'
import { DataProvider } from '../helpers/DataProvider.class.js'
import type { getHistoricalDataQuery, getHistoricalDataRequest } from '../types.js'
import * as console from 'node:console'


export class HistoricalDataApi {
  dataProvider: DataProvider
  validator: Validator

  constructor(dataProvider: DataProvider, validator: Validator) {
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

    //console.log(data)

    return Response.json(data)
  }
}
