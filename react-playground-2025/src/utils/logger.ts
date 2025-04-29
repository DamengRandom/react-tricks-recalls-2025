class Logger {
  private static instance: Logger | null = null;

  private logs: { timestamp: Date; event: string; metadata?: Record<string, unknown> }[] = [];

  constructor() {
    if (Logger.instance == null) {
      Logger.instance = this;
    }

    return Logger.instance;
  }
  
  eventLog(event: string, metadata?: Record<string, unknown>) {
    this.logs.push({
      timestamp: new Date(),
      event,
      metadata
    });
    
    console.log(`[Logger] ${event}`, metadata);
  }
  
  getLogs() {
    return [...this.logs];
  }
  
  clearLogs() {
    this.logs = [];
  }
}

const logger = new Logger();

export default logger;
