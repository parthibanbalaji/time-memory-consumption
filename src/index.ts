interface executionTime {
    name: string,
    nanoseconds: bigint,
    milliseconds: number,
    seconds: number
}

interface executionMemory {
    rss: string,
    heapUsed: string,
    heapTotal: string,
    external: string
}

interface executionMemoryReport {
    startTimeUsage: executionMemory,
    endTimeUsage: executionMemory,
    usageDifference: executionMemory
}

interface result {
    executionTime: executionTime,
    executionMemory?: executionMemory,
    executionMemoryReport?: executionMemoryReport
}

interface error {
    error: string
}



class CalculateExecutionTimeAndSpace {
    watchers: any = {};
    public startWatch(name: string, memory?: Boolean): string {
        if (!name) {
            return 'Please provide name to start watch process'
        }
        if (this.watchers[name] == undefined) {
            this.watchers[name] = {
                startTime: process.hrtime.bigint(),
            }
            if (memory) {
                this.watchers[name].memoryUsage = process.memoryUsage();
            }
            return 'Started watching process'
        } else {
            return 'Already a watcher is registered with the provided name'
        }
    }

    public stopWatch(name: string): result | error {
        let retrunObject: any = {};
        if (!this.isWatcherAvailable(name)) {
            return { error: `Specified watcher '${name}' is not registered!` }
        }
        let executionTime = this.calculateExecutionTime(name);
        retrunObject.executionTime = executionTime;
        if (this.watchers[name].memoryUsage) {
            let executionMemory = this.prepareMemoryReport(name);
            retrunObject.executionMemory = executionMemory
        }
        this.watchers[name] = undefined;
        return retrunObject
    }

    private isWatcherAvailable(name: string) {
        return this.watchers[name] !== undefined
    }

    private calculateExecutionTime(name: string): executionTime {
        const startTime = this.watchers[name].startTime;
        const endTime = process.hrtime.bigint();
        const executionTime = Number(endTime - startTime);
        const milliseconds = executionTime / 10000000;
        const seconds = executionTime / 1000000000;
        return {
            name: name,
            nanoseconds: endTime - startTime,
            milliseconds: milliseconds,
            seconds: seconds
        }
    }

    public ShowMemoryUsage(): executionMemory {
        return this.formatMemoryUsage(process.memoryUsage());
    }

    private prepareMemoryReport(name: string): executionMemoryReport {
        const startTimeMemory = this.watchers[name].memoryUsage;
        const endTimeMemory  = process.memoryUsage()
        const startTimeUsage: any = this.formatMemoryUsage(startTimeMemory);
        const endTimeUsage: any = this.formatMemoryUsage(endTimeMemory);
        const usageDifference = this.formatMemoryUsage({
            rss: endTimeMemory.rss - startTimeMemory.rss,
            heapUsed: endTimeMemory.heapUsed - startTimeMemory.heapUsed,
            heapTotal: endTimeMemory.heapTotal - startTimeMemory.heapTotal,
            external: endTimeMemory.external - startTimeMemory.external
        })
        return {
            startTimeUsage,
            endTimeUsage,
            usageDifference
        }
    }

    private formatMemoryUsage(usage: any): executionMemory {
        let rss = this.formatBytes(usage.rss);
        let heapUsed = this.formatBytes(usage.heapUsed);
        let heapTotal = this.formatBytes(usage.heapTotal);
        let external = this.formatBytes(usage.external);
        return {
            rss,
            heapUsed,
            heapTotal,
            external
        }
    }

    private formatBytes(bytes: number, decimals: number = 3) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
var object = new CalculateExecutionTimeAndSpace();

export default object;