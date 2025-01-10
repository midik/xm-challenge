import type { getHistoricalDataQuery } from '../types.js'

// let's import the symbols statically at this point. This JSON was generated using the following command:
// ```
//   curl "https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json" \
//     | jq '[.[].Symbol]'
// ```
//  Another option here would be to seed the symbols to a collection or fetch them from anywhere else,
//  but it will cost us an extra trip to the database which makes no sense because these symbols change rarely.
import validCompanySymbols from '../data/symbols.json' with { type: 'json' }


/**
 * Some class to validate the query params
 * @todo use AJS or so
 * @class Validator
 */
export class Validator {
  public static isValid(query: getHistoricalDataQuery): boolean {
    return (
      Validator.isEmail(query.email) &&
      Validator.isDate(query.startDate) &&
      Validator.isDate(query.endDate) &&
      Validator.isEndDateAfterStart(query.startDate, query.endDate) &&
      validCompanySymbols.includes(query.companySymbol)
    )
  }

  // todo replace these rough regexps with a better validation
  private static isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  private static isDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
  }

  // todo this is probably worst naming ever :D
  private static isEndDateAfterStart(startData: string, endData: string): boolean {
    return new Date(endData) >= new Date(startData)
  }
}
