import * as Phaser from 'phaser';
import { IsoUtils, COLORS } from '../config';
import { WorkStationType, Point } from '@/types/game';

export class WorkStation extends Phaser.GameObjects.Container {
  public tileX: number;
  public tileY: number;
  public stationType: WorkStationType;
  private isHighlighted: boolean = false;
  private isOccupied: boolean = false;
  private occupiedBy?: string;
  private highlightGraphics!: Phaser.GameObjects.Graphics;
  private interactionPrompt!: Phaser.GameObjects.Text;
  private stationIcon!: Phaser.GameObjects.Graphics;
  private availableQuests: string[] = [];

  constructor(scene: Phaser.Scene, tileX: number, tileY: number, type: WorkStationType) {
    const worldPos = IsoUtils.tileToWorld(tileX, tileY);
    super(scene, worldPos.x, worldPos.y);

    this.tileX = tileX;
    this.tileY = tileY;
    this.stationType = type;

    this.createWorkStation();
    this.createHighlight();
    this.createInteractionPrompt();
    this.generateAvailableQuests();

    // Set depth for proper layering
    this.setDepth(IsoUtils.getDepth(tileX, tileY) + 50);
  }

  private createWorkStation() {
    // Create the visual representation based on station type
    switch (this.stationType) {
      case WorkStationType.DEVELOPER_DESK:
        this.createDeveloperStation();
        break;
      case WorkStationType.DESIGN_BAY:
        this.createDesignStation();
        break;
      case WorkStationType.DATA_ENTRY_STATION:
        this.createDataEntryStation();
        break;
      case WorkStationType.PM_BOARDROOM:
        this.createPMStation();
        break;
      case WorkStationType.AI_PROMPT_LAB:
        this.createAIStation();
        break;
    }
  }

  private createDeveloperStation() {
    // Computer monitor with code
    const monitor = this.scene.add.rectangle(0, -10, 25, 20, 0x000000);
    monitor.setStrokeStyle(2, 0x333333);
    this.add(monitor);

    // Screen glow
    const screenGlow = this.scene.add.rectangle(0, -10, 23, 18, COLORS.PRIMARY, 0.6);
    this.add(screenGlow);

    // Code lines on screen
    for (let i = 0; i < 4; i++) {
      const codeLine = this.scene.add.rectangle(-8 + (i % 2) * 16, -15 + i * 3, 12, 1, 0x00ff00);
      this.add(codeLine);
    }

    // Keyboard
    const keyboard = this.scene.add.rectangle(0, 5, 20, 8, 0x2d3748);
    keyboard.setStrokeStyle(1, 0x4a5568);
    this.add(keyboard);

    // Station icon
    this.createStationIcon('💻');
  }

  private createDesignStation() {
    // Large design monitor
    const monitor = this.scene.add.rectangle(0, -10, 30, 25, 0x000000);
    monitor.setStrokeStyle(2, 0x333333);
    this.add(monitor);

    // Colorful design on screen
    const colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.ACCENT];
    for (let i = 0; i < 3; i++) {
      const designElement = this.scene.add.circle(-8 + i * 8, -10, 4, colors[i], 0.8);
      this.add(designElement);
    }

    // Graphics tablet
    const tablet = this.scene.add.rectangle(8, 5, 15, 12, 0x1a1a1a);
    tablet.setStrokeStyle(1, 0x333333);
    this.add(tablet);

    // Stylus
    const stylus = this.scene.add.rectangle(12, 8, 8, 1, 0x64748b);
    this.add(stylus);

    this.createStationIcon('🎨');
  }

  private createDataEntryStation() {
    // Standard monitor
    const monitor = this.scene.add.rectangle(0, -10, 22, 18, 0x000000);
    monitor.setStrokeStyle(2, 0x333333);
    this.add(monitor);

    // Spreadsheet on screen
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = this.scene.add.rectangle(-6 + col * 4, -15 + row * 4, 3, 3, 0xffffff, 0.8);
        cell.setStrokeStyle(0.5, 0x000000);
        this.add(cell);
      }
    }

    // Stack of papers
    const papers = this.scene.add.rectangle(-12, 0, 8, 10, 0xffffff);
    papers.setStrokeStyle(1, 0xcccccc);
    this.add(papers);

    // Calculator
    const calculator = this.scene.add.rectangle(10, 2, 6, 8, 0x2d3748);
    calculator.setStrokeStyle(1, 0x4a5568);
    this.add(calculator);

    this.createStationIcon('📊');
  }

  private createPMStation() {
    // Conference table (larger area)
    const table = this.scene.add.rectangle(0, 0, 40, 25, 0x8b4513);
    table.setStrokeStyle(2, 0x654321);
    this.add(table);

    // Presentation screen
    const screen = this.scene.add.rectangle(0, -20, 35, 20, 0x000000);
    screen.setStrokeStyle(2, 0x333333);
    this.add(screen);

    // Project timeline on screen
    const timeline = this.scene.add.rectangle(0, -20, 30, 2, COLORS.ACCENT);
    this.add(timeline);

    // Milestone markers
    for (let i = 0; i < 4; i++) {
      const milestone = this.scene.add.circle(-12 + i * 8, -20, 2, COLORS.WARNING);
      this.add(milestone);
    }

    // Documents on table
    for (let i = 0; i < 3; i++) {
      const doc = this.scene.add.rectangle(-10 + i * 10, 0, 6, 8, 0xffffff);
      doc.setStrokeStyle(1, 0xcccccc);
      this.add(doc);
    }

    this.createStationIcon('📋');
  }

  private createAIStation() {
    // Futuristic curved monitor
    const monitor = this.scene.add.ellipse(0, -10, 30, 20, 0x000000);
    monitor.setStrokeStyle(2, 0x333333);
    this.add(monitor);

    // AI interface with flowing data
    const aiGlow = this.scene.add.circle(0, -10, 12, COLORS.SECONDARY, 0.4);
    this.add(aiGlow);

    // Neural network visualization
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 8;
      const y = Math.sin(angle) * 6 - 10;
      const node = this.scene.add.circle(x, y, 2, COLORS.INFO);
      this.add(node);
    }

    // Holographic projector
    const projector = this.scene.add.rectangle(0, 8, 12, 6, 0x1a1a1a);
    projector.setStrokeStyle(1, COLORS.SECONDARY);
    this.add(projector);

    // Hologram effect
    const hologram = this.scene.add.triangle(0, -5, 0, 10, -5, 0, 5, 0, COLORS.SECONDARY, 0.3);
    this.add(hologram);

    this.createStationIcon('🤖');
  }

  private createStationIcon(emoji: string) {
    // Create a simple icon representation
    this.stationIcon = this.scene.add.graphics();
    this.stationIcon.fillStyle(COLORS.BACKGROUND, 0.8);
    this.stationIcon.fillCircle(0, -35, 12);
    this.stationIcon.lineStyle(2, COLORS.PRIMARY);
    this.stationIcon.strokeCircle(0, -35, 12);
    this.add(this.stationIcon);

    // Add text representation of emoji (since we can't easily use emojis in Phaser)
    const iconText = this.scene.add.text(0, -35, this.getStationSymbol(), {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#ffffff',
    });
    iconText.setOrigin(0.5);
    this.add(iconText);
  }

  private getStationSymbol(): string {
    switch (this.stationType) {
      case WorkStationType.DEVELOPER_DESK: return '</>';
      case WorkStationType.DESIGN_BAY: return '◆';
      case WorkStationType.DATA_ENTRY_STATION: return '▦';
      case WorkStationType.PM_BOARDROOM: return '▲';
      case WorkStationType.AI_PROMPT_LAB: return '◉';
      default: return '?';
    }
  }

  private createHighlight() {
    this.highlightGraphics = this.scene.add.graphics();
    this.add(this.highlightGraphics);
    this.updateHighlight();
  }

  private createInteractionPrompt() {
    this.interactionPrompt = this.scene.add.text(0, -50, 'Press E to interact', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 },
    });
    this.interactionPrompt.setOrigin(0.5);
    this.interactionPrompt.setVisible(false);
    this.add(this.interactionPrompt);
  }

  private updateHighlight() {
    this.highlightGraphics.clear();
    
    if (this.isHighlighted) {
      // Draw highlight circle
      this.highlightGraphics.lineStyle(3, COLORS.ACCENT, 0.8);
      this.highlightGraphics.strokeCircle(0, 0, 35);
      
      // Add pulsing effect
      this.scene.tweens.add({
        targets: this.highlightGraphics,
        alpha: 0.5,
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    }
  }

  private generateAvailableQuests() {
    // Generate quests based on station type
    const questCount = Phaser.Math.Between(1, 3);
    
    for (let i = 0; i < questCount; i++) {
      const questId = `${this.stationType}-quest-${i + 1}`;
      this.availableQuests.push(questId);
    }
  }

  public setHighlighted(highlighted: boolean) {
    if (this.isHighlighted !== highlighted) {
      this.isHighlighted = highlighted;
      this.updateHighlight();
      this.interactionPrompt.setVisible(highlighted && !this.isOccupied);
    }
  }

  public setOccupied(occupied: boolean, userId?: string) {
    this.isOccupied = occupied;
    this.occupiedBy = userId;
    
    // Update visual state
    if (occupied) {
      this.setAlpha(0.7);
      this.interactionPrompt.setText('Station occupied');
    } else {
      this.setAlpha(1.0);
      this.interactionPrompt.setText('Press E to interact');
      this.occupiedBy = undefined;
    }
  }

  public getStationType(): WorkStationType {
    return this.stationType;
  }

  public getAvailableQuests(): string[] {
    return [...this.availableQuests];
  }

  public isStationOccupied(): boolean {
    return this.isOccupied;
  }

  public getOccupiedBy(): string | undefined {
    return this.occupiedBy;
  }

  public getTilePosition(): Point {
    return { x: this.tileX, y: this.tileY };
  }

  public getWorldPosition(): Point {
    return { x: this.x, y: this.y };
  }

  public getStationInfo() {
    return {
      id: `${this.stationType}-${this.tileX}-${this.tileY}`,
      type: this.stationType,
      position: this.getTilePosition(),
      isOccupied: this.isOccupied,
      occupiedBy: this.occupiedBy,
      availableQuests: this.availableQuests,
      isHighlighted: this.isHighlighted,
    };
  }

  public addQuest(questId: string) {
    if (!this.availableQuests.includes(questId)) {
      this.availableQuests.push(questId);
    }
  }

  public removeQuest(questId: string) {
    const index = this.availableQuests.indexOf(questId);
    if (index > -1) {
      this.availableQuests.splice(index, 1);
    }
  }

  public interact() {
    if (this.isOccupied) {
      return null;
    }

    // Return interaction data
    return {
      stationType: this.stationType,
      availableQuests: this.availableQuests,
      position: this.getTilePosition(),
    };
  }
}
