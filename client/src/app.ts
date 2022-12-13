import { Dispatcher } from "./dispatcher";
import { FileReader } from "./fileReader";
import { Queue } from "./queue";
import { Service } from "./service";

const filePath = `${__dirname}/../data.csv`;

const run = async () => {
  const service = new Service();
  const device = await service.createDevice({
    name: "test",
    type: "test",
    label: "test",
    additionalInfo: {
      id: "test",
      entityType: "DEVICE_PROFILE",
    },
  });

  const queue = new Queue();
  const dispatcher = new Dispatcher(service, device?.id?.id);

  queue.subscribeToQueue(dispatcher.onQueueFlush);

  const fileReader = new FileReader({
    filePath,
    onRead: (data) => queue.enqueue(data),
    onEnd: () => queue.flush(),
  });

  dispatcher.subscribeToStatus((status) => {
    console.log("status", status);
    if (status === "submitting") {
      fileReader.pause();
    } else {
      fileReader.resume();
    }
  });

  fileReader.read();
};

run();
