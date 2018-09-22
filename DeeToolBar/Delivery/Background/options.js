"use strict";
var defaultSettings = {
    colour: 'white',
    icons: 'material'
};
var settingsKeys = Object.keys(defaultSettings);
function saveOptions(e) {
    var localStorage = browser.storage.local;
    settingsKeys.forEach(function (key) {
        localStorage.set(key, document.getElementById(key)['value']);
    });
}
function restoreOptions() {
    var localStorage = browser.storage.local;
    localStorage.get(settingsKeys, function (res) {
        settingsKeys.forEach(function (key) {
            if (res[key] == null) {
                res[key] = defaultSettings[key];
            }
            document.getElementById(key)['value'] = res[key];
        });
    });
}
function addListener() {
    document.querySelector("form").addEventListener("submit", saveOptions);
}
document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    addListener();
});
