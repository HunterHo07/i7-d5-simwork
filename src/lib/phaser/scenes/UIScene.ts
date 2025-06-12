import * as Phaser from 'phaser';
import { COLORS, GAME_EVENTS } from '../config';

export class UIScene extends Phaser.Scene {
  private uiContainer!: Phaser.GameObjects.Container;
  private miniMap!: Phaser.GameObjects.Graphics;
  private questPanel!: Phaser.GameObjects.Container;
  private chatPanel!: Phaser.GameObjects.Container;
  private playerStats!: Phaser.GameObjects.Container;
  private notifications!: Phaser.GameObjects.Container;
  private toolsPanel!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'UIScene' });
  }

  create() {
    this.createUIContainer();
    this.createPlayerStats();
    this.createMiniMap();
    this.createQuestPanel();
    this.createChatPanel();
    this.createToolsPanel();
    this.createNotificationSystem();
    this.setupEventListeners();
  }

  private createUIContainer() {
    this.uiContainer = this.add.container(0, 0);
    this.uiContainer.setDepth(10000); // Always on top
  }

  private createPlayerStats() {
    const { width, height } = this.cameras.main;
    
    // Stats panel background
    const statsPanel = this.add.graphics();
    statsPanel.fillStyle(COLORS.BACKGROUND, 0.8);
    statsPanel.fillRoundedRect(10, 10, 200, 80, 8);
    statsPanel.lineStyle(2, COLORS.PRIMARY, 0.8);
    statsPanel.strokeRoundedRect(10, 10, 200, 80, 8);
    
    // Player name
    const playerName = this.add.text(20, 25, 'Player Name', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    
    // Level and XP
    const levelText = this.add.text(20, 45, 'Level 1', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#22c55e',
    });
    
    // XP Bar
    const xpBarBg = this.add.graphics();
    xpBarBg.fillStyle(0x334155);
    xpBarBg.fillRoundedRect(20, 65, 160, 8, 4);
    
    const xpBar = this.add.graphics();
    xpBar.fillStyle(COLORS.ACCENT);
    xpBar.fillRoundedRect(20, 65, 80, 8, 4); // 50% filled
    
    // Current quest indicator
    const questIndicator = this.add.text(20, 80, 'No active quest', {
      fontSize: '10px',
      fontFamily: 'Inter, sans-serif',
      color: '#64748b',
    });
    
    this.playerStats = this.add.container(0, 0, [
      statsPanel, playerName, levelText, xpBarBg, xpBar, questIndicator
    ]);
    this.uiContainer.add(this.playerStats);
  }

  private createMiniMap() {
    const { width, height } = this.cameras.main;
    const mapSize = 150;
    
    // Mini map background
    const mapBg = this.add.graphics();
    mapBg.fillStyle(COLORS.BACKGROUND, 0.9);
    mapBg.fillRoundedRect(width - mapSize - 20, 20, mapSize, mapSize, 8);
    mapBg.lineStyle(2, COLORS.PRIMARY, 0.8);
    mapBg.strokeRoundedRect(width - mapSize - 20, 20, mapSize, mapSize, 8);
    
    // Mini map title
    const mapTitle = this.add.text(width - mapSize + 10, 30, 'Office Map', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    
    // Mini map content
    this.miniMap = this.add.graphics();
    this.drawMiniMap();
    
    const miniMapContainer = this.add.container(0, 0, [mapBg, mapTitle, this.miniMap]);
    this.uiContainer.add(miniMapContainer);
  }

  private drawMiniMap() {
    const { width, height } = this.cameras.main;
    const mapSize = 120;
    const mapX = width - 150;
    const mapY = 50;
    
    // Clear previous content
    this.miniMap.clear();
    
    // Draw office layout
    this.miniMap.fillStyle(0xf5f5f5, 0.3);
    this.miniMap.fillRect(mapX, mapY, mapSize, mapSize);
    
    // Draw work areas
    const areas = [
      { x: mapX + 10, y: mapY + 10, w: 30, h: 30, color: COLORS.PRIMARY }, // Dev area
      { x: mapX + 50, y: mapY + 10, w: 30, h: 30, color: COLORS.SECONDARY }, // Design area
      { x: mapX + 30, y: mapY + 50, w: 40, h: 20, color: COLORS.ACCENT }, // Meeting room
    ];
    
    areas.forEach(area => {
      this.miniMap.fillStyle(area.color, 0.6);
      this.miniMap.fillRect(area.x, area.y, area.w, area.h);
    });
    
    // Draw player position (center for now)
    this.miniMap.fillStyle(COLORS.WARNING);
    this.miniMap.fillCircle(mapX + mapSize / 2, mapY + mapSize / 2, 3);
  }

  private createQuestPanel() {
    const { width, height } = this.cameras.main;
    
    // Quest panel background
    const questBg = this.add.graphics();
    questBg.fillStyle(COLORS.BACKGROUND, 0.9);
    questBg.fillRoundedRect(10, height - 200, 300, 180, 8);
    questBg.lineStyle(2, COLORS.ACCENT, 0.8);
    questBg.strokeRoundedRect(10, height - 200, 300, 180, 8);
    
    // Quest panel title
    const questTitle = this.add.text(20, height - 190, 'Available Quests', {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    
    // Sample quests
    const quests = [
      'Fix the login bug in the user authentication system',
      'Design a new landing page for the marketing team',
      'Process customer feedback forms from last week',
    ];
    
    const questItems: Phaser.GameObjects.GameObject[] = [questBg, questTitle];
    
    quests.forEach((quest, index) => {
      const questItem = this.add.text(20, height - 165 + index * 25, `• ${quest}`, {
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        color: '#e2e8f0',
        wordWrap: { width: 270 },
      });
      questItems.push(questItem);
    });
    
    this.questPanel = this.add.container(0, 0, questItems);
    this.questPanel.setVisible(false); // Hidden by default
    this.uiContainer.add(this.questPanel);
  }

  private createChatPanel() {
    const { width, height } = this.cameras.main;
    
    // Chat panel background
    const chatBg = this.add.graphics();
    chatBg.fillStyle(COLORS.BACKGROUND, 0.9);
    chatBg.fillRoundedRect(width - 320, height - 200, 300, 180, 8);
    chatBg.lineStyle(2, COLORS.INFO, 0.8);
    chatBg.strokeRoundedRect(width - 320, height - 200, 300, 180, 8);
    
    // Chat title
    const chatTitle = this.add.text(width - 310, height - 190, 'Team Chat', {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    
    // Sample chat messages
    const messages = [
      'Alice: Anyone free to help with the React component?',
      'Bob: I can help! What do you need?',
      'Charlie: Great work on the new design, Sarah!',
    ];
    
    const chatItems: Phaser.GameObjects.GameObject[] = [chatBg, chatTitle];
    
    messages.forEach((message, index) => {
      const messageItem = this.add.text(width - 310, height - 165 + index * 20, message, {
        fontSize: '10px',
        fontFamily: 'Inter, sans-serif',
        color: '#cbd5e1',
        wordWrap: { width: 270 },
      });
      chatItems.push(messageItem);
    });
    
    // Chat input area
    const inputBg = this.add.graphics();
    inputBg.fillStyle(0x1e293b);
    inputBg.fillRoundedRect(width - 310, height - 40, 270, 25, 4);
    inputBg.lineStyle(1, COLORS.INFO, 0.5);
    inputBg.strokeRoundedRect(width - 310, height - 40, 270, 25, 4);
    
    const inputPlaceholder = this.add.text(width - 305, height - 32, 'Type a message...', {
      fontSize: '10px',
      fontFamily: 'Inter, sans-serif',
      color: '#64748b',
    });
    
    chatItems.push(inputBg, inputPlaceholder);
    
    this.chatPanel = this.add.container(0, 0, chatItems);
    this.chatPanel.setVisible(false); // Hidden by default
    this.uiContainer.add(this.chatPanel);
  }

  private createToolsPanel() {
    const { width, height } = this.cameras.main;
    
    // Tools panel (bottom center)
    const toolsBg = this.add.graphics();
    toolsBg.fillStyle(COLORS.BACKGROUND, 0.9);
    toolsBg.fillRoundedRect(width / 2 - 150, height - 60, 300, 50, 8);
    toolsBg.lineStyle(2, COLORS.SECONDARY, 0.8);
    toolsBg.strokeRoundedRect(width / 2 - 150, height - 60, 300, 50, 8);
    
    // Tool buttons
    const tools = [
      { name: 'Code Editor', key: '1', color: COLORS.PRIMARY },
      { name: 'Design Canvas', key: '2', color: COLORS.SECONDARY },
      { name: 'Form Filler', key: '3', color: COLORS.ACCENT },
      { name: 'AI Chat', key: '4', color: COLORS.INFO },
    ];
    
    const toolItems: Phaser.GameObjects.GameObject[] = [toolsBg];
    
    tools.forEach((tool, index) => {
      const buttonX = width / 2 - 120 + index * 60;
      const buttonY = height - 35;
      
      // Tool button
      const button = this.add.graphics();
      button.fillStyle(tool.color, 0.8);
      button.fillRoundedRect(buttonX - 20, buttonY - 15, 40, 30, 4);
      button.lineStyle(1, 0xffffff, 0.5);
      button.strokeRoundedRect(buttonX - 20, buttonY - 15, 40, 30, 4);
      
      // Tool key indicator
      const keyText = this.add.text(buttonX, buttonY - 5, tool.key, {
        fontSize: '12px',
        fontFamily: 'JetBrains Mono, monospace',
        color: '#ffffff',
        fontStyle: 'bold',
      });
      keyText.setOrigin(0.5);
      
      // Tool name
      const nameText = this.add.text(buttonX, buttonY + 8, tool.name, {
        fontSize: '8px',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff',
      });
      nameText.setOrigin(0.5);
      
      toolItems.push(button, keyText, nameText);
    });
    
    this.toolsPanel = this.add.container(0, 0, toolItems);
    this.uiContainer.add(this.toolsPanel);
  }

  private createNotificationSystem() {
    this.notifications = this.add.container(0, 0);
    this.uiContainer.add(this.notifications);
  }

  private setupEventListeners() {
    // Listen for game events
    const mainScene = this.scene.get('MainScene');
    
    mainScene.events.on(GAME_EVENTS.PLAYER_INTERACT, this.handlePlayerInteraction, this);
    mainScene.events.on(GAME_EVENTS.QUEST_START, this.handleQuestStart, this);
    mainScene.events.on(GAME_EVENTS.QUEST_COMPLETE, this.handleQuestComplete, this);
    
    // Keyboard shortcuts
    this.input.keyboard!.on('keydown-Q', () => {
      this.toggleQuestPanel();
    });
    
    this.input.keyboard!.on('keydown-C', () => {
      this.toggleChatPanel();
    });
    
    this.input.keyboard!.on('keydown-M', () => {
      this.toggleMiniMap();
    });
  }

  private handlePlayerInteraction(data: any) {
    if (data.type === 'workstation') {
      this.showWorkstationMenu(data.station);
    }
  }

  private handleQuestStart(data: any) {
    this.showNotification(`Started quest: ${data.questTitle}`, COLORS.ACCENT);
  }

  private handleQuestComplete(data: any) {
    this.showNotification(`Quest completed! +${data.xp} XP`, COLORS.SUCCESS);
  }

  private showWorkstationMenu(station: any) {
    // This would open the embedded tool interface
    this.showNotification(`Interacting with ${station.stationType}`, COLORS.INFO);
  }

  private showNotification(message: string, color: number = COLORS.INFO) {
    const { width, height } = this.cameras.main;
    
    // Notification background
    const notifBg = this.add.graphics();
    notifBg.fillStyle(COLORS.BACKGROUND, 0.95);
    notifBg.fillRoundedRect(width / 2 - 150, 100, 300, 50, 8);
    notifBg.lineStyle(2, color, 0.8);
    notifBg.strokeRoundedRect(width / 2 - 150, 100, 300, 50, 8);
    
    // Notification text
    const notifText = this.add.text(width / 2, 125, message, {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 280 },
    });
    notifText.setOrigin(0.5);
    
    const notification = this.add.container(0, 0, [notifBg, notifText]);
    this.notifications.add(notification);
    
    // Animate in
    notification.setAlpha(0);
    this.tweens.add({
      targets: notification,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut',
    });
    
    // Auto-remove after 3 seconds
    this.time.delayedCall(3000, () => {
      this.tweens.add({
        targets: notification,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          notification.destroy();
        },
      });
    });
  }

  private toggleQuestPanel() {
    this.questPanel.setVisible(!this.questPanel.visible);
  }

  private toggleChatPanel() {
    this.chatPanel.setVisible(!this.chatPanel.visible);
  }

  private toggleMiniMap() {
    // Toggle mini map visibility or size
    const currentAlpha = this.miniMap.alpha;
    this.miniMap.setAlpha(currentAlpha > 0.5 ? 0.3 : 1.0);
  }

  public updatePlayerStats(stats: any) {
    // Update player stats display
    if (this.playerStats) {
      // Update level and XP display
      const levelText = this.playerStats.list[2] as Phaser.GameObjects.Text;
      const xpBar = this.playerStats.list[4] as Phaser.GameObjects.Graphics;
      const questIndicator = this.playerStats.list[5] as Phaser.GameObjects.Text;

      if (levelText) {
        levelText.setText(`Level ${stats.level}`);
      }

      if (xpBar) {
        // Update XP bar
        xpBar.clear();
        xpBar.fillStyle(0x374151);
        xpBar.fillRoundedRect(20, 90, 180, 8, 4);

        const xpProgress = stats.xpToNext > 0 ? stats.xp / stats.xpToNext : 0;
        xpBar.fillStyle(0xfbbf24);
        xpBar.fillRoundedRect(20, 90, 180 * xpProgress, 8, 4);
      }

      if (questIndicator) {
        questIndicator.setText(`Quests: ${stats.completedQuests}/${stats.totalQuests}`);
      }
    }
  }

  public updateMiniMap(playerPosition: any) {
    // Update player position on mini map
    this.drawMiniMap();

    // Add player dot on mini map
    if (playerPosition) {
      const { width } = this.cameras.main;
      const mapSize = 120;
      const mapX = width - 150;
      const mapY = 50;

      // Calculate player position on mini map
      const playerMapX = mapX + (playerPosition.x / 40) * mapSize;
      const playerMapY = mapY + (playerPosition.y / 40) * mapSize;

      // Draw player dot
      this.miniMap.fillStyle(0xff0000);
      this.miniMap.fillCircle(playerMapX, playerMapY, 3);
    }
  }
}
