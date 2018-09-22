"use strict";
var iconSetFormats = {
    classic: 'png',
    material: 'svg'
};
var iconMapping = {
    Like: 'notLiked',
    Ban: 'ban',
    Play: 'playpause',
    Playlist: 'playlist',
    Prev: 'prev',
    Next: 'next',
    Shortcuts: 'off'
};
browser.storage.local.get(['colour', 'icons'], function (_a) {
    var colour = _a.colour, icons = _a.icons;
    document.getElementById("popupBody").setAttribute("style", "background-color:" + colour + ";");
    var iconSetFormat = iconSetFormats[icons] || 'png';
    SetIconSources(icons, iconSetFormat);
});
document.addEventListener("click", function (e) {
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
browser.storage.local.get('icons', function (res) {
    document.getElementById("popupBody").setAttribute("style", "background-color:" + res["colour"] + ";");
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
function SetSrc(elementId, src) {
    document.getElementById(elementId).setAttribute("src", src);
}
function SetIcon(elementId, iconName, iconSetName, format) {
    SetSrc(elementId, "../Content/icons/" + iconSetName + "/" + iconName + "." + format);
}
function SetIconSources(iconSetName, iconSetFormat) {
    for (var buttonId in iconMapping) {
        SetIcon(buttonId, iconMapping[buttonId], iconSetName, iconSetFormat);
    }
}
