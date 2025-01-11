import { HistoricalDataAdapter, HistoricalRecord } from './HistoricalDataAdapter.class.js'


export type RapidApiHistoricalData = {
  chart: {
    result: {
      timestamp: number[]
      indicators: {
        quote: {
          open: number[]
          high: number[]
          low: number[]
          close: number[]
          volume: number[]
        }[]
      }
    }[]
  }
}

export class SomeHistoricalDataAdapter extends HistoricalDataAdapter {
  normalize(data: RapidApiHistoricalData): HistoricalRecord[] {
    const { timestamp, indicators } = data.chart.result[0]
    const { open, high, low, close, volume } = indicators.quote[0]

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
  }
}
