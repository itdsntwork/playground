export interface TimeSeriesParams {
  agg?: string;
  endTs: number;
  interval?: number;
  keys: string;
  limit?: number;
  orderBy?: "ASC" | "DSC";
  startTs: number;
  useStrictDataTypes?: boolean;
}

interface Values {
  temperature: number;
  humidity: number;
}

export interface TimeSeries {
  ts: number;
  values: Values;
}