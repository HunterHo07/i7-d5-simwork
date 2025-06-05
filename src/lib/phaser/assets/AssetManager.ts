import * as Phaser from 'phaser';

export class AssetManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  // Create realistic character sprites using canvas
  createCharacterSprites() {
    // Professional Male Character
    this.createCharacterSprite('character-male', {
      skinColor: '#fdbcb4',
      hairColor: '#4a5568',
      shirtColor: '#3b82f6',
      pantsColor: '#2d3748',
      size: { width: 32, height: 48 }
    });

    // Professional Female Character
    this.createCharacterSprite('character-female', {
      skinColor: '#f7d1c4',
      hairColor: '#8b4513',
      shirtColor: '#ec4899',
      pantsColor: '#1f2937',
      size: { width: 32, height: 48 }
    });

    // Manager Character
    this.createCharacterSprite('character-manager', {
      skinColor: '#fdbcb4',
      hairColor: '#6b7280',
      shirtColor: '#1f2937',
      pantsColor: '#374151',
      size: { width: 32, height: 48 }
    });
  }

  private createCharacterSprite(key: string, config: any) {
    const { skinColor, hairColor, shirtColor, pantsColor, size } = config;
    
    // Create graphics object
    const graphics = this.scene.add.graphics();
    
    // Draw character body
    graphics.fillStyle(Phaser.Display.Color.HexStringToColor(shirtColor).color);
    graphics.fillRect(8, 16, 16, 20);
    
    // Draw head
    graphics.fillStyle(Phaser.Display.Color.HexStringToColor(skinColor).color);
    graphics.fillCircle(16, 12, 8);
    
    // Draw hair
    graphics.fillStyle(Phaser.Display.Color.HexStringToColor(hairColor).color);
    graphics.fillEllipse(16, 8, 14, 8);
    
    // Draw legs
    graphics.fillStyle(Phaser.Display.Color.HexStringToColor(pantsColor).color);
    graphics.fillRect(10, 36, 5, 12);
    graphics.fillRect(17, 36, 5, 12);
    
    // Draw arms
    graphics.fillStyle(Phaser.Display.Color.HexStringToColor(skinColor).color);
    graphics.fillRect(4, 18, 4, 12);
    graphics.fillRect(24, 18, 4, 12);
    
    // Generate texture
    graphics.generateTexture(key, size.width, size.height);
    graphics.destroy();
  }

  // Create office furniture sprites
  createOfficeFurniture() {
    this.createDeskSprite();
    this.createChairSprite();
    this.createComputerSprite();
    this.createPlantSprite();
    this.createCoffeeMachineSprite();
    this.createWhiteboardSprite();
    this.createBookshelfSprite();
    this.createPrinterSprite();
  }

  private createDeskSprite() {
    const graphics = this.scene.add.graphics();
    
    // Desk surface (isometric view)
    graphics.fillStyle(0x8b4513);
    graphics.beginPath();
    graphics.moveTo(32, 16);
    graphics.lineTo(64, 32);
    graphics.lineTo(32, 48);
    graphics.lineTo(0, 32);
    graphics.closePath();
    graphics.fillPath();
    
    // Desk edge
    graphics.fillStyle(0x654321);
    graphics.fillRect(0, 32, 64, 8);
    
    // Desk legs
    graphics.fillStyle(0x4a2c17);
    graphics.fillRect(8, 40, 4, 16);
    graphics.fillRect(52, 40, 4, 16);
    
    graphics.generateTexture('desk', 64, 56);
    graphics.destroy();
  }

  private createChairSprite() {
    const graphics = this.scene.add.graphics();
    
    // Chair seat
    graphics.fillStyle(0x2c3e50);
    graphics.fillEllipse(16, 20, 24, 16);
    
    // Chair back
    graphics.fillStyle(0x34495e);
    graphics.fillRect(12, 8, 8, 20);
    
    // Chair legs
    graphics.fillStyle(0x1a252f);
    graphics.fillRect(6, 28, 2, 12);
    graphics.fillRect(14, 28, 2, 12);
    graphics.fillRect(18, 28, 2, 12);
    graphics.fillRect(26, 28, 2, 12);
    
    graphics.generateTexture('chair', 32, 40);
    graphics.destroy();
  }

  private createComputerSprite() {
    const graphics = this.scene.add.graphics();
    
    // Monitor
    graphics.fillStyle(0x000000);
    graphics.fillRect(8, 8, 24, 18);
    
    // Monitor frame
    graphics.lineStyle(2, 0x333333);
    graphics.strokeRect(8, 8, 24, 18);
    
    // Screen glow
    graphics.fillStyle(0x0ea5e9, 0.6);
    graphics.fillRect(10, 10, 20, 14);
    
    // Monitor stand
    graphics.fillStyle(0x666666);
    graphics.fillRect(18, 26, 4, 8);
    graphics.fillRect(14, 34, 12, 4);
    
    // Keyboard
    graphics.fillStyle(0x2d3748);
    graphics.fillRect(12, 40, 16, 6);
    
    graphics.generateTexture('computer', 40, 46);
    graphics.destroy();
  }

  private createPlantSprite() {
    const graphics = this.scene.add.graphics();
    
    // Pot
    graphics.fillStyle(0x8b4513);
    graphics.fillEllipse(16, 28, 20, 12);
    
    // Plant leaves
    graphics.fillStyle(0x228b22);
    graphics.fillCircle(12, 16, 8);
    graphics.fillCircle(20, 12, 6);
    graphics.fillCircle(24, 18, 7);
    graphics.fillCircle(16, 20, 5);
    
    // Plant stem
    graphics.fillStyle(0x32cd32);
    graphics.fillRect(15, 20, 2, 8);
    
    graphics.generateTexture('plant', 32, 32);
    graphics.destroy();
  }

  private createCoffeeMachineSprite() {
    const graphics = this.scene.add.graphics();
    
    // Machine body
    graphics.fillStyle(0x2c3e50);
    graphics.fillRect(8, 12, 20, 24);
    
    // Machine front panel
    graphics.fillStyle(0x34495e);
    graphics.fillRect(10, 16, 16, 16);
    
    // Coffee dispenser
    graphics.fillStyle(0x1a252f);
    graphics.fillRect(14, 32, 8, 4);
    
    // Status light
    graphics.fillStyle(0x22c55e);
    graphics.fillCircle(26, 18, 2);
    
    // Buttons
    graphics.fillStyle(0x64748b);
    graphics.fillCircle(12, 20, 1);
    graphics.fillCircle(12, 24, 1);
    graphics.fillCircle(12, 28, 1);
    
    graphics.generateTexture('coffee-machine', 36, 40);
    graphics.destroy();
  }

  private createWhiteboardSprite() {
    const graphics = this.scene.add.graphics();
    
    // Whiteboard surface
    graphics.fillStyle(0xffffff);
    graphics.fillRect(4, 8, 40, 24);
    
    // Frame
    graphics.lineStyle(2, 0x666666);
    graphics.strokeRect(4, 8, 40, 24);
    
    // Some writing/diagrams
    graphics.lineStyle(1, 0x0ea5e9);
    graphics.strokeRect(8, 12, 12, 8);
    graphics.strokeRect(24, 12, 12, 8);
    
    // Arrow
    graphics.beginPath();
    graphics.moveTo(20, 16);
    graphics.lineTo(24, 16);
    graphics.stroke();
    
    graphics.generateTexture('whiteboard', 48, 40);
    graphics.destroy();
  }

  private createBookshelfSprite() {
    const graphics = this.scene.add.graphics();
    
    // Shelf structure
    graphics.fillStyle(0x8b4513);
    graphics.fillRect(4, 8, 32, 32);
    
    // Shelves
    graphics.fillStyle(0x654321);
    graphics.fillRect(6, 16, 28, 2);
    graphics.fillRect(6, 24, 28, 2);
    graphics.fillRect(6, 32, 28, 2);
    
    // Books
    const bookColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57];
    for (let shelf = 0; shelf < 3; shelf++) {
      for (let book = 0; book < 8; book++) {
        graphics.fillStyle(bookColors[book % bookColors.length]);
        graphics.fillRect(8 + book * 3, 10 + shelf * 8, 2, 6);
      }
    }
    
    graphics.generateTexture('bookshelf', 40, 44);
    graphics.destroy();
  }

  private createPrinterSprite() {
    const graphics = this.scene.add.graphics();
    
    // Printer body
    graphics.fillStyle(0xf8f9fa);
    graphics.fillRect(6, 16, 28, 16);
    
    // Printer top
    graphics.fillStyle(0xe9ecef);
    graphics.fillRect(8, 12, 24, 8);
    
    // Paper tray
    graphics.fillStyle(0xffffff);
    graphics.fillRect(10, 14, 20, 4);
    
    // Control panel
    graphics.fillStyle(0x343a40);
    graphics.fillRect(26, 18, 6, 4);
    
    // Status lights
    graphics.fillStyle(0x22c55e);
    graphics.fillCircle(28, 20, 1);
    
    graphics.generateTexture('printer', 40, 36);
    graphics.destroy();
  }

  // Create floor and wall tiles
  createEnvironmentTiles() {
    this.createFloorTile();
    this.createWallTile();
    this.createCarpetTile();
    this.createGlassTile();
  }

  private createFloorTile() {
    const graphics = this.scene.add.graphics();
    
    // Base floor color
    graphics.fillStyle(0xf5f5f5);
    graphics.beginPath();
    graphics.moveTo(32, 0);
    graphics.lineTo(64, 16);
    graphics.lineTo(32, 32);
    graphics.lineTo(0, 16);
    graphics.closePath();
    graphics.fillPath();
    
    // Tile lines
    graphics.lineStyle(1, 0xe0e0e0, 0.5);
    graphics.strokePath();
    
    // Subtle texture
    for (let i = 0; i < 5; i++) {
      graphics.fillStyle(0xeeeeee, 0.3);
      graphics.fillCircle(
        Math.random() * 64,
        Math.random() * 32,
        1
      );
    }
    
    graphics.generateTexture('floor-tile', 64, 32);
    graphics.destroy();
  }

  private createWallTile() {
    const graphics = this.scene.add.graphics();
    
    // Wall face
    graphics.fillStyle(0xe2e8f0);
    graphics.fillRect(0, 0, 64, 64);
    
    // Wall shading
    graphics.fillStyle(0xd1d5db, 0.3);
    graphics.fillRect(0, 0, 64, 8);
    graphics.fillRect(0, 56, 64, 8);
    
    // Wall texture lines
    graphics.lineStyle(1, 0xcbd5e1, 0.5);
    for (let i = 16; i < 64; i += 16) {
      graphics.beginPath();
      graphics.moveTo(0, i);
      graphics.lineTo(64, i);
      graphics.stroke();
    }
    
    graphics.generateTexture('wall-tile', 64, 64);
    graphics.destroy();
  }

  private createCarpetTile() {
    const graphics = this.scene.add.graphics();
    
    // Carpet base
    graphics.fillStyle(0x4f46e5);
    graphics.beginPath();
    graphics.moveTo(32, 0);
    graphics.lineTo(64, 16);
    graphics.lineTo(32, 32);
    graphics.lineTo(0, 16);
    graphics.closePath();
    graphics.fillPath();
    
    // Carpet pattern
    graphics.fillStyle(0x6366f1, 0.5);
    for (let x = 8; x < 64; x += 16) {
      for (let y = 4; y < 32; y += 8) {
        graphics.fillCircle(x, y, 2);
      }
    }
    
    graphics.generateTexture('carpet-tile', 64, 32);
    graphics.destroy();
  }

  private createGlassTile() {
    const graphics = this.scene.add.graphics();
    
    // Glass surface
    graphics.fillStyle(0x93c5fd, 0.3);
    graphics.fillRect(0, 0, 64, 64);
    
    // Glass reflection
    graphics.fillStyle(0xffffff, 0.2);
    graphics.fillRect(8, 8, 48, 8);
    graphics.fillRect(8, 24, 48, 8);
    graphics.fillRect(8, 40, 48, 8);
    
    // Glass frame
    graphics.lineStyle(2, 0x374151);
    graphics.strokeRect(0, 0, 64, 64);
    
    graphics.generateTexture('glass-tile', 64, 64);
    graphics.destroy();
  }

  // Initialize all assets
  initializeAssets() {
    this.createCharacterSprites();
    this.createOfficeFurniture();
    this.createEnvironmentTiles();
  }
}
