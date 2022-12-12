import { Device, DeviceCreationParams } from "./types";

export interface DeviceRepository {
  createDevice(params: DeviceCreationParams): Promise<Device>;
  deleteDevice(id: string): Promise<void>;
}
