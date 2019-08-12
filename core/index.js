// import Dep from '../observe/dep'
// import Watcher from '../observe/watcher'

function Vue(options) {
    // 判断逻辑差很多
    if (typeof options.data !== 'object' || !options) {
        return;
    }
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);

    // todo 实验
    new Watcher(); // 此时创建一个 watcher 实例，指向 Dep.target
    console.log(this.$data.message); // 触发 getter

    new Watcher();
    console.log(this.$data.foo.bar);
}

// data 是一个对象
Vue.prototype.observe = function(data) {
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach((key => {
        this.defineReactive(data, key, data[key]);
    }));
};

Vue.prototype.defineReactive = function(obj, key, val) {
    this.observe(val);

    // 每一个 key 都有一个 Dep 来收集依赖
    const dep = new Dep();


    Object.defineProperty(obj, key, {
        // enumerable: 判断逻辑
        get() {
            Dep.target && dep.addSubs(Dep.target);
            console.log(`${key}: ${dep.subs}` );
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            // console.log('更新了');
        }
    });
};


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

class Watcher {
    constructor() {
        Dep.target = this;
    }
    update() {
        console.log('要通知更新了');
    }
}

// export default Watcher;

// export default Vue;