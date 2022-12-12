import { Logger } from "./Logger";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  DeviceCreationParams,
  Device,
  DeviceRepository,
} from "../services/device";
import {
  TimeSeries,
  TimeSeriesParams,
  TelemetryRepository,
} from "../services/telemetry";

const clientId = process.env.XM_CLIENT_ID;
const clientSecret = process.env.XM_CLIENT_SECRET;
const baseURL = process.env.XM_CLIENT_URL;

export class WxmClient implements DeviceRepository, TelemetryRepository {
  private readonly api: AxiosInstance;
  private token = "";
  private refreshToken = "";
  private tokeRetrievedAt: Date | null = null;

  constructor(private logger: Logger) {
    if (!clientId || !clientSecret) {
      const error = "XM_CLIENT_ID and XM_CLIENT_SECRET must be set";
      this.logger.error(error);
      throw new Error(error);
    }

    const api = axios.create({
      baseURL,
    });

    this.api = api;
  }

  private refetchToken() {
    const now = new Date();

    if (!this.token) {
      this.login();
      return;
    }

    const tokenExpired =
      now.getTime() - this.tokeRetrievedAt!.getTime() > 5 * 60 * 1000;

    if (tokenExpired) {
      this.login();
    }
  }

  async login() {
    try {
      const { data } = await this.api.post<any, AxiosResponse<LoginResponse>>(
        "/api/auth/login",
        {
          clientId,
          clientSecret,
        }
      );
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      this.tokeRetrievedAt = new Date();

      this.api.defaults.headers.common[
        "X-Authorization"
      ] = `Bearer ${this.token}`;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createDevice(params: DeviceCreationParams): Promise<Device> {
    this.refetchToken();

    try {
      const res = await this.api.post("/api/device", params);
      return res.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async deleteDevice(id: string): Promise<void> {
    this.refetchToken();

    try {
      await this.api.delete(`/api/device/${id}`);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async uploadTimeSeries(deviceId: string, data: TimeSeries[]): Promise<void> {
    this.refetchToken();

    try {
      await this.api.post(
        `/api/plugins/telemetry/DEVICE/${deviceId}/timeseries?scope=ANY`,
        data
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getTimeSeries(deviceId: string, params: TimeSeriesParams) {
    this.refetchToken();

    try {
      const res = await this.api.get(
        `/api/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`,
        { params }
      );
      return res.data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

interface LoginResponse {
  token: string;
  refreshToken: string;
}
