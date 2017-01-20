require('./lib/polyfill/Array.indexOf.js')
require('./lib/polyfill/Array.forEach.js')
require('./lib/polyfill/eventListenerIEPolyfill.js')
require('JSON')
var Cookies = require('js-cookie')
var CreateLocalStorage = function (settings) {
    var length = 0
    for(var key in settings.storage) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            this[key] = settings.storage[key]
            length++
        }
    }
    this.length = length
}
CreateLocalStorage.prototype.__localstorage_browser_polyfill_disableKey = [
    'getItem',
    'key',
    'setItem',
    'removeItem',
    'length',
    'clear',
    '__localstorage_browser_polyfill_disableKey',
    '__localstorage_browser_polyfill_isDisableKey',
    '__localstorag_browser_polyfill_update'
]

CreateLocalStorage.prototype.__localstorage_browser_polyfill_isDisableKey = function (key) {
    return this.__localstorage_browser_polyfill_disableKey.indexOf(key) !== -1
}
CreateLocalStorage.prototype.__localstorag_browser_polyfill_update = function () {
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
CreateLocalStorage.prototype.setItem = function (key, value) {
    if (!key) {return}
    if (this.__localstorage_browser_polyfill_isDisableKey(key)) {
        throw new Error(key + ' is disable key, disable key: ' + this.__localstorage_browser_polyfill_disableKey.join(','))
    }
    var oldValue = this[key]
    this[key] = value
    this.__localstorag_browser_polyfill_update()
}
CreateLocalStorage.prototype.getItem = function (key) {
    return this[key] || null
}
CreateLocalStorage.prototype.clear = function () {
    for(var key in this) {
        if (!this.__localstorage_browser_polyfill_isDisableKey(key)) {
            delete this[key]
        }
    }
    this.__localstorag_browser_polyfill_update()
}
CreateLocalStorage.prototype.removeItem = function (delKey) {
    for(var key in this) {
        if (delKey === key && !this.__localstorage_browser_polyfill_isDisableKey(key)) {
            delete this[key]
        }
    }
    this.__localstorag_browser_polyfill_update()
}
var cookieData = Cookies.get('__localstorag_browser_polyfill')
cookieData = cookieData?JSON.parse(cookieData):{}
window.localStorageBrowserPolyfill = new CreateLocalStorage({
    storage: cookieData
})
