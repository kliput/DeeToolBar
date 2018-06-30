declare var browser;

const defaultSettings = {
    colour: 'white',
    icons: 'material'
};

const settingsKeys: string[] = Object.keys(defaultSettings);

function saveOptions(e) {
    const localStorage = browser.storage.local;
    settingsKeys.forEach((key) => {
        localStorage.set(key, document.getElementById(key)['value']);
    });
}
function restoreOptions() {
    const localStorage = browser.storage.local;
    localStorage.get(settingsKeys, (res) => {
        settingsKeys.forEach((key) => {
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

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    addListener();
});

