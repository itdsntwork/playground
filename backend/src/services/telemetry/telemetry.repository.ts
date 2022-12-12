import { TimeSeries, TimeSeriesParams } from "./types";

export interface TelemetryRepository {
  uploadTimeSeries(deviceId: string, data: TimeSeries[]): Promise<void>;
  getTimeSeries(deviceId: string, params: TimeSeriesParams): Promise<any>;
}
