import { RapidApiHistoricalDataProvider } from './RapidApiHistoricalDataProvider.class.js'
import nock from 'nock'


describe.only('RapidApiHistoricalDataProvider', () => {

  afterEach(() => {
    jest.restoreAllMocks()
    nock.restore()
  });

  it('Should fetch historical data', async () => {
    const options = {
      key: 'some-key',
      url: process.env.RAPID_API_URL as string,
    }
    const provider = new RapidApiHistoricalDataProvider(options)
    const companySymbol = 'AAPL'
    const startDate = '2021-01-01'
    const endDate = '2021-01-03'
    const url = provider.buildUrl(companySymbol, startDate, endDate)

    const mockChartData = {
      chart: {
        result: [{
            timestamp: [1612146000, 1612149600],
            indicators: {
              quote: [{
                  open: [133.52, 133.59],
                  high: [133.61, 133.61],
                  low: [133.52, 133.59],
                  close: [133.59, 133.61],
                  volume: [100, 200],
              }],
            },
          }],
      },
    };

    const expectedNormalizedData = [
      {
        "date": new Date('2021-02-01T02:20:00.000Z'),
        "open": 133.52,
        "high": 133.61,
        "low": 133.52,
        "close": 133.59,
        "volume": 100
      },
      {
        "date": new Date('2021-02-01T03:20:00.000Z'),
        "open": 133.59,
        "high": 133.61,
        "low": 133.59,
        "close": 133.61,
        "volume": 200
      }
    ];

    const normalizeSpy = jest.spyOn(provider.adapter, 'normalize').mockReturnValue(expectedNormalizedData)

    const { origin, pathname, search} = new URL(url)
    nock(origin)
      .get(`${pathname}${search}`)
      .reply(200, mockChartData);

    const result = await provider.fetchData(companySymbol, startDate, endDate)

    expect(result).toEqual(expectedNormalizedData)
    expect(normalizeSpy).toHaveBeenCalledWith(mockChartData)
  })
})
