import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DeviceController } from "./controllers/device.controller";
import { Logger } from "./common/Logger";
import { DeviceService } from "./services/device";
import { WxmClient } from "./common/WxmClient";
import { TelemetryService } from "./services/telemetry";
import { TelemetryController } from "./controllers/telemetry.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const logger: Logger = {
  log: function (message: any, params?: any): void {
    console.log(message, params);
  },
  error: function (message: any, params?: any): void {
    console.log(message, params);
  },
};

const wxmClient = new WxmClient(logger);

const deviceService = new DeviceService(wxmClient);
const deviceController = new DeviceController(logger, deviceService);

const telemetryService = new TelemetryService(wxmClient);
const telemetryController = new TelemetryController(logger, telemetryService);

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.post("/device", deviceController.createDevice);
app.delete("/device/:id", deviceController.deleteDevice);

app.post("/timeseries/:deviceId", telemetryController.uploadTimeSeries);
app.get("/timeseries/:deviceId", telemetryController.getTimeSeries);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port:${port}`);
});
