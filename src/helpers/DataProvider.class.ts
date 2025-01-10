interface DataProviderOptions {
  url: string
  key: string
}


export class DataProvider {
  protected options: DataProviderOptions

  constructor(options: DataProviderOptions) {
    this.options = options
  }

  static fetchData(companySymbol: string, startDate: string, endDate: string) {}
}
