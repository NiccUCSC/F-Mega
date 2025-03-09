class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

   
    create() {
        let width = this.cameras.main.width
        let height = this.cameras.main.height

        this.bgImg = this.add.sprite(0, 0, 'menu')
        this.bgImg.setOrigin(0.5, 0.5)
        this.bgImg.setDisplaySize(width, height)
        
        this.startImg = this.add.sprite(width * 49/96, height * 15/24, 'menu-start')
        this.startImg.setOrigin(0.5, 0.5)
        this.startImg.setDisplaySize(width/2, height/8)
        
        // To-do: add particles to main menu

        World.initMenu(this)
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000

        let width = this.cameras.main.width
        let height = this.cameras.main.height

        let imgAspect = 483 / 249

        let vSize = Math.min(height, width/imgAspect)

        this.bgImg.setPosition(width/2, height/2)
        this.bgImg.setDisplaySize(vSize*imgAspect, vSize)

        if (World.start.isDown) {
            this.scene.start('playScene')
        }

        // Make start text blink
        let blink_length = 0.5 // In seconds
        this.startImg.setAlpha(Math.round(time / blink_length)%2==0 ? 1 : 0)
    }
}