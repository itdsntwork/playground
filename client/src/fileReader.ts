import fs from "fs";
import csv from "csv-parser";

export const readCSV = ({ onRead, onEnd, filePath }: Props) => {
  fs.createReadStream(filePath).pipe(csv()).on("data", onRead).on("end", onEnd);
};

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
