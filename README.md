## XM-challenge (test task)

PayloadCMS Plugin that provides an API endpoint to fetch financial data for a given company symbol and date range, and send an email with the data as an attachment. 
 
### Requirements
See [REQUIREMENTS.md](REQUIREMENTS.md)

### Usage (local)
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `dev/.env` file (refer to [.env.example](.env.example) as follows:
```
DATABASE_URI=<your-postgres--uri> # e.g. postgres://xm:xm@localhost:5432
RAPIDAPI_URL=https://yh-finance.p.rapidapi.com/stock/v3/get-chart
RAPIDAPI_KEY=<your-rapidapi-key>
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```
4. Run the application: `npm run dev`

### Usage (Docker)
1-2. Same as above
3. Run the application: `docker-compose up -d`

### API

#### GET /api/historicalData
Fetch historical data for a given company symbol and date range

##### Query Parameters
- `symbol` (required): Company symbol
- `startDate` (required): Start date (YYYY-MM-DD)
- `endDate` (required): End date (YYYY-MM-DD)
- `email` (required): Email address to send the data to
- `interval` (optional): Interval for the historical data (default: 1d)

For company symbols, refer to [this list](https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json).
Short list of symbols is here: [symbols](/src/validators/validSymbols.json)

##### Example
Request:
```
GET /api/historicalData
    ?companySymbol=AAPL
    &startDate=2024-11-01
    &endDate=2024-11-04
    &email=email@test.com
```
Response:
```json
[
    {
        "date": "2024-10-31T13:30:00.000Z",
        "open": 229.33999633789062,
        "high": 229.8300018310547,
        "low": 225.3699951171875,
        "close": 225.91000366210938,
        "volume": 64370100
    },
    {
        "date": "2024-11-01T13:30:00.000Z",
        "open": 220.97000122070312,
        "high": 225.35000610351562,
        "low": 220.27000427246094,
        "close": 222.91000366210938,
        "volume": 65276700
    },
    {
        "date": "2024-11-04T14:30:00.000Z",
        "open": 220.99000549316406,
        "high": 222.7899932861328,
        "low": 219.7100067138672,
        "close": 222.00999450683594,
        "volume": 44944500
    }
]
```

### Tests
Run tests: `npm test`
