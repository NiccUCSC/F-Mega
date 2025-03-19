class Track {
    static gridSize = 128
    static tileSize = 64
    static gridPixelSize = Track.tileSize * Track.gridSize
    
    /*  TILE IDs
        2: finish line
        3-24: checkpoints
        25: fall death
        48: wall
        all other numbers: road
    */

    constructor(scene, x, y) {
        this.scene = scene

        this.map = this.scene.make.tilemap({key: "track", tileWidth: 32, tileHeight: 32})
        console.log(this.map)


        this.tileset = this.map.addTilesetImage("trackTileset", "tileset1", 32, 32)
        console.log(this.tileset)

        this.layer = this.map.createLayer("Tile Layer 1", this.tileset)
        this.layer.setScale(2)
        console.log(this.layer)

        this.setPosition(x, y)

        console.log(this)
    }

    setPosition(x, y) {
        this.layer.setPosition((x-125/256) * 2 * Track.gridPixelSize, (y-101/128) * Track.gridPixelSize)
    }

    destroy() {
        this.map.destroy()
        this.map = null
        this.body = undefined
    }

}