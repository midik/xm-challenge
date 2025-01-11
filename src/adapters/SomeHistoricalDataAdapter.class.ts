import {
  HistoricalData,
  HistoricalDataAdapter,
  HistoricalRecordAdapterError,
} from './HistoricalDataAdapter.class.js'
import { RapidApiHistoricalData } from '../providers/RapidApiHistoricalDataProvider.class.js'


export class SomeHistoricalDataAdapter extends HistoricalDataAdapter {
  normalize(data: RapidApiHistoricalData): HistoricalData {
    try {
      const { timestamp, indicators, meta } = data.chart.result?.[0]
      const { open, high, low, close, volume } = indicators.quote?.[0]

      return {
        companySymbol: meta.symbol,
        companyName: meta.shortName,
        records: timestamp.map((time: number, index: number) => {
          return {
            date: new Date(time * 1000).toISOString().split('T')[0],
            open: open[index],
            high: high[index],
            low: low[index],
            close: close[index],
            volume: volume[index],
          }
        }),
      }

    } catch (error) {
      throw new HistoricalRecordAdapterError('Failed to normalize historical data')
    }
  }
}
