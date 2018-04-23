declare const PerformanceObserver : any; // Hopefully to remove it soon

class DebugService {
    private longtask = null;
    private paintPerformance = null;
    constructor() {
        if (PerformanceObserver) {
            this.longtask = new PerformanceObserver((list) => (list.getEntries().forEach(this.displayLongTask)));
            this.longtask.observe({ entryTypes: ['longtask'] });

            this.paintPerformance = new PerformanceObserver((list) => (list.getEntries()).forEach(this.displayPaintInfo));
            this.paintPerformance.observe({ entryTypes: ['paint'] });
        } else {
            console.info('PerformanceObserver is not supporrted in this browser');
        }
    }
    private displayLongTask(entry) {
      console.log(entry);
      console.log(`Long Task detected. Execution time:`, entry.duration);
    }
    private displayPaintInfo(entry) {
      console.log(`${entry.name}:`, entry.startTime);
    }

}

const debugService = new DebugService();

export {
    debugService
};
