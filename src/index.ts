import * as type from './type';
import * as util from './util'

class CalculateExecutionTimeAndMemory {
    private watchers: any = {};
    public startWatch(name: string): string {
        if (!name) {
            return 'Please provide name to start watch process'
        }
        if (this.watchers[name] == undefined) {
            this.watchers[name] = {
                startTime: process.hrtime.bigint(),
            }
            return `Started watching process`;
        } else {
            return `Already a watcher is registered with the provided name`;
        }
    }

    public stopWatch(name: string): type.executionTime | type.error {
        let retrunObject: any = {};
        if (!this.isWatcherAvailable(name)) {
            return { error: `Specified watcher '${name}' is not registered!` }
        }
        const startTime = this.watchers[name].startTime;
        this.watchers[name] = undefined;
        return util.calculateExecutionTime(name, startTime);
    }

    private isWatcherAvailable(name: string) {
        return this.watchers[name] !== undefined
    }

    public showMemoryUsage(): type.executionMemory {
        return util.formatMemoryUsage(process.memoryUsage());
    }

}
var wathcer = new CalculateExecutionTimeAndMemory();

export default wathcer;