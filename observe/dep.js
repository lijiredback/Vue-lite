class Dep {
    constructor() {
        this.subs = []; // 收集依赖，watcher
    }
    addSubs(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => sub.update);
    }
}
