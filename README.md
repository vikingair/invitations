# Invitations

The hosted app allows you to send out links to others that will render an animated invitation.

The app doesn't require or collect any personal information from you. It will just read the data from the URL
and use it to display your personal information for everyone who opens that link.

Here is out it works:

Run e.g. this in your JS console:

```js
const q = btoa(JSON.stringify({ content: "Here is my text.\nCheck it out", img: "https://live.staticflickr.com/4150/5045502202_1d867c8a41_b.jpg" }));
window.open("https://fdc-viktor-luft.github.io/invitations/?q=" + q);
```

This will open the link with the given content and image directly for you.
