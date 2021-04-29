import watcher from './index';


function testExection() {
    watcher.startWatch('watcher1');
    console.log(watcher.startWatch('watcher1'))
    watcher.startWatch('watcher2', true)
    setTimeout(function () {
        let results =  watcher.stopWatch('watcher1');
        console.log(results);
    }, 1000)
    setTimeout(function () {
        let results =  watcher.stopWatch('watcher2');
        console.log(watcher.stopWatch('watcher3'));
        console.log(results);
    }, 2000)

    let result = watcher.ShowMemoryUsage();
    console.log('current',result);
}

testExection();