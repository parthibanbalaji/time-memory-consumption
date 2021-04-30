import * as type from './type';
export function formatMemoryUsage(usage: any): type.executionMemory {
    let rss = formatBytes(usage.rss);
    let heapUsed = formatBytes(usage.heapUsed);
    let heapTotal = formatBytes(usage.heapTotal);
    let external = formatBytes(usage.external);
    return {
        rss,
        heapUsed,
        heapTotal,
        external
    }
}

export function formatBytes(bytes: number, decimals: number = 3) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calculateExecutionTime(name: string, startTime: bigint): type.executionTime {
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
