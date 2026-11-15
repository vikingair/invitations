# Invitations

The hosted app allows you to send out links to others that will render an animated invitation.

The app doesn't require or collect any personal information from you. It will just read the data from the URL
and use it to display your personal information for everyone who opens that link.

Here is out it works:

Run e.g. this in your JS console:

```js
const options = {
    content: "Here is my text.\nCheck it out",
    img: "https://live.staticflickr.com/4150/5045502202_1d867c8a41_b.jpg"
};
window.open("https://vikingair.github.io/invitations/?q=" + btoa(JSON.stringify(options)));
```

This will open the link with the given content and image directly for you.

## Options

All options are optional and here is a complete list:

| Option | Type | Default |
|-|-|-|
| content | string | Here could be your text |
| song | URL | - |
| img | URL | - |
| imgPosition | object-fit CSS attribute | - |
| envelopeColor | CSS color | #ea899a |
| confettiColor | CSS color | - (colorful) |

## Themes

The theme is selected via the `t` URL parameter (outside of `q`):

| `t` | Theme |
|-|-|
| `e` or missing | Envelope (options above) |
| `c` | Church (christening invitation) |

Unknown values fall back to the envelope.

### Church (`t=c`)

An illustrated church is shown whose door rumbles from time to time. Clicking the door zooms in, the doors
swing open, light bursts out and the invitation (photo + text) appears while petals drift down.

Run e.g. this in your JS console:

```js
const options = {
    content: "Wir laden euch herzlich zur Taufe ein!\nSonntag, 14. Juni, 11 Uhr",
    img: "https://live.staticflickr.com/4150/5045502202_1d867c8a41_b.jpg"
};
// UTF-8 safe base64 (plain `btoa` throws on characters like umlauts)
const q = btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(options))));
window.open("https://vikingair.github.io/invitations/?t=c&q=" + encodeURIComponent(q));
```

All options are optional and here is a complete list:

| Option | Type | Default |
|-|-|-|
| content | string | Here could be your text |
| img | URL | - |
| imgPosition | object-position CSS attribute | - |
| song | URL | - |
| churchColor | CSS color | #efe6d6 (warm stone) |
| accentColor | CSS color | #8fb3d9 (soft blue; doors, roof, frame, light tint) |
| petalColor | CSS color | - (mix of white and accent) |
