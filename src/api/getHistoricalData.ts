import { Validator } from '../helpers/validator.class.js'
import type { getHistoricalDataQuery, getHistoricalDataRequest } from '../types.js'


// https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=AMRN&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit

/**
 * Get financial historical data
 * @param req - request object
 */
export const getHistoricalData = async (req: getHistoricalDataRequest) => {
  const query: getHistoricalDataQuery = req.query

  if (!Validator.isValid(query)) {
    return Response.json({
      message: 'Bad request',
    })
  }

  return Response.json({
    message: 'Hello from historicalData endpoint!!!'
  })
}

