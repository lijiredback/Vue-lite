import Dep from './dep';

class Watcher {
    constructor() {
        Dep.target = this;
    }
    update() {
        console.log('要通知更新了');
    }
}

export default Watcher;