# localstorage-browser-polyfill

[![NPM version](https://img.shields.io/npm/v/localstorage-browser-polyfill.svg?style=flat)](https://npmjs.org/package/localstorage-browser-polyfill)


IE6/7 `localStorage` [test](nimojs.github.io/localstorage-browser-polyfill/test.html)

> IE 8 and 9 store data based only on hostname, ignoring the scheme (http vs https) and port number as required by the specification.

> **Do not use `localStorage.some = 'abc'` and `localStorage.some` change storage, You must use `localStorage.setItem('some')` and `localStorage.getItem('some')`.**

## Usage

### commonjs
```js
require('localstorage-browser-polyfill')
```
###  Script tag
```html
<script src="http://unpkg.com/localstorage-browser-polyfill/localstorage-browser-polyfill.js"></script>
```

### window.localStorageBrowserPolyfill

Current browser support for localStorage?

```js
if (typeof window.localStorageBrowserPolyfill === 'undefined') {
    console.log('Support!')
}
else {
    console.log('Not support!')
}
```

### storage event

`Because can't perfect simulation storage event, so use regularly polling.`

```js
if (typeof window.localStorageBrowserPolyfill === 'undefined') {
    // IE onstorage
    if (document.attachEvent) {
        document.attachEvent("onstorage", function () {

        })
    }
    else{
        window.addEventListener("storage", function () {

        })
    }
}
else {
    setTimeout(function () {
        var some = localStorage.getItem('some')
        // Do something
        setTimeout(arguments.callee, 500)
    }, 500)
}
```

### Known issues

1. IE10 in Windows 8 has an issue where localStorage can fail with the error message "SCRIPT5: Access is denied" if "integrity" settings are not set correctly. see details
2. In IE attempting to access localStorage on HTML files served from the file system results in the localStorage object being undefined
3. Internet Explorer does not support storing most of the ASCII characters with codes under x20.
4. The "storage" event is completely wrong in IE:
IE10 : The storage event is fired even on the originating document where it occurred. Causes problems with multiple windows websites, and huge problems with iframes.
IE11 : The storage event's oldValue and newValue are identical (newValue is supposed to contain the storage's updated value).

Partial workaround: regularly probe the storage's value and compare with the last known value on all pages where you want to listen to this event, and track the last submitted value to determine if the modification was triggered locally.
5. In iOS 5 & 6 localStorage data is stored in a location that may occasionally be cleared out by the OS.
6. In private browsing mode, Safari, iOS Safari and the Android browser (not include Chrome for Android) do not support setting sessionStorage or localStorage.
7. IE 8 and 9 store data based only on hostname, ignoring the scheme (http vs https) and port number as required by the specification.
8. Storing large amounts of data in Safari (on OSX & iOS) can result in freezing the browser see bug
