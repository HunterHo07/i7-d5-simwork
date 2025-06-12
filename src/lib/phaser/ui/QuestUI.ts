import * as Phaser from 'phaser';
import { Quest, QuestStep } from '../quests/QuestSystem';

export class QuestUI {
  private scene: Phaser.Scene;
  private questPanel!: Phaser.GameObjects.Container;
  private questTitle!: Phaser.GameObjects.Text;
  private questDescription!: Phaser.GameObjects.Text;
  private questSteps: Phaser.GameObjects.Text[];
  private questProgress!: Phaser.GameObjects.Graphics;
  private isVisible: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.questSteps = [];
    this.createQuestPanel();
  }

  private createQuestPanel() {
    const { width, height } = this.scene.cameras.main;
    
    // Create main container
    this.questPanel = this.scene.add.container(20, 20);
    this.questPanel.setScrollFactor(0);
    this.questPanel.setDepth(9000);
    this.questPanel.setVisible(false);

    // Background
    const background = this.scene.add.graphics();
    background.fillStyle(0x000000, 0.85);
    background.fillRoundedRect(0, 0, 350, 200, 8);
    background.lineStyle(2, 0x0ea5e9, 0.8);
    background.strokeRoundedRect(0, 0, 350, 200, 8);
    this.questPanel.add(background);

    // Header
    const header = this.scene.add.text(175, 15, 'ACTIVE QUEST', {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#0ea5e9',
      fontStyle: 'bold',
    });
    header.setOrigin(0.5, 0);
    this.questPanel.add(header);

    // Quest title
    this.questTitle = this.scene.add.text(15, 40, '', {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: 320 }
    });
    this.questPanel.add(this.questTitle);

    // Quest description
    this.questDescription = this.scene.add.text(15, 65, '', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#cbd5e1',
      wordWrap: { width: 320 }
    });
    this.questPanel.add(this.questDescription);

    // Progress bar background
    const progressBg = this.scene.add.graphics();
    progressBg.fillStyle(0x374151);
    progressBg.fillRoundedRect(15, 110, 320, 8, 4);
    this.questPanel.add(progressBg);

    // Progress bar
    this.questProgress = this.scene.add.graphics();
    this.questPanel.add(this.questProgress);

    // Steps container will be added dynamically
  }

  public showQuest(quest: Quest) {
    if (!quest) {
      this.hideQuest();
      return;
    }

    this.questTitle.setText(quest.title);
    this.questDescription.setText(quest.description);
    
    // Clear existing steps
    this.questSteps.forEach(step => step.destroy());
    this.questSteps = [];

    // Add quest steps
    quest.steps.forEach((step, index) => {
      const stepY = 130 + (index * 20);
      const stepIcon = step.isCompleted ? '✅' : '⏳';
      const stepColor = step.isCompleted ? '#22c55e' : '#ffffff';
      
      const stepText = this.scene.add.text(15, stepY, `${stepIcon} ${step.description}`, {
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        color: stepColor,
        wordWrap: { width: 320 }
      });
      
      this.questPanel.add(stepText);
      this.questSteps.push(stepText);
    });

    // Update progress bar
    this.updateProgress(quest);

    // Show panel
    this.questPanel.setVisible(true);
    this.isVisible = true;

    // Animate in
    this.questPanel.setAlpha(0);
    this.scene.tweens.add({
      targets: this.questPanel,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }

  public hideQuest() {
    if (!this.isVisible) return;

    this.scene.tweens.add({
      targets: this.questPanel,
      alpha: 0,
      duration: 300,
      ease: 'Back.easeIn',
      onComplete: () => {
        this.questPanel.setVisible(false);
        this.isVisible = false;
      }
    });
  }

  public updateQuest(quest: Quest) {
    if (!this.isVisible || !quest) return;

    // Update steps
    quest.steps.forEach((step, index) => {
      if (this.questSteps[index]) {
        const stepIcon = step.isCompleted ? '✅' : '⏳';
        const stepColor = step.isCompleted ? '#22c55e' : '#ffffff';
        this.questSteps[index].setText(`${stepIcon} ${step.description}`);
        this.questSteps[index].setColor(stepColor);
      }
    });

    // Update progress
    this.updateProgress(quest);
  }

  private updateProgress(quest: Quest) {
    const completedSteps = quest.steps.filter(step => step.isCompleted).length;
    const totalSteps = quest.steps.length;
    const progress = totalSteps > 0 ? completedSteps / totalSteps : 0;

    this.questProgress.clear();
    this.questProgress.fillStyle(0x0ea5e9);
    this.questProgress.fillRoundedRect(15, 110, 320 * progress, 8, 4);
  }

  public showQuestComplete(quest: Quest) {
    const { width, height } = this.scene.cameras.main;
    
    // Create completion notification
    const completionBg = this.scene.add.graphics();
    completionBg.fillStyle(0x000000, 0.9);
    completionBg.fillRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 12);
    completionBg.lineStyle(3, 0x22c55e, 0.8);
    completionBg.strokeRoundedRect(width / 2 - 200, height / 2 - 100, 400, 200, 12);
    completionBg.setScrollFactor(0);
    completionBg.setDepth(10000);

    const completionTitle = this.scene.add.text(width / 2, height / 2 - 60, 'QUEST COMPLETED!', {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      color: '#22c55e',
      fontStyle: 'bold',
    });
    completionTitle.setOrigin(0.5);
    completionTitle.setScrollFactor(0);
    completionTitle.setDepth(10001);

    const questNameText = this.scene.add.text(width / 2, height / 2 - 20, quest.title, {
      fontSize: '18px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    questNameText.setOrigin(0.5);
    questNameText.setScrollFactor(0);
    questNameText.setDepth(10001);

    const xpText = this.scene.add.text(width / 2, height / 2 + 20, `+${quest.xpReward} XP`, {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#fbbf24',
      fontStyle: 'bold',
    });
    xpText.setOrigin(0.5);
    xpText.setScrollFactor(0);
    xpText.setDepth(10001);

    const continueText = this.scene.add.text(width / 2, height / 2 + 60, 'Press any key to continue', {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      color: '#94a3b8',
    });
    continueText.setOrigin(0.5);
    continueText.setScrollFactor(0);
    continueText.setDepth(10001);

    // Animate in
    const elements = [completionBg, completionTitle, questNameText, xpText, continueText];
    elements.forEach(element => element.setAlpha(0));
    
    this.scene.tweens.add({
      targets: elements,
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut'
    });

    // Remove after key press or timeout
    const removeNotification = () => {
      this.scene.tweens.add({
        targets: elements,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          elements.forEach(element => element.destroy());
        }
      });
    };

    // Auto-remove after 5 seconds
    this.scene.time.delayedCall(5000, removeNotification);

    // Or remove on any key press
    const keyHandler = () => {
      removeNotification();
      this.scene.input.keyboard?.off('keydown', keyHandler);
    };
    this.scene.input.keyboard?.on('keydown', keyHandler);
  }

  public showLevelUp(level: number) {
    const { width, height } = this.scene.cameras.main;
    
    // Create level up notification
    const levelUpBg = this.scene.add.graphics();
    levelUpBg.fillStyle(0x000000, 0.9);
    levelUpBg.fillRoundedRect(width / 2 - 150, height / 2 - 80, 300, 160, 12);
    levelUpBg.lineStyle(3, 0xfbbf24, 0.8);
    levelUpBg.strokeRoundedRect(width / 2 - 150, height / 2 - 80, 300, 160, 12);
    levelUpBg.setScrollFactor(0);
    levelUpBg.setDepth(10000);

    const levelUpTitle = this.scene.add.text(width / 2, height / 2 - 40, 'LEVEL UP!', {
      fontSize: '28px',
      fontFamily: 'Inter, sans-serif',
      color: '#fbbf24',
      fontStyle: 'bold',
    });
    levelUpTitle.setOrigin(0.5);
    levelUpTitle.setScrollFactor(0);
    levelUpTitle.setDepth(10001);

    const levelText = this.scene.add.text(width / 2, height / 2, `Level ${level}`, {
      fontSize: '20px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    levelText.setOrigin(0.5);
    levelText.setScrollFactor(0);
    levelText.setDepth(10001);

    const unlockText = this.scene.add.text(width / 2, height / 2 + 40, 'New quests unlocked!', {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#22c55e',
    });
    unlockText.setOrigin(0.5);
    unlockText.setScrollFactor(0);
    unlockText.setDepth(10001);

    // Animate in with celebration effect
    const elements = [levelUpBg, levelUpTitle, levelText, unlockText];
    elements.forEach(element => element.setAlpha(0));
    
    this.scene.tweens.add({
      targets: elements,
      alpha: 1,
      duration: 500,
      ease: 'Back.easeOut'
    });

    // Add celebration particles
    for (let i = 0; i < 20; i++) {
      const particle = this.scene.add.circle(
        width / 2 + (Math.random() - 0.5) * 100,
        height / 2 + (Math.random() - 0.5) * 100,
        Math.random() * 3 + 2,
        0xfbbf24
      );
      particle.setScrollFactor(0);
      particle.setDepth(9999);
      
      this.scene.tweens.add({
        targets: particle,
        y: particle.y - 100,
        alpha: 0,
        duration: 2000,
        ease: 'Quad.easeOut',
        onComplete: () => particle.destroy()
      });
    }

    // Auto-remove after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      this.scene.tweens.add({
        targets: elements,
        alpha: 0,
        duration: 300,
        onComplete: () => {
          elements.forEach(element => element.destroy());
        }
      });
    });
  }

  public toggle() {
    if (this.isVisible) {
      this.hideQuest();
    } else {
      // Show available quests or active quest
      this.scene.events.emit('show-quest-menu');
    }
  }

  public isQuestPanelVisible(): boolean {
    return this.isVisible;
  }
}
