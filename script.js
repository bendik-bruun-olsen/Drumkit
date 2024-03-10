const keyContainer = document.querySelector("#key-container");
const triggerBoxes = document.querySelectorAll(".triggers");

const hotKeys = {
    q: "clap",
    w: "hihat",
    e: "kick",
    r: "openhat",
    a: "ride",
    s: "snare",
    d: "tink",
    f: "tom"
};

window.addEventListener("keypress", (event) => {
    playSound(event.key);
    drumGlow(event.key)
});

for (let key in hotKeys) {
    const drumItem = document.createElement("div");
    const drumName = document.createElement("p");
    const drumHotkey = document.createElement("div");
    const drumKey = document.createElement("kbd");

    drumItem.classList.add("drum-item");
    drumHotkey.classList.add("hotkey");
    drumName.textContent = hotKeys[key].charAt(0).toUpperCase() + hotKeys[key].slice(1);
    drumKey.textContent = `${key}`;

    drumHotkey.append(drumKey);
    drumItem.append(drumName, drumHotkey);
    keyContainer.append(drumItem);

    drumItem.addEventListener("mousedown", () => {
        playSound(key);
        drumGlow(key);
    });
};

triggerBoxes.forEach(trigger => {
    trigger.addEventListener("mousedown", () => {
        const soundName = trigger.id.split("-")[0];
        const soundKey = Object.keys(hotKeys).find(key => hotKeys[key] === soundName);
        playSound(soundKey); 
    });
});

function playSound(key) {
    if (hotKeys[key]) new Audio(`./sounds/${hotKeys[key]}.wav`).play();
};

function drumGlow(key) {
    triggerBoxes.forEach(trigger => {
        if (trigger.id.split("-")[0] === hotKeys[key]) {
            trigger.classList.add("drum-glow-up");
            setTimeout(() => trigger.classList.remove("drum-glow-up"), 100);
        };
    });
};