import { TelemetryRepository } from "./telemetry.repository";
import { TimeSeries, TimeSeriesParams } from "./types";

export class TelemetryService {
  constructor(private repository: TelemetryRepository) {}

  uploadTimeSeries(deviceId: string, data: TimeSeries[]) {
    return this.repository.uploadTimeSeries(deviceId, data);
  }

  getTimeSeries(deviceId: string, params: TimeSeriesParams) {
    return this.repository.getTimeSeries(deviceId, params);
  }
}
