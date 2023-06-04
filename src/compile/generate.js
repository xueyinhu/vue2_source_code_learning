const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function genProps(attrs) {
    let str = ''
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]
        if (attr.name === 'style') {
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key, val] = item.split(':')
                obj[key] = val
            });
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    return `{${str.slice(0, -1)}}`
}

function gen(node) {
    if (node.type === 1) {
        return generate(node)
    } else {
        let text = node.text
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        }
        let tokens = []
        let lastIndex = defaultTagRE.lastIndex = 0
        let match
        while (match = defaultTagRE.exec(text)) {
            let index = match.index
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
            if (lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)))
            }
        }
        return `_v(${tokens.join("+")})`
    }
}

function genChildren(el) {
    let children = el.children
    if (children) {
        return children.map(child => gen(child)).join(',')
    }
}

export function generate(el) {
    let children = genChildren(el)
    let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'}${children ? `,${children}` : ''})`
    return code
}