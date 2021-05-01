import * as watcher from './index';


function testExection() {
    watcher.startWatch('watcher1');
    console.log(watcher.startWatch('watcher1')) // return error message
    watcher.startWatch('watcher2')
    setTimeout(function () {
        let results =  watcher.stopWatch('watcher1');
        console.log(results);
    }, 1000)
    setTimeout(function () {
        let results =  watcher.stopWatch('watcher2');
        console.log(watcher.stopWatch('watcher3')); // return error object
        console.log(results);
    }, 2000)

    let result = watcher.showMemoryUsage();
    console.log('current',result); //show current memory usage
}

testExection();