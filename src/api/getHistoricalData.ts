import { Validator } from '../validators/validator.class.js'
import { HistoricalDataProvider } from '../providers/HistoricalDataProvider.class.js'
import type { PayloadRequest } from 'payload'
import { CsvAdapter } from '../adapters/CsvAdapter.class.js'
import { Controller, Route } from 'tsoa'


export type GetHistoricalDataQuery = {
  companySymbol: string;
  startDate: string;
  endDate: string;
  email: string;
}

type GetHistoricalDataRequest = PayloadRequest & {
  query: GetHistoricalDataQuery
}

@Route("/historicalData")
export class HistoricalDataApi extends Controller {
  dataProvider: HistoricalDataProvider
  validator: Validator

  constructor(dataProvider: HistoricalDataProvider, validator: Validator) {
    super()
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
      return Response.json({ message: 'Bad request' })
    }

    const data = await this.dataProvider.fetchData(query.companySymbol, query.startDate, query.endDate)

    await req.payload.sendEmail({
      to: query.email,
      subject: `Historical data for ${data.companyName} (${data.companySymbol})`,
      text: `From ${query.startDate} to ${query.endDate}`,
      attachments: [{
        filename: 'report.csv',
        content: Buffer.from(CsvAdapter.normalize(data), 'utf-8')
      }]
    })

    return Response.json(data.records)
  }
}
