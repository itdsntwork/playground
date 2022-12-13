import { Subject, Subscription } from "rxjs";
import { Service } from "./service";

export class Dispatcher {
  private statusSubject: Subject<Status> = new Subject();
  private subscription: Subscription;

  constructor(private service: Service, private deviceId) {
    if (!deviceId) {
      throw new Error("Device ID is required");
    }
    if (!service) {
      throw new Error("Service is required");
    }
  }

  public onQueueFlush = (data: any[]) => {
    this.statusSubject.next("submitting");
    this.service.uploadTimeSeries(this.deviceId, data).then(() => {
      this.statusSubject.next("idle");
    });
  };

  public subscribeToStatus(callback: (status: Status) => void) {
    return this.statusSubject.subscribe(callback);
  }

  public onDestroy() {
    this.subscription.unsubscribe();
  }
}

type Status = "idle" | "submitting";
