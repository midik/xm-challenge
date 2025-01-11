import { SomeHistoricalDataAdapter } from './SomeHistoricalDataAdapter.class.js'


describe('SomeHistoricalDataAdapter', () => {
  it('should normalize historical data', () => {
    const data = {
      chart: {
        result: [
          {
            timestamp: [1, 2, 3],
            indicators: {
              quote: [
                { open: [1, 2, 3], high: [4, 5, 6], low: [7, 8, 9], close: [10, 11, 12], volume: [13, 14, 15] }
              ]
            }
          }
        ]
      }
    }
    const adapter = new SomeHistoricalDataAdapter()

    const result = adapter.normalize(data)

    expect(result).toEqual([
      { date: new Date(1000), open: 1, high: 4, low: 7, close: 10, volume: 13 },
      { date: new Date(2000), open: 2, high: 5, low: 8, close: 11, volume: 14 },
      { date: new Date(3000), open: 3, high: 6, low: 9, close: 12, volume: 15 },
    ])
  })
})
