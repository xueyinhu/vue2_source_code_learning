(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function mergeOptions(parent, child) {
      for (var key in parent) {
        mergeField(key);
      }
      for (var _key in child) {
        mergeField(_key);
      }
      function mergeField(key) {
        if (start[key]) {
          starts[key](parent[key], child[key]);
        }
      }
    }

    function initGlobApi(Vue) {
      Vue.Mixin = function (mixin) {
        mergeOptions(this.options, mixin);
      };
    }

    var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
    var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
    var startTagOpen = new RegExp("^<".concat(qnameCapture));
    var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
    var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    var startTagClose = /^\s*(\/?)>/;
    function parseHTML(html) {
      function createASTElement(tagName, attrs) {
        return {
          tag: tagName,
          type: 1,
          children: [],
          attrs: attrs,
          parent: null
        };
      }
      var root;
      var currentParent;
      var stack = [];
      function start(tag, attrs) {
        var element = createASTElement(tag, attrs);
        if (!root) {
          root = element;
        }
        currentParent = element;
        stack.push(element);
      }
      function charts(text) {
        text = text.replace(/\s/g, '');
        if (text) {
          currentParent.children.push({
            type: 3,
            text: text
          });
        }
      }
      function end(tag) {
        var element = stack.pop();
        currentParent = stack[stack.length - 1];
        if (currentParent) {
          element.parent = currentParent.tag;
          currentParent.children.push(element);
        }
      }
      while (html) {
        var textEnd = html.indexOf('<');
        if (textEnd === 0) {
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }
          var endTagMatch = html.match(endTag);
          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]);
            continue;
          }
        }
        var text = void 0;
        if (textEnd > 0) {
          text = html.substring(0, textEnd);
        }
        if (text) {
          advance(textEnd);
          charts(text);
        }
      }
      function parseStartTag() {
        var start = html.match(startTagOpen);
        if (start) {
          var match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length);
          var attr;
          var _end;
          while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }
          if (_end) {
            advance(_end[0].length);
            return match;
          }
        }
      }
      function advance(n) {
        html = html.substring(n);
      }
      return root;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
      if (null != _i) {
        var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;
        try {
          if (_x = (_i = _i.call(arr)).next, 0 === i) {
            if (Object(_i) !== _i) return;
            _n = !1;
          } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
    function genProps(attrs) {
      var str = '';
      var _loop = function _loop() {
        var attr = attrs[i];
        if (attr.name === 'style') {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
              _item$split2 = _slicedToArray(_item$split, 2),
              key = _item$split2[0],
              val = _item$split2[1];
            obj[key] = val;
          });
          attr.value = obj;
        }
        str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
      };
      for (var i = 0; i < attrs.length; i++) {
        _loop();
      }
      return "{".concat(str.slice(0, -1), "}");
    }
    function gen(node) {
      if (node.type === 1) {
        return generate(node);
      } else {
        var text = node.text;
        if (!defaultTagRE.test(text)) {
          return "_v(".concat(JSON.stringify(text), ")");
        }
        var tokens = [];
        var lastIndex = defaultTagRE.lastIndex = 0;
        var match;
        while (match = defaultTagRE.exec(text)) {
          var index = match.index;
          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
          if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }
        }
        return "_v(".concat(tokens.join("+"), ")");
      }
    }
    function genChildren(el) {
      var children = el.children;
      if (children) {
        return children.map(function (child) {
          return gen(child);
        }).join(',');
      }
    }
    function generate(el) {
      var children = genChildren(el);
      var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
      return code;
    }

    function compileToFunction(el) {
      var ast = parseHTML(el);
      var code = generate(ast);
      var render = new Function("with(this){return ".concat(code, "}"));
      return render;
    }

    var oldArrayProtoMethods = Array.prototype;
    var ArrayMethods = Object.create(oldArrayProtoMethods);
    var method = ['push', 'pop', 'unshift', 'shift', 'splice'];
    method.forEach(function (item) {
      ArrayMethods[item] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var result = oldArrayProtoMethods[item].apply(this, args);
        switch (item) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.splice(2);
            break;
        }
        var ob = this.__ob__;
        if (inserted) {
          ob.observeArray(inserted);
        }
        return result;
      };
    });

    function observer(data) {
      if (_typeof(data) != 'object' || data == null) {
        return data;
      }
      return new Observer(data);
    }
    var Observer = /*#__PURE__*/function () {
      function Observer(data) {
        _classCallCheck(this, Observer);
        Object.defineProperty(data, '__ob__', {
          enumerable: false,
          value: this
        });
        if (Array.isArray(data)) {
          data.__proto__ = ArrayMethods;
          this.observeArray(data);
        } else {
          this.walk(data);
        }
      }
      _createClass(Observer, [{
        key: "walk",
        value: function walk(data) {
          var keys = Object.keys(data);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = data[key];
            defineReactive(data, key, value);
          }
        }
      }, {
        key: "observeArray",
        value: function observeArray(data) {
          for (var i = 0; i < data.length; i++) {
            observer(data[i]);
          }
        }
      }]);
      return Observer;
    }();
    function defineReactive(data, key, value) {
      observer(value);
      Object.defineProperty(data, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          if (newValue == value) return;
          data[key] = newValue;
        }
      });
    }

    function initState(vm) {
      var ops = vm.$options;
      if (ops.data) {
        initData(vm);
      }
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === "function" ? data.call(vm) : data;
      for (var key in data) {
        proxy(vm, "_data", key);
      }
      observer(data);
    }
    function proxy(vm, source, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[source][key];
        },
        set: function set(newValue) {
          vm[source][key] = newValue;
        }
      });
    }

    function patch(oldVnode, vnode) {
      var el = createEl(vnode);
      var parentEL = oldVnode.parentNode;
      parentEL.insertBefore(el, oldVnode.nextSibling);
      parentEL.removeChild(oldVnode);
      return el;
    }
    function createEl(vnode) {
      var tag = vnode.tag,
        children = vnode.children;
        vnode.key;
        vnode.data;
        var text = vnode.text;
      if (typeof tag == 'string') {
        vnode.el = document.createElement(tag);
        if (children.length > 0) {
          children.forEach(function (child) {
            vnode.el.appendChild(createEl(child));
          });
        }
      } else {
        vnode.el = document.createTextNode(text);
      }
      return vnode.el;
    }

    function mountComponent(vm, el) {
      vm._updata(vm._render());
    }
    function lifecycleMixin(Vue) {
      Vue.prototype._updata = function (vnode) {
        var vm = this;
        vm.$el = patch(vm.$el, vnode);
      };
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options;
        initState(vm);
        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };
      Vue.prototype.$mount = function (el) {
        var vm = this;
        var options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;
        if (!options.render) {
          var template = options.template;
          if (!template && el) {
            el = el.outerHTML;
            var render = compileToFunction(el);
            options.render = render;
          }
        }
        mountComponent(vm);
      };
    }

    function renderMixin(Vue) {
      Vue.prototype._c = function () {
        return createElement.apply(void 0, arguments);
      };
      Vue.prototype._v = function (text) {
        return createText(text);
      };
      Vue.prototype._s = function (val) {
        return val == null ? "" : _typeof(val) === 'object' ? JSON.stringify(val) : val;
      };
      Vue.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render;
        var vnode = render.call(this);
        return vnode;
      };
    }
    function createElement(tag) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      return vnode(tag, data, data.key, children, undefined);
    }
    function createText(text) {
      return vnode(undefined, undefined, undefined, undefined, text);
    }
    function vnode(tag, data, key, children, text) {
      return {
        tag: tag,
        data: data,
        key: key,
        children: children,
        text: text
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);
    initGlobApi(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
