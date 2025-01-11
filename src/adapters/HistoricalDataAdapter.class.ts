export type HistoricalRecord = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type HistoricalData = {
  companySymbol: string;
  companyName: string;
  records: HistoricalRecord[];
}

export class HistoricalRecordAdapterError extends Error {}

export abstract class HistoricalDataAdapter {
  abstract normalize(data: any): HistoricalData
}
