// Make The Fake: F-MEGA, from JoJo's Bizarre Adventure
// Names: Nicolas Vaillancourt, Niko DiStefano
// Roles:
//  Niko - Assets, Frontend Code
//  Nicolas - Assets, Backend Code
// Date: 03/18/2025
// Hours: 100+
// Credits:
//  Particles, Music, & Sounds - Pixabay
//  Menu Art - JoJo's Bizarre Adventure (put through Adobe Illustrator)


'use strict'

let config = {
    type: Phaser.AUTO,
    pixelArt: true, // Ensures nearest-neighbor scaling globally
    scale: {
        mode: Phaser.Scale.RESIZE, // Fit the game to the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
    },
    scene: [ Load, Credits, Menu, Play, UI, Win ]
}

const game = new Phaser.Game(config)
const imgAspect = 483 / 249