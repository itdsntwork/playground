import { Request, Response } from "express";
import { Logger } from "../common/Logger";
import { TelemetryService, TimeSeriesParams } from "../services/telemetry";

export class TelemetryController {
  private logger: Logger;
  private telemetryService: TelemetryService;

  constructor(logger: Logger, telemetryService: TelemetryService) {
    this.logger = logger;
    this.telemetryService = telemetryService;
  }

  uploadTimeSeries = async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const data = req.body;

    try {
      await this.telemetryService.uploadTimeSeries(deviceId, data);
      return res.status(204).send();
    } catch (error) {
      this.logger.error(error);
      return res.status(500).send("Server error");
    }
  };

  getTimeSeries = async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const params = req.query as unknown as TimeSeriesParams;

    try {
      const data = await this.telemetryService.getTimeSeries(deviceId, params);
      return res.status(200).json(data);
    } catch (error) {
      this.logger.error(error);
      return res.status(500).send("Server error");
    }
  };
}
