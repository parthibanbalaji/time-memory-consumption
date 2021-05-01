# time-memory-consumption
Module will help you to find how much time consumed by the script on the given frame.
Module will help you to show memory usage at a given point.

# usage
var watcher = require('time-memory-consumption')
watcher.startWatch('watcher2')
setTimeout(function () {
    let results =  watcher.stopWatch('watcher1');
    let currentUsageMemory = watcher.showMemoryUsage();
    console.log(results);
    console.log(currentUsageMemory);
}, 1000)

