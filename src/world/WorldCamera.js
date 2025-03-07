class WorldCamera {

    static prevWidth = 0
    static prevHeight = 0

    static cam1 = null
    static cam2 = null

    static mask1 = null
    static mask1Graphics = null

    static scene = null

    static init(scene) {
        this.scene = scene
        this.cam = scene.cameras.main

        console.log(this.cam)

        this.cam1 = scene.cameras.add(0, 0, World.screenWidth / 2, World.screenHeight)
        this.cam2 = scene.cameras.add(World.screenWidth / 2, 0, World.screenWidth / 2, World.screenHeight)


        this.vertTiles = 96
        this.zoom = tiles => 2 * scene.cameras.main.height / 16 / tiles


 
        this.mask1Graphics = scene.add.graphics()
        this.mask2Graphics = scene.add.graphics()

        this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
        this.cam1.setMask(this.mask)
    }

    static startFollow(target) {
        this.cam.startFollow(target, false, 0.5, 0.5)
        this.cam1.startFollow(target, false, 0.5, 0.5)
        this.cam2.startFollow(target, false, 0.5, 0.5)
    }

    static stopFollow() {
        this.cam.stopFollow()
    }

    static update(time, dt) {
        this.cam.setZoom(this.zoom(this.vertTiles))
        this.cam.alpha = 0

        if (this.prevWidth !== this.cam.width || this.prevHeight !== this.cam.height) {
            this.prevWidth = this.cam.width
            this.prevHeight = this.cam.height

            this.mask1Graphics.clear()
            this.mask1Graphics.fillStyle(0x000000)
            this.mask1Graphics.fillRect(0, 0, this.cam.width/2, this.cam.height)
            this.mask1 = this.mask1Graphics.createGeometryMask()
            this.cam1.setMask(this.mask1)

            this.mask2Graphics.clear()
            this.mask2Graphics.fillStyle(0x000000)
            this.mask2Graphics.fillRect(this.cam.width/2, 0, this.cam.width/2, this.cam.height)
            this.mask2 = this.mask2Graphics.createGeometryMask()
            this.cam2.setMask(this.mask2)


            const maxDiameter = ((this.cam.width / 2)**2 + this.cam.height**2)**0.5
            this.cam1.width = maxDiameter
            this.cam1.height = maxDiameter
            this.cam1.x = this.cam.width/4 - maxDiameter/2
            this.cam1.y = this.cam.height/2 - maxDiameter/2

            this.cam2.width = maxDiameter
            this.cam2.height = maxDiameter
            this.cam2.x = this.cam.width*3/4 - maxDiameter/2
            this.cam2.y = this.cam.height/2 - maxDiameter/2

        }




        this.cam1.setZoom(this.zoom(this.vertTiles))
        this.cam1.rotation = time

        this.cam2.setZoom(this.zoom(this.vertTiles))
        this.cam2.rotation = -time
    }
}