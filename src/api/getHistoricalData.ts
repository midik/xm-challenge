import { Validator } from '../helpers/validator.class.js'
import { DataProvider } from '../helpers/DataProvider.class.js'
import type { getHistoricalDataQuery, getHistoricalDataRequest } from '../types.js'


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
  public async getHistoricalData (req: getHistoricalDataRequest){
    const query: getHistoricalDataQuery = req.query

    if (!this.validator.isValid(query)) {
      return Response.json({
        message: 'Bad request',
      })
    }


    /// todo
    

    return Response.json({
      message: 'Hello from historicalData endpoint!!!'
    })
  }
}
