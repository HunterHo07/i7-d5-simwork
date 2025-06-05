import * as Phaser from 'phaser';
import { ASSETS, COLORS, ANIMATIONS } from '../config';
import { AssetManager } from '../assets/AssetManager';
import { CharacterAnimations } from '../characters/CharacterAnimations';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;
  private progressText!: Phaser.GameObjects.Text;
  private assetManager!: AssetManager;
  private characterAnimations!: CharacterAnimations;

  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.createLoadingScreen();
    this.initializeAssetManagers();
    this.loadAssets();
    this.setupLoadingEvents();
  }

  private initializeAssetManagers() {
    this.assetManager = new AssetManager(this);
    this.characterAnimations = new CharacterAnimations(this);
  }

  private createLoadingScreen() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BACKGROUND);

    // SimWork logo/title
    const title = this.add.text(width / 2, height / 2 - 100, 'SimWork', {
      fontSize: '48px',
      fontFamily: 'Orbitron, monospace',
      color: '#0ea5e9',
      stroke: '#ffffff',
      strokeThickness: 2,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, height / 2 - 50, 'The Future of Work Simulation', {
      fontSize: '18px',
      fontFamily: 'Inter, sans-serif',
      color: '#64748b',
    }).setOrigin(0.5);

    // Loading text
    this.loadingText = this.add.text(width / 2, height / 2 + 50, 'Loading...', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Progress text
    this.progressText = this.add.text(width / 2, height / 2 + 80, '0%', {
      fontSize: '14px',
      fontFamily: 'JetBrains Mono, monospace',
      color: '#22c55e',
    }).setOrigin(0.5);

    // Loading bar background
    const barWidth = 400;
    const barHeight = 8;
    const barX = width / 2 - barWidth / 2;
    const barY = height / 2 + 100;

    this.add.rectangle(barX + barWidth / 2, barY + barHeight / 2, barWidth, barHeight, 0x334155);

    // Loading bar
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(COLORS.PRIMARY);

    // Add some visual flair
    this.createMatrixEffect();
  }

  private createMatrixEffect() {
    const { width, height } = this.cameras.main;

    // Create matrix rain effect
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const delay = Phaser.Math.Between(0, 2000);

      this.time.delayedCall(delay, () => {
        this.createMatrixColumn(x);
      });
    }
  }

  private createMatrixColumn(x: number) {
    const { height } = this.cameras.main;
    const characters = '01';
    let y = -50;

    const createChar = () => {
      if (y > height + 50) return;

      const char = characters[Math.floor(Math.random() * characters.length)];
      const text = this.add.text(x, y, char, {
        fontSize: '12px',
        fontFamily: 'JetBrains Mono, monospace',
        color: '#22c55e',
      });
      text.setAlpha(0.3);

      // Fade out animation
      this.tweens.add({
        targets: text,
        alpha: 0,
        duration: 1000,
        onComplete: () => text.destroy(),
      });

      y += 20;
      this.time.delayedCall(100, createChar);
    };

    createChar();
  }

  private loadAssets() {
    // Generate all game assets using our asset managers
    this.assetManager.initializeAssets();
    this.characterAnimations.initializeCharacterAnimations();

    // Load any external assets if needed
    // this.load.audio('ambient-office', ['/assets/audio/ambient/office.mp3']);
    // this.load.audio('click', ['/assets/audio/sfx/click.mp3']);
    // this.load.audio('notification', ['/assets/audio/sfx/notification.mp3']);

    // Mark loading as complete since we're generating assets
    this.load.start();
  }

  private setupLoadingEvents() {
    this.load.on('progress', (progress: number) => {
      const percentage = Math.round(progress * 100);
      this.progressText.setText(`${percentage}%`);

      // Update loading bar
      const barWidth = 400;
      const barHeight = 8;
      const { width, height } = this.cameras.main;
      const barX = width / 2 - barWidth / 2;
      const barY = height / 2 + 100;

      this.loadingBar.clear();
      this.loadingBar.fillStyle(COLORS.PRIMARY);
      this.loadingBar.fillRect(barX, barY, barWidth * progress, barHeight);
    });

    this.load.on('fileprogress', (file: any) => {
      this.loadingText.setText(`Loading: ${file.key}`);
    });

    this.load.on('complete', () => {
      this.loadingText.setText('Complete!');
      this.createAnimations();

      // Transition to main scene after a short delay
      this.time.delayedCall(1000, () => {
        this.scene.start('MainScene');
      });
    });
  }

  private createAnimations() {
    // Animations are now created by the CharacterAnimations class
    // This method is called after assets are loaded
    console.log('Character animations initialized');
  }
}