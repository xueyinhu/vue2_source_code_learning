export  const HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestory",
    "destroyed"
]
const strats = {}
strats.data = function (parentVal, childVal) {
    return childVal
}

function mergeHook(parentVal, childVal){
  if(childVal){
      if(parentVal){
           return parentVal.concat(childVal)
      }else{
          return [childVal]
      }
  }else{
       return parentVal
  }
}

HOOKS.forEach(hooks=>{
    strats[hooks] = mergeHook
})

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
            options[key] = strats[key](parent[key], child[key])
        } else {
            options[key] = child[key]
        }
    }
    return options
}