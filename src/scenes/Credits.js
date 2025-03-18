class Credits extends Phaser.Scene {
    static CREDITS = [
        "Nicolas Valiancourt: Back-end code & assets",
        "Niko DiStefano: Front-end code & assets",
        "",
        "All audio is free-use from Pixabay"
    ]
    static PADDING = 0.3    // In seconds
    static LENGTH = 3       // In seconds
    static TEXT_CONFIG = {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: {
            x: 10,
            y: 5
        }
    }

    constructor() {
        super('creditsScene')
    }

    create() {
        this.time = 0
        this.queue = [...Credits.CREDITS]
    }

    update(_, dt) {
        this.time += dt / 1000

        if (this.queue.length > 0) { 
            // delay
            if (this.time < Credits.PADDING * (Credits.CREDITS.length - this.queue.length + 1)) 
                return
        
            // show next text item
            const credit = this.queue.shift()
            if (credit.length > 0) {
                const pos = {x: width / 2, y: height / Credits.CREDITS.length * (Credits.CREDITS.length - this.queue.length)}
                const text = this.add.text(pos.x, pos.y, credit, {
                    fontFamily: 'Arial',
                    fontSize: '32px',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    padding: {
                        x: 10,
                        y: 5
                    }
                });
                text.setOrigin(0.5, 0.5)
                this.sound.play('copbonk')
            }
        }

        // delay
        if (this.time < Credits.LENGTH) 
            return

        // go to Title scene
        this.scene.start('menuScene')
    }
}