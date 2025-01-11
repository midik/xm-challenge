import { HistoricalRecord } from './HistoricalDataAdapter.class.js'

export class CsvAdapter {
  static normalize(data: HistoricalRecord[]): string {
    const header = 'Date,Open,High,Low,Close,Volume\n'
    const rows = data.map((record) => Object.values(record).join(',')).join('\n')
    return `${header}${rows}`
  }
}
