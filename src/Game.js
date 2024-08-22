import Phaser from 'phaser';
import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';

const Game = forwardRef((props, ref) => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.CANVAS,
      width: 600,
      height: 400,
      parent: 'phaser-game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'assets/cloudWithSea.png');
      this.load.image('ball', 'assets/tennis-ball.png');
    }

    function create() {
      this.add.image(300, 200, 'sky');
      const ball = this.physics.add.image(300, 200, 'ball')
        .setCollideWorldBounds(true)
        .setBounce(1, 1);
      ball.setDisplaySize(50, 50);
      ball.setVelocity(300, 300); // Initial velocity

      gameRef.current = ball;

      ball.body.onWorldBounds = true;
      ball.body.world.on('worldbounds', (body) => {
        if (body.gameObject === ball) {
          // After hitting a wall, change the ball's velocity randomly
          ball.setVelocity(
            Phaser.Math.Between(-300, 300),
            Phaser.Math.Between(-300, 300)
          );
        }
      });
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    moveBall(direction) {
      if (!gameRef.current) return;

      // Set initial direction based on button press
      switch (direction) {
        case 'up1':
        case 'up2':
          gameRef.current.setVelocity(0, -300);
          break;
        case 'down1':
        case 'down2':
          gameRef.current.setVelocity(0, 300);
          break;
        case 'left1':
        case 'left2':
          gameRef.current.setVelocity(-300, 0);
          break;
        case 'right1':
        case 'right2':
          gameRef.current.setVelocity(300, 0);
          break;
        default:
          break;
      }
    },
  }));

  return <div id="phaser-game" style={{ width: '100%', height: '100%' }}></div>;
});

export default Game;
