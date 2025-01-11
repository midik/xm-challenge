import { HistoricalDataAdapter, HistoricalRecord, HistoricalRecordAdapterError } from './HistoricalDataAdapter.class.js'
import { RapidApiHistoricalData } from '../providers/RapidApiHistoricalDataProvider.class.js'


export class SomeHistoricalDataAdapter extends HistoricalDataAdapter {
  normalize(data: RapidApiHistoricalData): HistoricalRecord[] {
    try {
      const { timestamp, indicators } = data.chart.result?.[0]
      const { open, high, low, close, volume } = indicators.quote?.[0]

      return timestamp.map((time: number, index: number) => {
        return {
          date: new Date(time * 1000),
          open: open[index],
          high: high[index],
          low: low[index],
          close: close[index],
          volume: volume[index],
        }
      })
    } catch (error) {
      throw new HistoricalRecordAdapterError('Failed to normalize historical data')
    }
  }
}
