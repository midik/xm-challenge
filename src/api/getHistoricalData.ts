import { Validator } from '../validators/validator.class.js'
import { HistoricalDataProvider } from '../providers/HistoricalDataProvider.class.js'
import type { PayloadRequest } from 'payload'


export type GetHistoricalDataQuery = {
  companySymbol: string;
  startDate: string;
  endDate: string;
  email: string;
}

type GetHistoricalDataRequest = PayloadRequest & {
  query: GetHistoricalDataQuery
}


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
  public async getHistoricalData(req: GetHistoricalDataRequest){
    const query: GetHistoricalDataQuery = req.query

    if (!this.validator.isValid(query)) {
      return Response.json({
        message: 'Bad request',
      })
    }

    const data = await this.dataProvider.fetchData(query.companySymbol, query.startDate, query.endDate)

    await req.payload.sendEmail({
      to: query.email,
      subject: 'This is a test email',
      text: Array.from(data).map((record) => JSON.stringify(record)).join('\n'),
    })

    return Response.json(data)
  }
}
