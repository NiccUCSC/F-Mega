class Win extends Menu {
    constructor() {
        super('winScene')
    }

    create() {
        super.create() // Add everything from the menu scene
        
        this.win_text = this.add.text(0, 0, (World.winner == 2) ? "TIE" : `${World.winner == 0 ? "RED" : "GREEN"} WINS`, this.controls.style)
        this.win_text.setOrigin(0.5, 0.5)
    }

    update(time, dt) {
        super.update(time, dt)  // Update everything from the menu scene

        time /= 1000
        dt /= 1000

        let width = this.cameras.main.width
        let height = this.cameras.main.height
        let vSize = Math.min(height, width/imgAspect)

        this.win_text.setPosition(width * 49/96, height/3)
        this.win_text.setDisplaySize(vSize*imgAspect*2/4, vSize*2/9)
    }
}