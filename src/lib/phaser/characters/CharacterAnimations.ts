import * as Phaser from 'phaser';

export class CharacterAnimations {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // Create walking animation frames for each direction
  createWalkingAnimations(characterKey: string) {
    const directions = [
      'south', 'southwest', 'west', 'northwest',
      'north', 'northeast', 'east', 'southeast'
    ];

    directions.forEach((direction, index) => {
      this.createDirectionalWalkFrames(characterKey, direction, index);
    });
  }

  private createDirectionalWalkFrames(characterKey: string, direction: string, directionIndex: number) {
    const frames: string[] = [];
    
    // Create 4 frames for walking animation
    for (let frame = 0; frame < 4; frame++) {
      const frameKey = `${characterKey}-walk-${direction}-${frame}`;
      this.createWalkFrame(characterKey, frameKey, directionIndex, frame);
      frames.push(frameKey);
    }

    // Create animation
    if (!this.scene.anims.exists(`${characterKey}-walk-${direction}`)) {
      this.scene.anims.create({
        key: `${characterKey}-walk-${direction}`,
        frames: frames.map(frame => ({ key: frame })),
        frameRate: 8,
        repeat: -1
      });
    }

    // Create idle animation (just first frame)
    if (!this.scene.anims.exists(`${characterKey}-idle-${direction}`)) {
      this.scene.anims.create({
        key: `${characterKey}-idle-${direction}`,
        frames: [{ key: frames[0] }],
        frameRate: 1,
        repeat: -1
      });
    }
  }

  private createWalkFrame(baseKey: string, frameKey: string, directionIndex: number, frameNumber: number) {
    const graphics = this.scene.add.graphics();
    
    // Character configuration
    const config = this.getCharacterConfig(baseKey);
    const { skinColor, hairColor, shirtColor, pantsColor } = config;
    
    // Calculate body position based on walking frame
    const bobOffset = Math.sin(frameNumber * Math.PI / 2) * 2;
    const legOffset = frameNumber % 2 === 0 ? 0 : 2;
    
    // Draw character based on direction
    this.drawCharacterFrame(graphics, {
      skinColor,
      hairColor,
      shirtColor,
      pantsColor,
      directionIndex,
      frameNumber,
      bobOffset,
      legOffset
    });
    
    graphics.generateTexture(frameKey, 32, 48);
    graphics.destroy();
  }

  private getCharacterConfig(characterKey: string) {
    const configs = {
      'character-male': {
        skinColor: 0xfdbcb4,
        hairColor: 0x4a5568,
        shirtColor: 0x3b82f6,
        pantsColor: 0x2d3748
      },
      'character-female': {
        skinColor: 0xf7d1c4,
        hairColor: 0x8b4513,
        shirtColor: 0xec4899,
        pantsColor: 0x1f2937
      },
      'character-manager': {
        skinColor: 0xfdbcb4,
        hairColor: 0x6b7280,
        shirtColor: 0x1f2937,
        pantsColor: 0x374151
      }
    };
    
    return configs[characterKey as keyof typeof configs] || configs['character-male'];
  }

  private drawCharacterFrame(graphics: Phaser.GameObjects.Graphics, params: any) {
    const { 
      skinColor, hairColor, shirtColor, pantsColor, 
      directionIndex, frameNumber, bobOffset, legOffset 
    } = params;
    
    const centerX = 16;
    const centerY = 24;
    
    // Adjust character facing based on direction
    const facingLeft = directionIndex >= 4;
    const scaleX = facingLeft ? -1 : 1;
    
    // Draw shadow
    graphics.fillStyle(0x000000, 0.3);
    graphics.fillEllipse(centerX, 44, 20, 8);
    
    // Draw legs (with walking animation)
    graphics.fillStyle(pantsColor);
    const leftLegX = centerX - 3 + (facingLeft ? 6 : 0);
    const rightLegX = centerX + 3 + (facingLeft ? -6 : 0);
    const leftLegY = centerY + 12 + (frameNumber % 2 === 0 ? legOffset : 0);
    const rightLegY = centerY + 12 + (frameNumber % 2 === 1 ? legOffset : 0);
    
    graphics.fillRect(leftLegX, leftLegY, 3, 12);
    graphics.fillRect(rightLegX, rightLegY, 3, 12);
    
    // Draw body
    graphics.fillStyle(shirtColor);
    graphics.fillRect(centerX - 6, centerY - 4 + bobOffset, 12, 16);
    
    // Draw arms (with walking animation)
    graphics.fillStyle(skinColor);
    const armSwing = Math.sin(frameNumber * Math.PI / 2) * 2;
    graphics.fillRect(centerX - 8, centerY + armSwing, 3, 10);
    graphics.fillRect(centerX + 5, centerY - armSwing, 3, 10);
    
    // Draw head
    graphics.fillStyle(skinColor);
    graphics.fillCircle(centerX, centerY - 8 + bobOffset, 6);
    
    // Draw hair
    graphics.fillStyle(hairColor);
    graphics.fillEllipse(centerX, centerY - 12 + bobOffset, 10, 6);
    
    // Draw face details based on direction
    this.drawFaceDetails(graphics, centerX, centerY - 8 + bobOffset, directionIndex);
  }

  private drawFaceDetails(graphics: Phaser.GameObjects.Graphics, x: number, y: number, directionIndex: number) {
    // Eyes
    graphics.fillStyle(0x000000);
    
    if (directionIndex === 0 || directionIndex === 7 || directionIndex === 1) { // South-facing
      graphics.fillCircle(x - 2, y - 1, 1);
      graphics.fillCircle(x + 2, y - 1, 1);
    } else if (directionIndex === 4 || directionIndex === 3 || directionIndex === 5) { // North-facing
      // Back of head, no face visible
    } else if (directionIndex === 2 || directionIndex === 6) { // Side view
      graphics.fillCircle(x + (directionIndex === 2 ? -1 : 1), y - 1, 1);
    }
    
    // Mouth (small smile)
    if (directionIndex <= 2 || directionIndex >= 6) {
      graphics.fillCircle(x, y + 1, 0.5);
    }
  }

  // Create work animations
  createWorkAnimations(characterKey: string) {
    this.createTypingAnimation(characterKey);
    this.createThinkingAnimation(characterKey);
    this.createPresentingAnimation(characterKey);
  }

  private createTypingAnimation(characterKey: string) {
    const frames: string[] = [];
    
    for (let frame = 0; frame < 4; frame++) {
      const frameKey = `${characterKey}-typing-${frame}`;
      this.createTypingFrame(characterKey, frameKey, frame);
      frames.push(frameKey);
    }

    if (!this.scene.anims.exists(`${characterKey}-typing`)) {
      this.scene.anims.create({
        key: `${characterKey}-typing`,
        frames: frames.map(frame => ({ key: frame })),
        frameRate: 6,
        repeat: -1
      });
    }
  }

  private createTypingFrame(baseKey: string, frameKey: string, frameNumber: number) {
    const graphics = this.scene.add.graphics();
    const config = this.getCharacterConfig(baseKey);
    
    const centerX = 16;
    const centerY = 24;
    
    // Draw basic character
    this.drawBasicCharacter(graphics, config, centerX, centerY);
    
    // Animate arms for typing
    const armPosition = Math.sin(frameNumber * Math.PI / 2) * 1;
    graphics.fillStyle(config.skinColor);
    graphics.fillRect(centerX - 8, centerY + 2 + armPosition, 3, 8);
    graphics.fillRect(centerX + 5, centerY + 2 - armPosition, 3, 8);
    
    // Draw hands on keyboard position
    graphics.fillCircle(centerX - 6, centerY + 10, 1);
    graphics.fillCircle(centerX + 6, centerY + 10, 1);
    
    graphics.generateTexture(frameKey, 32, 48);
    graphics.destroy();
  }

  private createThinkingAnimation(characterKey: string) {
    const frameKey = `${characterKey}-thinking`;
    const graphics = this.scene.add.graphics();
    const config = this.getCharacterConfig(characterKey);
    
    const centerX = 16;
    const centerY = 24;
    
    // Draw basic character
    this.drawBasicCharacter(graphics, config, centerX, centerY);
    
    // Hand to chin pose
    graphics.fillStyle(config.skinColor);
    graphics.fillRect(centerX + 3, centerY - 2, 3, 6);
    graphics.fillCircle(centerX + 5, centerY - 4, 1);
    
    // Thought bubble
    graphics.fillStyle(0xffffff, 0.8);
    graphics.fillCircle(centerX + 12, centerY - 15, 8);
    graphics.fillCircle(centerX + 8, centerY - 8, 3);
    graphics.fillCircle(centerX + 6, centerY - 5, 2);
    
    // Question mark in thought bubble
    graphics.fillStyle(0x000000);
    graphics.fillCircle(centerX + 12, centerY - 12, 1);
    graphics.fillRect(centerX + 11, centerY - 18, 2, 4);
    
    graphics.generateTexture(frameKey, 32, 48);
    graphics.destroy();

    if (!this.scene.anims.exists(`${characterKey}-thinking`)) {
      this.scene.anims.create({
        key: `${characterKey}-thinking`,
        frames: [{ key: frameKey }],
        frameRate: 1,
        repeat: -1
      });
    }
  }

  private createPresentingAnimation(characterKey: string) {
    const frameKey = `${characterKey}-presenting`;
    const graphics = this.scene.add.graphics();
    const config = this.getCharacterConfig(characterKey);
    
    const centerX = 16;
    const centerY = 24;
    
    // Draw basic character
    this.drawBasicCharacter(graphics, config, centerX, centerY);
    
    // Presenting pose - arm extended
    graphics.fillStyle(config.skinColor);
    graphics.fillRect(centerX + 6, centerY - 2, 8, 3);
    graphics.fillCircle(centerX + 14, centerY - 1, 1);
    
    graphics.generateTexture(frameKey, 32, 48);
    graphics.destroy();

    if (!this.scene.anims.exists(`${characterKey}-presenting`)) {
      this.scene.anims.create({
        key: `${characterKey}-presenting`,
        frames: [{ key: frameKey }],
        frameRate: 1,
        repeat: -1
      });
    }
  }

  private drawBasicCharacter(graphics: Phaser.GameObjects.Graphics, config: any, centerX: number, centerY: number) {
    const { skinColor, hairColor, shirtColor, pantsColor } = config;
    
    // Shadow
    graphics.fillStyle(0x000000, 0.3);
    graphics.fillEllipse(centerX, 44, 20, 8);
    
    // Legs
    graphics.fillStyle(pantsColor);
    graphics.fillRect(centerX - 3, centerY + 12, 3, 12);
    graphics.fillRect(centerX + 1, centerY + 12, 3, 12);
    
    // Body
    graphics.fillStyle(shirtColor);
    graphics.fillRect(centerX - 6, centerY - 4, 12, 16);
    
    // Head
    graphics.fillStyle(skinColor);
    graphics.fillCircle(centerX, centerY - 8, 6);
    
    // Hair
    graphics.fillStyle(hairColor);
    graphics.fillEllipse(centerX, centerY - 12, 10, 6);
    
    // Face
    graphics.fillStyle(0x000000);
    graphics.fillCircle(centerX - 2, centerY - 9, 1);
    graphics.fillCircle(centerX + 2, centerY - 9, 1);
    graphics.fillCircle(centerX, centerY - 7, 0.5);
  }

  // Initialize all character animations
  initializeCharacterAnimations() {
    const characterTypes = ['character-male', 'character-female', 'character-manager'];
    
    characterTypes.forEach(characterKey => {
      this.createWalkingAnimations(characterKey);
      this.createWorkAnimations(characterKey);
    });
  }
}
