import fs from "fs";
import csv from "csv-parser";
import internal from "stream";

export class FileReader {
  private filePath: string;
  private onRead: (data: LineData) => void;
  private onEnd: () => void;
  private stream: internal.Transform;

  constructor({ filePath, onRead, onEnd }: Props) {
    this.filePath = filePath;
    this.onRead = onRead;
    this.onEnd = onEnd;
  }

  public read() {
    this.stream = fs
      .createReadStream(this.filePath)
      .pipe(csv())
      .on("data", this.onRead)
      .on("end", this.onEnd);
  }

  public pause() {
    this.stream.pause();
  }

  public resume() {
    this.stream.resume();
  }
}

interface Props {
  onRead: (data: LineData) => void;
  onEnd: () => void;
  filePath: string;
}

interface LineData {
  timestamp: string;
  temperature: string;
  humidity: string;
  pressure: string;
  wind_speed: string;
  wind_gust: string;
  wind_direction: string;
}
