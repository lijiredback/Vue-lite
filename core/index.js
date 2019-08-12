function Vue(options) {
    // 判断逻辑差很多
    if (typeof options.data !== 'object' || !options) {
        return;
    }
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);
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
    Object.defineProperty(obj, key, {
        // enumerable: 判断逻辑
        get() {
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            console.log('更新了');
        }
    });
};