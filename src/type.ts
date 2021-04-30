export interface executionTime {
    name: string,
    nanoseconds: bigint,
    milliseconds: number,
    seconds: number
}

export interface executionMemory {
    rss: string,
    heapUsed: string,
    heapTotal: string,
    external: string
}


export interface error {
    error: string
}

