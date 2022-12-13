import axios, { AxiosInstance } from "axios";

const baseURL = process.env.API_URL;

export class Service {
  private readonly api: AxiosInstance;

  constructor() {
    const api = axios.create({
      baseURL,
    });

    this.api = api;
  }

  async createDevice(params: any): Promise<any> {
    try {
      const res = await this.api.post("/device", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async uploadTimeSeries(deviceId: string, data: any[]): Promise<void> {
    try {
      await this.api.post(`timeseries/${deviceId}`, data);
    } catch (error) {
      throw error;
    }
  }
}
