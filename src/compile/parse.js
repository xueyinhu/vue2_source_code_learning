const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g


export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName,
            type: 1,
            children: [],
            attrs,
            parent: null
        }
    }
    
    let root
    let currentParent
    let stack = []
    
    function start(tag, attrs) {
        let element = createASTElement(tag, attrs)
        if (!root) {
            root = element
        }
        currentParent = element
        stack.push(element)
    }
    function charts(text) {
        text = text.replace(/\s/g, '')
        if (text) {
            currentParent.children.push({
                type: 3,
                text
            })
        }
    }
    function end(tag) {
        let element = stack.pop()
        currentParent = stack[stack.length - 1]
        if (currentParent) {
            element.parent = currentParent.tag
            currentParent.children.push(element)
        }
    }

    while(html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        let text
        if (textEnd > 0) {
            text = html.substring(0, textEnd)
        }
        if (text) {
            advance(textEnd)
            charts(text)
        }
    }
    function parseStartTag() {
        const start = html.match(startTagOpen)
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length)
            let attr
            let end
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]})
                advance(attr[0].length)
            }
            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }
    function advance(n) {
        html = html.substring(n)
    }
    return root
}
