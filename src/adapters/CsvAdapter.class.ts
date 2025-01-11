import { HistoricalData } from './HistoricalDataAdapter.class.js'

export class CsvAdapter {
  static normalize(data: HistoricalData): string {
    const header = 'Date,Open,High,Low,Close,Volume\n'
    const rows = data.records.map((record) => Object.values(record).join(',')).join('\n')
    return `${header}${rows}`
  }
}
