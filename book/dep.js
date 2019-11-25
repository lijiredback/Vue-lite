export default class Dep {
    constructor() {
        this.subs = [];
    }

    // 收集依赖
    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        if (window.target) {
            this.addSub(window.target);
        }
    }

    notify() {
        // 浅拷贝了一个数组
        const subs = this.subs.slice();
        for(let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}