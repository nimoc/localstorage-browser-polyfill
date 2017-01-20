var eText = document.getElementById('text')
var name = localStorageBrowserPolyfill.getItem('name')
if (!name) {
    name = ''
}
eText.value = name
var eventName = window.attachEvent? 'onpropertychange': 'oninput'
eText[eventName] = function () {
    localStorageBrowserPolyfill.setItem('name', this.value)
}
// Chrome server access must be used to trigger
// chrome 必须使用服务器访问才能触发
window.addEventListener('storage', function (e) {
    if (e.key === 'name') {
        eText.value = e.newValue
    }
    console.log(e)
})
