let oldArrayProtoMethods = Array.prototype
export let ArrayMethods = Object.create(oldArrayProtoMethods)
let method = [
    'push', 'pop', 'unshift', 'shift', 'splice'
]
method.forEach(item => {
    ArrayMethods[item] = function(...args) {
        let result = oldArrayProtoMethods[item].apply(this, args)
        switch(item) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.splice(2)
                break
        }
        let ob = this.__ob__
        if (inserted) {
            ob.observeArray(inserted)
        }
        return result
    }
})

