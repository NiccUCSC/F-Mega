class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        let width = this.cameras.main.width
        let height = this.cameras.main.height

        this.bgImg = this.add.sprite(0, 0, 'menu')
        this.bgImg.setOrigin(0.5, 0.5)
        
        this.startImg = this.add.sprite(0, 0, 'menu-start')
        this.startImg.setOrigin(0.5, 0.5)
        
        // To-do: add particles to main menu
        //this.particles = this.add.particles(width/2, height/2, 'particle-sparkle', Phaser.GameObjects.Particles.)

        this.controls = this.add.text(0, 0, 'WASD/Arrows - Drive\nR - Restart', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            padding: {
                x: 10,
                y: 5
            }
        });
        this.controls.setOrigin(0, 1)

        World.initMenu(this)
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        let width = this.cameras.main.width
        let height = this.cameras.main.height
        let vSize = Math.min(height, width/imgAspect)

        this.bgImg.setPosition(width/2, height/2)
        this.bgImg.setDisplaySize(vSize*imgAspect, vSize)
        this.startImg.setPosition(width * 49/96, height * 15/24)
        this.startImg.setDisplaySize(vSize*imgAspect/2, vSize/8)
        this.controls.setPosition(width/20, height)
        this.controls.setDisplaySize(vSize*imgAspect/4, vSize/9)

        // To-do: add particles to main menu
        //this.particles.setPosition(width/2, height/2)

        if (World.start.isDown) {
            this.scene.start('playScene')
        }

        // Make start text blink
        let blink_length = 0.5 // In seconds
        this.startImg.setAlpha(Math.round(time / blink_length)%2==0 ? 1 : 0)
    }
}