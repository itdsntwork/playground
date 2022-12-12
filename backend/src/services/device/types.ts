export type DeviceCreationParams = {
  name: string;
  type: string;
  label: string;
  deviceProfileId: {
    id: string;
    entityType: "DEVICE_PROFILE";
  };
};

interface Id {
  id: string;
  entityType: string;
}

interface Configuration {}

interface TransportConfiguration {}

interface DeviceData {
  configuration: Configuration;
  transportConfiguration: TransportConfiguration;
}

interface AdditionalInfo {}

export interface Device {
  id: Id;
  createdTime: number;
  tenantId: Id;
  customerId: Id;
  name: string;
  type: string;
  label: string;
  deviceProfileId: Id;
  deviceData: DeviceData;
  firmwareId: Id;
  softwareId: Id;
  additionalInfo: AdditionalInfo;
}