import { Request, Response } from "express";
import { DeviceCreationParams, DeviceService } from "../services/device";
import { Logger } from "../common/Logger";

export class DeviceController {
  private readonly logger: Logger;
  private readonly deviceService: DeviceService;

  constructor(logger: Logger, deviceService: DeviceService) {
    this.logger = logger;
    this.deviceService = deviceService;
  }

  async createDevice(req: Request, res: Response) {
    try {
      const params: DeviceCreationParams = req.body;
      const device = await this.deviceService.createDevice(params);
      return res.status(201).json(device);
    } catch (error) {
      this.logger.error(error);
      return res.status(500).send("Server error");
    }
  }

  async deleteDevice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.deviceService.deleteDevice(id);
      return res.status(204).send();
    } catch (error) {
      this.logger.error(error);
      return res.status(500).send("Server error");
    }
  }
}
