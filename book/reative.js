import Dep from './dep';

// 定义一个响应式数据
// 用来对 Object.defineProperty 做封装
// 每当从 data 的 key 中读取数据时，get 会被触发
// 每当设置 data 中 key 的数据时，set 会被触发

// let obj = {
//     a: 1,
//     b: 2,
// };

// 依赖：
// 每一个 key 都有一个数组，这个数组收集当前 key 的依赖
// 假设依赖是一个函数，保存在 window.target 上


function defineReactive(data, key, val) {
    let dep = new Dep();


    Object.defineProperty(data, key, {
        get() {
            dep.depend();
            return val;
        },
        set(newVal) {
            if (val === newVal) return;
            val = newVal;
            dep.notify();
        }
    })
}