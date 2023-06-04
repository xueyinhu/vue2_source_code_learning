import { mergeOptions } from "../utils/index"

export function initGlobApi(Vue) {
    let options = {}
    Vue.Mixin = function(mixin) {
        mergeOptions(this.options, mixin)
    }
}

