// Create a logger interface
export interface Logger {
  log(message: any, params?: any): void;
  error(message: any, params?: any): void;
}
