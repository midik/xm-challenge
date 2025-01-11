export type HistoricalRecord = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class HistoricalRecordAdapterError extends Error {}

export abstract class HistoricalDataAdapter {
  abstract normalize(data: any): HistoricalRecord[]
}
