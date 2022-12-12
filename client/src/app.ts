import { readCSV } from "./fileReader";

const filePath = `${__dirname}/../data.csv`;

readCSV({
  filePath,
  onRead: (data) => {},
  onEnd: () => {},
});
