# time-memory-consumption
This Moduel will help you to find how much time and memory consumed by the script on the given frame.


#usage
var watcher = require('time-memory-consumption')
watcher.startWatch('watcher2')
setTimeout(function () {
    let results =  watcher.stopWatch('watcher1');
    console.log(results);
}, 1000)

