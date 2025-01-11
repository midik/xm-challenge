export type HistoricalRecord = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export abstract class HistoricalDataAdapter {
  abstract normalize(data: any): HistoricalRecord[]
}
