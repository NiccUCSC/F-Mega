class WorldCamera {

    static prevWidth = 0
    static prevHeight = 0

    static cam1 = null
    static cam2 = null

    static mask1 = null
    static mask1Graphics = null
    static mask2 = null
    static mask2Graphics = null

    static scene = null

    static init(scene) {
        this.scene = scene
        this.cam = scene.cameras.main

        if (!this.cam1) {
            this.cam1 = scene.cameras.add(0, 0, World.screenWidth / 2, World.screenHeight)
            this.cam2 = scene.cameras.add(World.screenWidth / 2, 0, World.screenWidth / 2, World.screenHeight)
            this.splitScreenGraphics = scene.add.graphics()
            this.mask1Graphics = scene.add.graphics()
            this.mask2Graphics = scene.add.graphics()
        }        

        this.vertTiles = 96
        this.zoom = tiles => 2 * scene.cameras.main.height / 16 / tiles
    }

    static startFollow(target, target2) {
        // this.cam.startFollow(target, false, 0.5, 0.5)
        this.cam1.startFollow(target, false, 0.5, 0.5)
        this.cam2.startFollow(target2, false, 0.5, 0.5)
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


            let points = [
                0,                      this.cam.height,
                0,                      0,
            ]
            let path = []
            let n = 10

            for (let i = 0; i <= n; i++) {
                let theta =  i * 2 * Math.PI / n

                let x = this.cam.width / 2  + World.screenUnit * 15 * (Math.cos(5*theta))
                let y = this.cam.height * i / n
                points.push(x, y)
                path.push(x, y)
            }


            let splitScreenGraphics = World.UIScene.splitScreenGraphics

            splitScreenGraphics.clear()
            splitScreenGraphics.lineStyle(World.screenUnit*6, 0x000000)// Black color with alpha transparency
            splitScreenGraphics.beginPath()
            for (let i = 0; i < n; i++) {
                let x0 = path[i*2]
                let y0 = path[i*2+1]
                let x1 = path[i*2+2]
                let y1 = path[i*2+3]


                splitScreenGraphics.moveTo(x0, y0)
                splitScreenGraphics.lineTo(x1, y1)
            }
            splitScreenGraphics.strokePath()
            splitScreenGraphics.closePath()

            splitScreenGraphics.fillStyle(0x000000)
            for (let i = 0; i <= n; i++) {
                let x = path[i*2]
                let y = path[i*2+1]
                splitScreenGraphics.fillCircle(x, y, World.screenUnit*6/2)
            }



            let poly = new Phaser.Geom.Polygon(points)

            this.mask1Graphics.clear()
            this.mask1Graphics.fillStyle(0x000000)
            this.mask1Graphics.fillPoints(poly.points, true)
            this.mask1 = this.mask1Graphics.createGeometryMask()
            this.cam1.setMask(this.mask1)
            

            this.mask2Graphics.clear()
            this.mask2Graphics.fillStyle(0x000000)
            this.mask2Graphics.fillPoints(poly.points, true)
            this.mask2 = this.mask2Graphics.createGeometryMask()
            this.mask2.invertAlpha = true
            this.cam2.setMask(this.mask2)

            console.log(this.mask1)

            


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


        const targetLerp = (curr, target, dt) => {
            const halfLife = 0.1
            let dist = target - curr
            dist = dist * 0.5 ** (dt / halfLife)
            return curr + dist
        }

        this.cam1.setZoom(this.zoom(this.vertTiles))        
        this.cam1.rotation = this.scene.car ? -Math.PI/2 - this.scene.car.rotation : 0

        this.cam2.setZoom(this.zoom(this.vertTiles))
        this.cam2.rotation = this.scene.car2 ? -Math.PI/2 - this.scene.car2.rotation : 0
    }
}