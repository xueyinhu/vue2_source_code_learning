import { observer } from "./observer/index"

export function initState(vm) {
    let ops = vm.$options
    if (ops.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === "function" ? data.call(vm) : data
    for (let key in data) {
        proxy(vm, "_data", key)
    }
    observer(data)
}

function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

