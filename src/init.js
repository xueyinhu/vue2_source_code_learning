import { compileToFunction } from "./compile/index"
import { initState } from "./initState"
import { mountComponent } from "./lifecycle"

export default function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        let vm = this
        vm.$options = options
        initState(vm)
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function(el) {
        let vm = this
        let options = vm.$options
        el = document.querySelector(el)
        vm.$el = el
        if (!options.render) {
            let template = options.template
            if (!template && el) {
                el = el.outerHTML
                let render = compileToFunction(el)
                options.render = render
            }
        }
        mountComponent(vm, el)
    }
}


