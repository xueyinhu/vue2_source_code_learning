import { patch } from "./vnode/patch"

export function mountComponent(vm, el) {
    vm._updata(vm._render())
}


export function lifecycleMixin(Vue) {
    Vue.prototype._updata = function(vnode) {
        let vm = this
        vm.$el = patch(vm.$el, vnode)
    }
}