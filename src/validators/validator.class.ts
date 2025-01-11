// let's import the symbols statically at this point. This JSON was generated using the following command:
// ```
//   curl "https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json" \
//     | jq '[.[].Symbol]'
// ```
//  Another option here would be to seed the symbols to a collection or fetch them from anywhere else,
//  but it will cost us an extra trip to the database which makes no sense because these symbols change rarely.
import validCompanySymbols from './validSymbols.json' with { type: 'json' }

import { GetHistoricalDataQuery } from '../api/index.js'


/**
 * Some class to validate the query params
 * @todo use AJS or so
 * @class Validator
 */
export class Validator {
  public isValid(query: GetHistoricalDataQuery): boolean {
    return (
      this.isEmail(query.email) &&
      this.isDate(query.startDate) &&
      this.isDate(query.endDate) &&
      this.isEndDateAfterStart(query.startDate, query.endDate) &&
      this.isDateInPast(query.startDate) &&
      this.isDateInPast(query.endDate) &&
      validCompanySymbols.includes(query.companySymbol)
    )
  }

  // todo replace these rough regexps with a better validation
  private isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  private isDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
  }

  // todo this is probably worst naming ever :D
  private isEndDateAfterStart(startData: string, endData: string): boolean {
    return new Date(endData) >= new Date(startData)
  }

  private isDateInPast(date: string): boolean {
    return new Date(date) <= new Date
  }
}
