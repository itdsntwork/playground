import { Subject } from "rxjs";

const batchSize = 50;

export class Queue {
  private queue: any[] = [];
  private queueSubject: Subject<any[]> = new Subject();

  public enqueue(data: any) {
    this.queue.push(data);
    if (this.queue.length === batchSize) {
      this.flush();
    }
  }

  public flush() {
    this.queueSubject.next(this.queue);
    this.queue.splice(0, this.queue.length);
  }

  public subscribeToQueue(callback: (data: any[]) => void) {
    return this.queueSubject.subscribe(callback);
  }
}
