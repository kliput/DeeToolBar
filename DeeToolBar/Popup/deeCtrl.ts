declare var browser;

const iconSetFormats = {
    classic: 'png',
    material: 'svg'
};

const iconMapping = {
    Like: 'notLiked',
    Ban: 'ban',
    Play: 'playpause',
    Playlist: 'playlist',
    Prev: 'prev',
    Next: 'next',
    Shortcuts: 'off'
};

const settings = {
    colour: undefined,
    icons: undefined,
}

browser.storage.local.get(['colour', 'icons'], ({ colour, icons }) => {
    settings.colour = colour;
    settings.icons = icons;
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
    const src = IconPath(settings.icons, status ? 'on' : 'off', iconSetFormats[settings.icons]);
    document.getElementById("Shortcuts").setAttribute("src", src);
}

function UpdateLikeStatus(status) {
    const src = IconPath(settings.icons, status ? 'liked' : 'notLiked', iconSetFormats[settings.icons]);
    document.getElementById("Like").setAttribute("src", src);
}

function IconPath(iconSetName: string, iconName: string, format: string) {
    return `../Content/icons/${iconSetName}/${iconName}.${format}`;
}

function SetSrc(elementId: string, src: string) {
    document.getElementById(elementId).setAttribute("src", src);
}

function SetIcon(elementId: string, iconName: string, iconSetName: string, format: string) {
    SetSrc(elementId, `../Content/icons/${iconSetName}/${iconName}.${format}`)
}

function SetIconSources(iconSetName: string, iconSetFormat: string) {
    for (let buttonId in iconMapping) {
        console.log(`Setting icon: ${buttonId}, ${iconMapping[buttonId]}, ${iconSetName}, ${iconSetFormat}`);
        SetIcon(buttonId, iconMapping[buttonId], iconSetName, iconSetFormat);
    }
}
