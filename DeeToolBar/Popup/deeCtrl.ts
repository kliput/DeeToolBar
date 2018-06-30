declare var browser;

const iconSetFormats = {
    classic: 'png',
    material: 'svg'
};

browser.storage.local.get(['colour', 'icons'], ({ colour, icons }) => {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + colour + ";")
    const iconSetFormat = iconSetFormats[icons] || 'png';
    SetIconSources(icons, iconSetFormat);
});

document.addEventListener("click", function (e: MouseEvent) {
    var id = e.target['id'];
    switch (id) {
        case 'Shortcuts':
            browser.runtime.sendMessage({ action: id }).then(UpdateShortcutsStatus);
            break;
        case 'Like':
            browser.runtime.sendMessage({ action: id });
            break;
        default:
            browser.runtime.sendMessage({ action: id });
            break;
    }
});

browser.runtime.onMessage.addListener(UpdateLikeStatus);
browser.runtime.sendMessage({ action: 'ShortcutsStatus' }).then(UpdateShortcutsStatus);
browser.runtime.sendMessage({ action: 'LikeStatus' });

browser.storage.local.get('icons', (res) => {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";")
});

function UpdateShortcutsStatus(status) {
    var src = "../Content/";
    src += status ? "on.png" : "off.png";
    document.getElementById("Shortcuts").setAttribute("src", src);
}

function UpdateLikeStatus(status) {
    var src = "../Content/";
    src += status ? "liked.png" : "notLiked.png";
    document.getElementById("Like").setAttribute("src", src);
}

function SetSrc(elementId: string, src: string) {
    document.getElementById(elementId).setAttribute("src", src);
}

function SetIcon(elementId: string, iconName: string, iconSetName: string, format: string) {
    SetSrc(elementId, `../Content/icons/${iconSetName}/${iconName}.${format}`)
}

function SetIconSources(iconSetName: string, iconSetFormat: string) {
    SetIcon('Like', 'notLiked', iconSetName, iconSetFormat);
    SetIcon('Ban', 'ban', iconSetName, iconSetFormat);
    SetIcon('Play', 'playpause', iconSetName, iconSetFormat);
    SetIcon('Playlist', 'playlist', iconSetName, iconSetFormat);
    SetIcon('Prev', 'prev', iconSetName, iconSetFormat);
    SetIcon('Next', 'next', iconSetName, iconSetFormat);
    SetIcon('Shortcuts', 'off', iconSetName, iconSetFormat);
}
