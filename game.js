export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("background", "images/lacerveceria2.jpg");
    this.load.image("gameover", "images/gameOverOne.png");
    this.load.image("platform", "images/traygame.png");
    this.load.image("bottle", "images/estrellaGalicia.png");
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    // Add a background
    this.add.image(400, 250, "background");
    // Add a gameover Image
    this.gameOverImage = this.add.image(400, 100, "gameover");
    this.gameOverImage.visible = false;

    //Add a platform
    this.platform = this.physics.add.image(400, 460, "platform").setImmovable();
    this.platform.body.allowGravity = false;

    // Add a bottle as "ball" and his physics
    this.bottle = this.physics.add.image(400, 30, "bottle");
    this.bottle.setCollideWorldBounds(true);
    this.physics.add.collider(this.bottle, this.platform); // To make platform and bottle collide
    this.bottle.setBounce(1);
    //Velocity of bottle
    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }
    this.bottle.setVelocity(velocity, 12);
    // To make work at keyboard
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-600);
    } else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(600);
    } else {
      this.platform.setVelocityX(0);
    }

    if (this.bottle.y > 500) {
      console.log("Game Over");
      this.gameOverImage.visible = true;
      this.scene.pause();
    }
  }
}
