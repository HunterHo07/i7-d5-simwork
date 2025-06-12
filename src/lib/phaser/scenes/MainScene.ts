import * as Phaser from 'phaser';
import { GAME_CONFIG, IsoUtils, COLORS, INPUT_CONFIG, GAME_EVENTS } from '../config';
import { Character } from './Character';
import { WorkStation } from './WorkStation';
import { Point, WorkStationType } from '@/types/game';
import { QuestSystem } from '../quests/QuestSystem';
import { QuestUI } from '../ui/QuestUI';
import { TaskManager } from '../tasks/TaskManager';

export class MainScene extends Phaser.Scene {
  private player!: Character;
  private npcs: Character[] = [];
  private workStations: WorkStation[] = [];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: any;
  private interactKey!: Phaser.Input.Keyboard.Key;
  private questKey!: Phaser.Input.Keyboard.Key;
  private mapLayer!: Phaser.Tilemaps.TilemapLayer;
  private objectsLayer!: Phaser.GameObjects.Group;
  private isometric = true;

  // Quest System
  private questSystem!: QuestSystem;
  private questUI!: QuestUI;
  private taskManager!: TaskManager;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.setupInput();
    this.createWorld();
    this.createPlayer();
    this.createNPCs();
    this.createWorkStations();
    this.setupQuestSystem();
    this.setupCamera();
    this.setupUI();
    this.startGameLoop();
  }

  private setupInput() {
    // Cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys();
    
    // WASD keys
    this.wasdKeys = this.input.keyboard!.addKeys('W,S,A,D');
    
    // Action keys
    this.interactKey = this.input.keyboard!.addKey('E');
    this.questKey = this.input.keyboard!.addKey('Q');

    // Mouse input
    this.input.on('pointerdown', this.handleMouseClick, this);
  }

  private createWorld() {
    const { MAP_WIDTH, MAP_HEIGHT, TILE_SIZE } = GAME_CONFIG;
    
    // Create a simple office floor layout
    this.createOfficeFloor();
    this.createOfficeWalls();
    this.createOfficeObjects();
  }

  private createOfficeFloor() {
    const { MAP_WIDTH, MAP_HEIGHT } = GAME_CONFIG;

    // Create floor tiles using generated assets
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        const worldPos = IsoUtils.tileToWorld(x, y);

        // Choose tile type based on area
        let tileKey = 'floor-tile';

        // Use carpet in meeting areas
        if ((x >= 18 && x <= 28 && y >= 18 && y <= 25)) {
          tileKey = 'carpet-tile';
        }

        // Create floor tile sprite
        const tile = this.add.image(worldPos.x, worldPos.y, tileKey);
        tile.setDepth(IsoUtils.getDepth(x, y));

        // Add some random variation
        if (Math.random() < 0.05) {
          tile.setTint(0xf0f0f0);
        }
      }
    }
  }

  private createOfficeWalls() {
    const { MAP_WIDTH, MAP_HEIGHT } = GAME_CONFIG;
    
    // Create perimeter walls
    for (let x = 0; x < MAP_WIDTH; x++) {
      // Top wall
      if (x === 0 || x === MAP_WIDTH - 1) {
        for (let y = 0; y < MAP_HEIGHT; y++) {
          this.createWall(x, y);
        }
      } else {
        this.createWall(x, 0);
        this.createWall(x, MAP_HEIGHT - 1);
      }
    }
    
    // Create internal walls to define work areas
    this.createWorkAreaWalls();
  }

  private createWorkAreaWalls() {
    // Developer area (top-left)
    this.createWallSection(5, 5, 15, 5); // Horizontal wall
    this.createWallSection(15, 5, 15, 15); // Vertical wall
    
    // Design bay (top-right)
    this.createWallSection(25, 5, 35, 5);
    this.createWallSection(25, 5, 25, 15);
    
    // Meeting rooms (center)
    this.createWallSection(18, 18, 28, 18);
    this.createWallSection(18, 18, 18, 25);
    this.createWallSection(28, 18, 28, 25);
    this.createWallSection(18, 25, 28, 25);
  }

  private createWallSection(x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    for (let i = 0; i <= steps; i++) {
      const x = x1 + (dx * i) / steps;
      const y = y1 + (dy * i) / steps;
      this.createWall(Math.round(x), Math.round(y));
    }
  }

  private createWall(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);

    // Use wall tile asset
    const wall = this.add.image(worldPos.x, worldPos.y - 20, 'wall-tile');
    wall.setDepth(IsoUtils.getDepth(x, y) + 1000);
    wall.setScale(1, 0.6); // Adjust height for wall appearance
  }

  private createOfficeObjects() {
    // Create desks, chairs, and computers for different work areas
    this.createDeveloperArea();
    this.createDesignBay();
    this.createMeetingRooms();
    this.createCommonAreas();
  }

  private createDeveloperArea() {
    // Developer desks with computers
    const devPositions = [
      { x: 8, y: 8 }, { x: 12, y: 8 },
      { x: 8, y: 12 }, { x: 12, y: 12 }
    ];
    
    devPositions.forEach(pos => {
      this.createDesk(pos.x, pos.y);
      this.createComputer(pos.x, pos.y - 1);
      this.createChair(pos.x, pos.y + 1);
    });
  }

  private createDesignBay() {
    // Design workstations with larger screens
    const designPositions = [
      { x: 28, y: 8 }, { x: 32, y: 8 },
      { x: 28, y: 12 }, { x: 32, y: 12 }
    ];
    
    designPositions.forEach(pos => {
      this.createDesk(pos.x, pos.y);
      this.createComputer(pos.x, pos.y - 1, 0x000000, true); // Larger screen
      this.createChair(pos.x, pos.y + 1);
    });
  }

  private createMeetingRooms() {
    // Conference table
    this.createTable(23, 21, 4, 2);
    
    // Chairs around the table
    for (let x = 21; x <= 25; x += 2) {
      this.createChair(x, 19);
      this.createChair(x, 23);
    }
  }

  private createCommonAreas() {
    // Coffee machine
    this.createCoffeeMachine(20, 30);

    // Plants for decoration
    this.createPlant(10, 20);
    this.createPlant(30, 20);
    this.createPlant(15, 35);
    this.createPlant(35, 35);

    // Bulletin board
    this.createBulletinBoard(5, 20);

    // Bookshelves
    this.createBookshelf(5, 15);
    this.createBookshelf(40, 15);

    // Printers
    this.createPrinter(18, 35);
    this.createPrinter(25, 35);

    // Additional furniture
    this.createWaterCooler(35, 30);
    this.createFileStorage(5, 25);
  }

  private createDesk(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const desk = this.add.image(worldPos.x, worldPos.y, 'desk');
    desk.setDepth(IsoUtils.getDepth(x, y) + 10);
  }

  private createComputer(x: number, y: number, screenColor = 0x000000, large = false) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const computer = this.add.image(worldPos.x, worldPos.y, 'computer');
    computer.setDepth(IsoUtils.getDepth(x, y) + 15);

    if (large) {
      computer.setScale(1.2);
    }
  }

  private createChair(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const chair = this.add.image(worldPos.x, worldPos.y, 'chair');
    chair.setDepth(IsoUtils.getDepth(x, y) + 5);
  }

  private createTable(x: number, y: number, width: number, height: number) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const worldPos = IsoUtils.tileToWorld(x + i, y + j);
        const table = this.add.rectangle(worldPos.x, worldPos.y, 30, 20, 0x654321);
        table.setStrokeStyle(1, 0x4a2c17);
        table.setDepth(IsoUtils.getDepth(x + i, y + j) + 10);
      }
    }
  }

  private createCoffeeMachine(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const machine = this.add.image(worldPos.x, worldPos.y, 'coffee-machine');
    machine.setDepth(IsoUtils.getDepth(x, y) + 20);
  }

  private createPlant(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const plant = this.add.image(worldPos.x, worldPos.y, 'plant');
    plant.setDepth(IsoUtils.getDepth(x, y) + 10);
  }

  private createBulletinBoard(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const board = this.add.image(worldPos.x, worldPos.y, 'whiteboard');
    board.setDepth(IsoUtils.getDepth(x, y) + 20);
  }

  private createBookshelf(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const bookshelf = this.add.image(worldPos.x, worldPos.y, 'bookshelf');
    bookshelf.setDepth(IsoUtils.getDepth(x, y) + 20);
  }

  private createPrinter(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);
    const printer = this.add.image(worldPos.x, worldPos.y, 'printer');
    printer.setDepth(IsoUtils.getDepth(x, y) + 15);
  }

  private createWaterCooler(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);

    // Create a simple water cooler using graphics
    const graphics = this.add.graphics();
    graphics.fillStyle(0x87ceeb); // Light blue
    graphics.fillRect(worldPos.x - 8, worldPos.y - 15, 16, 30);
    graphics.fillStyle(0x4682b4); // Steel blue
    graphics.fillRect(worldPos.x - 6, worldPos.y - 10, 12, 5);
    graphics.fillStyle(0x1e90ff); // Dodger blue
    graphics.fillCircle(worldPos.x, worldPos.y - 5, 3);
    graphics.setDepth(IsoUtils.getDepth(x, y) + 20);
  }

  private createFileStorage(x: number, y: number) {
    const worldPos = IsoUtils.tileToWorld(x, y);

    // Create file storage cabinet
    const graphics = this.add.graphics();
    graphics.fillStyle(0x696969); // Dim gray
    graphics.fillRect(worldPos.x - 12, worldPos.y - 10, 24, 20);
    graphics.fillStyle(0x2f4f4f); // Dark slate gray
    graphics.fillRect(worldPos.x - 10, worldPos.y - 8, 20, 3);
    graphics.fillRect(worldPos.x - 10, worldPos.y - 2, 20, 3);
    graphics.fillRect(worldPos.x - 10, worldPos.y + 4, 20, 3);
    graphics.setDepth(IsoUtils.getDepth(x, y) + 20);
  }

  private createPlayer() {
    // Start player in the center of the office
    const startPos = IsoUtils.tileToWorld(20, 20);
    this.player = new Character(this, startPos.x, startPos.y, 'character-male', 'You');
    this.add.existing(this.player);
  }

  private createNPCs() {
    // Create various NPCs around the office
    const npcData = [
      { x: 10, y: 10, type: 'character-female', name: 'Sarah', activity: 'typing' },
      { x: 14, y: 10, type: 'character-manager', name: 'Mike', activity: 'thinking' },
      { x: 30, y: 10, type: 'character-female', name: 'Lisa', activity: 'typing' },
      { x: 34, y: 10, type: 'character-male', name: 'Alex', activity: 'typing' },
      { x: 25, y: 23, type: 'character-manager', name: 'David', activity: 'presenting' },
      { x: 21, y: 31, type: 'character-female', name: 'Emma', activity: 'idle' },
    ];

    npcData.forEach(npc => {
      const worldPos = IsoUtils.tileToWorld(npc.x, npc.y);
      const character = new Character(this, worldPos.x, worldPos.y, npc.type, npc.name);

      // Set NPC to work animation if specified
      if (npc.activity !== 'idle') {
        setTimeout(() => {
          character.play(`${npc.type}-${npc.activity}`);
        }, 1000);
      }

      this.add.existing(character);
      this.npcs.push(character);
    });
  }

  private createWorkStations() {
    // Developer stations
    this.workStations.push(new WorkStation(this, 8, 8, WorkStationType.DEVELOPER_DESK));
    this.workStations.push(new WorkStation(this, 12, 8, WorkStationType.DEVELOPER_DESK));

    // Design stations
    this.workStations.push(new WorkStation(this, 28, 8, WorkStationType.DESIGN_BAY));
    this.workStations.push(new WorkStation(this, 32, 8, WorkStationType.DESIGN_BAY));

    // Data entry station
    this.workStations.push(new WorkStation(this, 8, 12, WorkStationType.DATA_ENTRY_STATION));

    // Meeting room
    this.workStations.push(new WorkStation(this, 23, 21, WorkStationType.PM_BOARDROOM));

    // AI Lab
    this.workStations.push(new WorkStation(this, 32, 12, WorkStationType.AI_PROMPT_LAB));

    this.workStations.forEach(station => {
      this.add.existing(station);
    });
  }

  private setupCamera() {
    const camera = this.cameras.main;
    
    // Follow the player
    camera.startFollow(this.player);
    camera.setLerp(0.1, 0.1);
    
    // Set camera bounds
    const worldBounds = {
      x: -500,
      y: -500,
      width: GAME_CONFIG.MAP_WIDTH * GAME_CONFIG.TILE_SIZE + 1000,
      height: GAME_CONFIG.MAP_HEIGHT * GAME_CONFIG.TILE_SIZE + 1000,
    };
    
    camera.setBounds(worldBounds.x, worldBounds.y, worldBounds.width, worldBounds.height);
    
    // Enable zoom
    camera.setZoom(1);
  }

  private setupQuestSystem() {
    // Initialize quest system
    this.questSystem = new QuestSystem(this);
    this.questUI = new QuestUI(this);
    this.taskManager = new TaskManager(this);

    // Setup quest event listeners
    this.events.on('quest-started', (quest: any) => {
      this.questUI.showQuest(quest);
      this.showMessage(`Quest Started: ${quest.title}`);
    });

    this.events.on('quest-step-completed', (data: any) => {
      this.questUI.updateQuest(data.quest);
      this.showMessage(`Step completed: ${data.step.description}`);
    });

    this.events.on('quest-completed', (quest: any) => {
      this.questUI.showQuestComplete(quest);
      this.showMessage(`Quest Completed: ${quest.title} (+${quest.xpReward} XP)`);
    });

    this.events.on('player-level-up', (data: any) => {
      this.questUI.showLevelUp(data.level);
    });

    this.events.on('show-quest-menu', () => {
      this.showQuestMenu();
    });

    // Auto-start first quest after a delay
    this.time.delayedCall(2000, () => {
      const availableQuests = this.questSystem.getAvailableQuests();
      if (availableQuests.length > 0) {
        this.questSystem.startQuest(availableQuests[0].id);
      }
    });
  }

  private setupUI() {
    // Start the UI scene
    this.scene.launch('UIScene');
  }

  private startGameLoop() {
    // Game loop for updates
    this.time.addEvent({
      delay: 16, // ~60 FPS
      callback: this.gameUpdate,
      callbackScope: this,
      loop: true,
    });
  }

  private gameUpdate() {
    this.handleInput();
    this.updatePlayer();
    this.checkInteractions();
  }

  private handleInput() {
    const { player } = this;
    if (!player) return;

    let moveX = 0;
    let moveY = 0;

    // Handle keyboard input
    if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      moveX = -1;
    } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      moveX = 1;
    }

    if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
      moveY = -1;
    } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
      moveY = 1;
    }

    // Update player movement
    player.setMovement(moveX, moveY);

    // Handle interact key
    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      this.handleInteraction();
    }

    // Handle quest key
    if (Phaser.Input.Keyboard.JustDown(this.questKey)) {
      if (this.questUI) {
        this.questUI.toggle();
      }
    }
  }

  private handleMouseClick(pointer: Phaser.Input.Pointer) {
    if (pointer.leftButtonDown()) {
      // Move to clicked position
      const tilePos = IsoUtils.screenToTile(pointer.x, pointer.y, this.cameras.main);
      this.player.moveToTile(tilePos.x, tilePos.y);
    }
  }

  private updatePlayer() {
    this.player.update();
  }

  private checkInteractions() {
    const playerPos = this.player.getTilePosition();
    
    // Check for nearby work stations
    this.workStations.forEach(station => {
      const distance = Phaser.Math.Distance.Between(
        playerPos.x, playerPos.y,
        station.tileX, station.tileY
      );
      
      if (distance <= 1.5) {
        station.setHighlighted(true);
      } else {
        station.setHighlighted(false);
      }
    });
  }

  private async handleInteraction() {
    const playerPos = this.player.getTilePosition();

    // Find nearby interactable work station
    const nearbyStation = this.workStations.find(station => {
      const distance = Phaser.Math.Distance.Between(
        playerPos.x, playerPos.y,
        station.tileX, station.tileY
      );
      return distance <= 1.5;
    });

    if (nearbyStation) {
      // Check for quest interaction
      if (this.questSystem) {
        const quest = this.questSystem.handleWorkstationInteraction(nearbyStation.stationType);

        if (quest) {
          this.showInteractionFeedback(nearbyStation);

          // Get current quest step
          const currentStep = this.questSystem.getCurrentStep();
          if (currentStep && currentStep.action === 'interact') {
            // Start task for this step
            try {
              const result = await this.taskManager.startTask(currentStep.target || 'default', nearbyStation.stationType);

              if (result.success) {
                // Complete the step
                this.questSystem.completeQuestStep(currentStep.id);

                // Award additional XP from task
                if (result.xpEarned > 0) {
                  this.questSystem.addXP(result.xpEarned);
                }
              }
            } catch (error) {
              console.error('Task failed:', error);
            }
          }
        } else {
          this.showMessage("No available quests for this workstation. Try another area or check your quest log (Q).");
        }
      } else {
        this.showMessage("Quest system not initialized. Please refresh the page.");
      }

      this.events.emit(GAME_EVENTS.PLAYER_INTERACT, {
        type: 'workstation',
        station: nearbyStation,
        player: this.player,
      });
    } else {
      this.showMessage("Nothing to interact with here. Move closer to a work station and press E.");
    }
  }

  private showInteractionFeedback(station: WorkStation) {
    const stationNames = {
      [WorkStationType.DEVELOPER_DESK]: 'Developer Workstation',
      [WorkStationType.DESIGN_BAY]: 'Design Studio',
      [WorkStationType.DATA_ENTRY_STATION]: 'Data Processing Center',
      [WorkStationType.PM_BOARDROOM]: 'Project Management Hub',
      [WorkStationType.AI_PROMPT_LAB]: 'AI Innovation Lab'
    };

    const stationName = stationNames[station.stationType] || 'Work Station';
    this.showMessage(`Interacting with ${stationName}...`);
  }

  private showMessage(text: string) {
    const { width, height } = this.cameras.main;

    // Create message background
    const messageBg = this.add.graphics();
    messageBg.fillStyle(0x000000, 0.8);
    messageBg.fillRoundedRect(width / 2 - 200, height - 100, 400, 60, 8);
    messageBg.setScrollFactor(0);
    messageBg.setDepth(10000);

    // Create message text
    const messageText = this.add.text(width / 2, height - 70, text, {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 380 }
    });
    messageText.setOrigin(0.5);
    messageText.setScrollFactor(0);
    messageText.setDepth(10001);

    // Auto-remove after 3 seconds
    this.time.delayedCall(3000, () => {
      messageBg.destroy();
      messageText.destroy();
    });
  }

  private showQuestMenu() {
    if (!this.questSystem) {
      this.showMessage("Quest system not available.");
      return;
    }

    const availableQuests = this.questSystem.getAvailableQuests();
    const activeQuest = this.questSystem.getActiveQuest();
    const playerStats = this.questSystem.getPlayerStats();

    if (activeQuest) {
      this.questUI.showQuest(activeQuest);
    } else if (availableQuests.length > 0) {
      // Show first available quest
      this.questSystem.startQuest(availableQuests[0].id);
    } else {
      this.showMessage(`Level ${playerStats.level} - No new quests available. Complete current objectives to unlock more!`);
    }
  }

  // Public methods for external access
  public getPlayer(): Character {
    return this.player;
  }

  public getWorkStations(): WorkStation[] {
    return this.workStations;
  }

  public getQuestSystem(): QuestSystem {
    return this.questSystem;
  }

  public getPlayerStats() {
    return this.questSystem?.getPlayerStats() || {
      level: 1,
      xp: 0,
      xpToNext: 100,
      completedQuests: 0,
      totalQuests: 0
    };
  }
}
