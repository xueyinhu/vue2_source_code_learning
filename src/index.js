import { initGlobApi } from "./global-api/index"
import initMixin from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"

function Vue(options) {
    this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
initGlobApi(Vue)

export default Vue
