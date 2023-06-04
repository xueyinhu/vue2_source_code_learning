export function mergeOptions(parent, child) {
    const options = {}
    for(let key in parent) {
        mergeField(key)
    }
    for (let key in child) {
        mergeField(key)
    }
    function mergeField(key) {
        if (start[key]) {
            options[key] = starts[key](parent[key], child[key])
        }
    }
}