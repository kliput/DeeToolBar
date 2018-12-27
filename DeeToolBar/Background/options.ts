declare var browser;
import { defaultSettings } from './background';

const settingsKeys: string[] = Object.keys(defaultSettings);

export function saveOptions() {
    const localStorage = browser.storage.local;
    const settings = {};
    settingsKeys.forEach(function (key) {
        settings[key] = document.getElementById(key)['value']; 
    });
    localStorage.set(settings);
}

export function getOptions(): Promise<object> {
    return browser.storage.local.get(settingsKeys);
}

export function restoreOptions() {
    getOptions().then(res => {
        settingsKeys.forEach((key) => {
            document.getElementById(key)['value'] = res[key];
        });
    });
}

function addListener() {
    document.querySelector("form").addEventListener("submit", saveOptions);
}

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    addListener();
});

