class Vehicle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture="car", params) {
        params = {...{}, ...params}
        super(scene, 0, 0, texture)
        this.collidingWith = new Set()
        this.power = 100
        this.skidPercent = 0
        this.alive = true
        this.onDeathCallback = params.onDeathCallback
        this.prevPos = { x: 0, y: 0, theta: 0 }
    }

    impact(impactVelocity, other) {
        let damage = 2 * impactVelocity
        switch (other) {
        case "cop":
        case "car":
            this.power -= damage * 0.25
            break
        case "wall":
            this.power -= damage
            break
        }
        this.power = Math.max(this.power, 0)
    }

    sliding(skidPercent, time, dt) {
        this.skidPercent = skidPercent
    }

    sendSkidMarks() {
        let pos = this.box2dBody.getPosition()
        let tile = RoadTile.getTileAtWorld(pos.x, pos.y)
        if (tile) tile.drawSkidMarks(this.prevPos.x, this.prevPos.y, this.prevPos.rotation, pos.x, pos.y, this.rotation, this.skidPercent)
    }

    sendTempSkidMarks(nextx, nexty) {
        let pos = this.box2dBody.getPosition()
        let tile = RoadTile.getTileAtWorld(pos.x, pos.y)
        if (tile) tile.drawSkidMarks(pos.x, pos.y, this.rotation, nextx, nexty, this.rotation, this.skidPercent, true)
    }

    physicsUpdate(time, dt) {
        if (!this.alive) return

        // for (let other of this.collidingWith)
        //     if (/*other instanceof Cop*/ false) this.power -= 20 * dt

        // Death disabled
        // if (this.power <= 0) {
        //     this.power = 0
        //     this.alive = false

        //     let explosion = World.PlayScene.add.sprite(this.x, this.y, 'explodeSheet')
        //     explosion.setOrigin(0.5, 0.8)
        //     explosion.setScale(2)
        //     explosion.setDepth(10000)
        //     explosion.play('explode')
        //     explosion.on('animationcomplete', () => explosion.destroy())

        //     this.wheelSpeed = 0

        //     if (this.onDeathCallback) this.onDeathCallback(time, dt)
        // }

    }

    addCollide(other) {
        this.collidingWith.add(other)
    }

    removeCollide(other) {
        this.collidingWith.delete(other)
    }

    destroy() {
        let vehicles = World.PlayScene.children.getChildren().filter(obj => obj instanceof Vehicle)
        for (let vehicle of vehicles) vehicle.collidingWith.delete(this)
        super.destroy()
    }
}