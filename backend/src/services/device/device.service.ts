import { DeviceRepository } from "./device.repository";
import { Device, DeviceCreationParams } from "./types";

export class DeviceService {
  constructor(private repository: DeviceRepository) {}

  createDevice(params: DeviceCreationParams): Promise<Device> {
    return this.repository.createDevice(params);
  }

  deleteDevice(id: string) {
    return this.repository.deleteDevice(id);
  }
}
