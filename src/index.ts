import * as type from './type';
import * as util from './util'

var watchers: any = {};
export function startWatch(name: string): string {
    if (!name) {
        return 'Please provide name to start watch process'
    }
    if (watchers[name] == undefined) {
        watchers[name] = {
            startTime: process.hrtime.bigint(),
        }
        return `Started watching process`;
    } else {
        return `Already a watcher is registered with the provided name`;
    }
}

export function stopWatch(name: string): type.executionTime | type.error {
    let retrunObject: any = {};
    if (!isWatcherAvailable(name)) {
        return { error: `Specified watcher '${name}' is not registered!` }
    }
    const startTime = watchers[name].startTime;
    watchers[name] = undefined;
    return util.calculateExecutionTime(name, startTime);
}

function isWatcherAvailable(name: string) {
    return watchers[name] !== undefined
}

export function showMemoryUsage(): type.executionMemory {
    return util.formatMemoryUsage(process.memoryUsage());
}

