class Credits extends Phaser.Scene {
    static CREDITS = [
        "Nicolas Valiancourt: Back-end code & assets",
        "Niko DiStefano: Front-end code & assets",
        "",
        "All audio is free-use from Pixabay"
    ]
    static DELAY = 0.5      // In seconds
    static PADDING = 0.5    // In seconds
    static LENGTH = 5       // In seconds
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
        this.update_hooks = []
    }

    update(_, dt) {
        this.time += dt / 1000
        for (const hook of this.update_hooks) hook(_, dt)

        if (this.queue.length > 0) { 
            // delay
            if (this.time < Credits.PADDING * (Credits.CREDITS.length - this.queue.length + 1) + Credits.DELAY) 
                return
        
            // show next text item
            const credit = this.queue.shift()
            if (credit.length > 0) {
                const text = this.add.text(0, 0, credit, {
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

                // update text size + positioning
                const list_height = Credits.CREDITS.length - this.queue.length
                const update = (_, dt) => {
                    let width = this.cameras.main.width
                    let height = this.cameras.main.height
                    const pos = {x: width / 2, y: height * list_height / (Credits.CREDITS.length + 1)}
                    text.setPosition(pos.x, pos.y)
                }
                this.update_hooks.push(update)
                update(_, dt)
            }
        }

        // delay
        if (this.time < Credits.LENGTH) 
            return

        // go to Title scene
        this.sound.play('copbonk')
        this.scene.start('menuScene')
    }
}