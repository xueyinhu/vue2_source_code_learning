export function patch(oldVnode, vnode) {
    let el = createEl(vnode)
    let parentEL = oldVnode.parentNode
    parentEL.insertBefore(el, oldVnode.nextSibling)
    parentEL.removeChild(oldVnode)
    return el
}

function createEl(vnode) {
    let {tag, children, key, data, text} = vnode
    if (typeof tag == 'string') {
        vnode.el = document.createElement(tag)
        if(children.length > 0) {
            children.forEach(child => {
                vnode.el.appendChild(createEl(child))
            });
        }
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}

