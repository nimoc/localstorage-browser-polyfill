require('./lib/polyfill/Array.indexOf.js')
require('./lib/polyfill/Array.forEach.js')
require('JSON')
var Cookies = require('js-cookie')
var LocalStoragePolyfill = function (settings) {
    this.__localstorag_browser_polyfill_syncCookie()
    this.__localstorag_browser_polyfill_update()
}
LocalStoragePolyfill.prototype.__localstorag_browser_polyfill_syncCookie = function () {
    var cookieData = Cookies.get('__localstorag_browser_polyfill')
    cookieData = cookieData? JSON.parse(cookieData): {}
    for(var key in cookieData) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            this[key] = cookieData[key]
        }
    }
}
LocalStoragePolyfill.prototype.__localstorage_browser_polyfill_disableKey = [
    'getItem',
    'key',
    'setItem',
    'removeItem',
    'length',
    'clear',
    '__localstorage_browser_polyfill_disableKey',
    '__localstorage_browser_polyfill_isDisableKey',
    '__localstorag_browser_polyfill_update',
    '__localstorag_browser_polyfill_syncCookie'
]
LocalStoragePolyfill.prototype.__localstorage_browser_polyfill_isDisableKey = function (key) {
    return this.__localstorage_browser_polyfill_disableKey.indexOf(key) !== -1
}
LocalStoragePolyfill.prototype.__localstorag_browser_polyfill_update = function () {
    var length = 0
    var storage = {}
    for(var key in this) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            length++
            storage[key] = this[key]
        }
    }
    Cookies.set('__localstorag_browser_polyfill', JSON.stringify(storage), {
        expires: 365,
        path: '/'
    })
    this.length = length
}
LocalStoragePolyfill.prototype.setItem = function (key, value) {
    if (!key) {return}
    if (this.__localstorage_browser_polyfill_isDisableKey(key)) {
        throw new Error(key + ' is disable key, disable key: ' + this.__localstorage_browser_polyfill_disableKey.join(','))
    }
    this[key] = value
    this.__localstorag_browser_polyfill_update()
}
LocalStoragePolyfill.prototype.getItem = function (key) {
    if (this.__localstorage_browser_polyfill_isDisableKey(key)) {
        throw new Error(key + ' is disable key, disable key: ' + this.__localstorage_browser_polyfill_disableKey.join(','))
    }
    this.__localstorag_browser_polyfill_syncCookie()
    return this[key] || null
}
LocalStoragePolyfill.prototype.clear = function () {
    for(var key in this) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            delete this[key]
        }
    }
    this.__localstorag_browser_polyfill_update()
}
LocalStoragePolyfill.prototype.removeItem = function (delKey) {
    for(var key in this) {
        if (delKey === key && !this.__localstorage_browser_polyfill_isDisableKey(key)) {
            delete this[key]
        }
    }
    this.__localstorag_browser_polyfill_update()
}
LocalStoragePolyfill.prototype.key = function (index) {
    this.__localstorag_browser_polyfill_syncCookie()
    var array = []
    for(var key in this) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            array.push(key)
        }
    }
    return this.getItem(array[index])
}
if (typeof window.localStorage === 'undefined') {
    window.localStorageBrowserPolyfill = new LocalStoragePolyfill()
    window.localStorage = window.localStorageBrowserPolyfill
}
