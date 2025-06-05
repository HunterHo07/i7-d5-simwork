import * as Phaser from 'phaser';
import { GAME_CONFIG, IsoUtils, ANIMATIONS } from '../config';
import { Direction, Point } from '@/types/game';

export class Character extends Phaser.GameObjects.Sprite {
  private moveSpeed: number = GAME_CONFIG.CHARACTER_SPEED;
  private currentDirection: Direction = Direction.SOUTH;
  private isMoving: boolean = false;
  private targetPosition?: Point;
  private movementTween?: Phaser.Tweens.Tween;
  private nameText!: Phaser.GameObjects.Text;
  private shadowSprite!: Phaser.GameObjects.Ellipse;

  constructor(scene: Phaser.Scene, x: number, y: number, characterType: string = 'character-male', name: string = 'Player') {
    // Use the generated character sprite
    super(scene, x, y, characterType);

    // Create character shadow
    this.shadowSprite = scene.add.ellipse(x, y + 20, 30, 15, 0x000000, 0.3);
    this.shadowSprite.setDepth(IsoUtils.getDepth(x, y) - 1);

    // Create name text above character
    this.nameText = scene.add.text(x, y - 40, name, {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 4, y: 2 },
    });
    this.nameText.setOrigin(0.5);
    this.nameText.setDepth(IsoUtils.getDepth(x, y) + 1000);

    // Set initial properties
    this.setOrigin(0.5, 0.8);
    this.setDepth(IsoUtils.getDepth(x, y) + 100);
    this.setScale(1.5);

    // Start with idle animation
    this.playAnimation('idle');
  }

  // Character visual is now handled by the AssetManager
  // No need for createCharacterVisual method

  public setMovement(deltaX: number, deltaY: number) {
    if (deltaX === 0 && deltaY === 0) {
      this.stopMovement();
      return;
    }

    // Determine direction based on movement
    this.currentDirection = this.getDirectionFromMovement(deltaX, deltaY);
    
    // Calculate movement in isometric space
    const moveDistance = this.moveSpeed * (1/60); // Assuming 60 FPS
    const isoMovement = this.calculateIsometricMovement(deltaX, deltaY, moveDistance);
    
    // Update position
    this.x += isoMovement.x;
    this.y += isoMovement.y;
    
    // Update depth for proper layering
    this.updateDepth();
    
    // Update shadow and name positions
    this.updateAttachedElements();
    
    // Play walking animation
    if (!this.isMoving) {
      this.isMoving = true;
      this.playAnimation('walk');
    }
  }

  public stopMovement() {
    if (this.isMoving) {
      this.isMoving = false;
      this.playAnimation('idle');
    }
  }

  public moveToTile(tileX: number, tileY: number) {
    const worldPos = IsoUtils.tileToWorld(tileX, tileY);
    this.moveToPosition(worldPos.x, worldPos.y);
  }

  public moveToPosition(x: number, y: number) {
    // Stop current movement
    if (this.movementTween) {
      this.movementTween.stop();
    }

    this.targetPosition = { x, y };
    
    // Calculate direction for animation
    const deltaX = x - this.x;
    const deltaY = y - this.y;
    this.currentDirection = this.getDirectionFromMovement(
      Math.sign(deltaX), 
      Math.sign(deltaY)
    );
    
    // Calculate distance and duration
    const distance = Phaser.Math.Distance.Between(this.x, this.y, x, y);
    const duration = (distance / this.moveSpeed) * 1000;
    
    // Start movement
    this.isMoving = true;
    this.playAnimation('walk');
    
    this.movementTween = this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: duration,
      ease: 'Linear',
      onUpdate: () => {
        this.updateDepth();
        this.updateAttachedElements();
      },
      onComplete: () => {
        this.isMoving = false;
        this.playAnimation('idle');
        this.targetPosition = undefined;
      }
    });
  }

  private calculateIsometricMovement(deltaX: number, deltaY: number, distance: number): Point {
    // Normalize the movement vector
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (length === 0) return { x: 0, y: 0 };
    
    const normalizedX = deltaX / length;
    const normalizedY = deltaY / length;
    
    // Convert to isometric movement
    const isoX = (normalizedX - normalizedY) * distance * 0.5;
    const isoY = (normalizedX + normalizedY) * distance * 0.25;
    
    return { x: isoX, y: isoY };
  }

  private getDirectionFromMovement(deltaX: number, deltaY: number): Direction {
    // Convert movement to 8-directional movement
    if (deltaX === 0 && deltaY < 0) return Direction.NORTH;
    if (deltaX > 0 && deltaY < 0) return Direction.NORTHEAST;
    if (deltaX > 0 && deltaY === 0) return Direction.EAST;
    if (deltaX > 0 && deltaY > 0) return Direction.SOUTHEAST;
    if (deltaX === 0 && deltaY > 0) return Direction.SOUTH;
    if (deltaX < 0 && deltaY > 0) return Direction.SOUTHWEST;
    if (deltaX < 0 && deltaY === 0) return Direction.WEST;
    if (deltaX < 0 && deltaY < 0) return Direction.NORTHWEST;
    
    return Direction.SOUTH; // Default
  }

  private playAnimation(type: 'idle' | 'walk' | 'work') {
    const characterType = this.texture.key;
    let animationKey: string;

    switch (type) {
      case 'idle':
        animationKey = `${characterType}-idle-${this.getDirectionString()}`;
        break;
      case 'walk':
        animationKey = `${characterType}-walk-${this.getDirectionString()}`;
        break;
      case 'work':
        animationKey = `${characterType}-typing`;
        break;
      default:
        animationKey = `${characterType}-idle-south`;
    }

    // Only play if animation exists and not already playing
    if (this.scene.anims.exists(animationKey) && this.anims.currentAnim?.key !== animationKey) {
      this.play(animationKey);
    }
  }

  private getDirectionString(): string {
    switch (this.currentDirection) {
      case Direction.NORTH: return 'north';
      case Direction.NORTHEAST: return 'northeast';
      case Direction.EAST: return 'east';
      case Direction.SOUTHEAST: return 'southeast';
      case Direction.SOUTH: return 'south';
      case Direction.SOUTHWEST: return 'southwest';
      case Direction.WEST: return 'west';
      case Direction.NORTHWEST: return 'northwest';
      default: return 'south';
    }
  }

  private updateDepth() {
    const cartPos = IsoUtils.isoToCart(this.x, this.y);
    this.setDepth(IsoUtils.getDepth(cartPos.x, cartPos.y) + 100);
  }

  private updateAttachedElements() {
    // Update shadow position
    this.shadowSprite.setPosition(this.x, this.y + 20);
    const cartPos = IsoUtils.isoToCart(this.x, this.y);
    this.shadowSprite.setDepth(IsoUtils.getDepth(cartPos.x, cartPos.y) - 1);
    
    // Update name text position
    this.nameText.setPosition(this.x, this.y - 40);
    this.nameText.setDepth(IsoUtils.getDepth(cartPos.x, cartPos.y) + 1000);
  }

  public getTilePosition(): Point {
    const cartPos = IsoUtils.isoToCart(this.x, this.y);
    return {
      x: Math.round(cartPos.x),
      y: Math.round(cartPos.y)
    };
  }

  public getWorldPosition(): Point {
    return { x: this.x, y: this.y };
  }

  public getCurrentDirection(): Direction {
    return this.currentDirection;
  }

  public getIsMoving(): boolean {
    return this.isMoving;
  }

  public setCharacterName(name: string) {
    this.nameText.setText(name);
  }

  public destroy() {
    // Clean up attached elements
    if (this.shadowSprite) {
      this.shadowSprite.destroy();
    }
    if (this.nameText) {
      this.nameText.destroy();
    }
    if (this.movementTween) {
      this.movementTween.stop();
    }
    
    super.destroy();
  }

  public update() {
    // Update method called each frame
    // Can be used for additional character logic
  }
}
