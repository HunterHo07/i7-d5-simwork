import * as Phaser from 'phaser';
import { WorkStationType } from '@/types/game';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: WorkStationType;
  level: number;
  xpReward: number;
  requirements: string[];
  steps: QuestStep[];
  isCompleted: boolean;
  isActive: boolean;
}

export interface QuestStep {
  id: string;
  description: string;
  isCompleted: boolean;
  action: string;
  target?: string;
}

export class QuestSystem {
  private scene: Phaser.Scene;
  private quests: Map<string, Quest> = new Map();
  private activeQuest: Quest | null = null;
  private playerLevel: number = 1;
  private playerXP: number = 0;
  private playerXPToNext: number = 100;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.initializeQuests();
  }

  private initializeQuests() {
    const questData: Quest[] = [
      // Level 1 Quests - Simple Test Quest
      {
        id: 'dev-intro',
        title: 'Welcome to SimWork',
        description: 'Get started with your first coding task in the virtual office.',
        type: WorkStationType.DEVELOPER_DESK,
        level: 1,
        xpReward: 100,
        requirements: [],
        steps: [
          {
            id: 'approach-desk',
            description: 'Walk to the Developer Desk (Blue computer area)',
            isCompleted: false,
            action: 'move_to',
            target: 'developer-desk'
          },
          {
            id: 'start-coding',
            description: 'Press E to start your first coding task',
            isCompleted: false,
            action: 'interact',
            target: 'hello-world'
          }
        ],
        isCompleted: false,
        isActive: false
      },
      {
        id: 'design-basics',
        title: 'UI Design Challenge',
        description: 'Create your first user interface design.',
        type: WorkStationType.DESIGN_BAY,
        level: 1,
        xpReward: 120,
        requirements: ['dev-intro'],
        steps: [
          {
            id: 'approach-design',
            description: 'Walk to the Design Bay (Pink/Purple area)',
            isCompleted: false,
            action: 'move_to',
            target: 'design-bay'
          },
          {
            id: 'start-design',
            description: 'Press E to start your design task',
            isCompleted: false,
            action: 'interact',
            target: 'button-design'
          }
        ],
        isCompleted: false,
        isActive: false
      },

      // Level 2 Quest
      {
        id: 'data-processing',
        title: 'Data Analysis Task',
        description: 'Process and analyze important business data.',
        type: WorkStationType.DATA_ENTRY_STATION,
        level: 2,
        xpReward: 150,
        requirements: ['design-basics'],
        steps: [
          {
            id: 'approach-data',
            description: 'Walk to the Data Processing Station',
            isCompleted: false,
            action: 'move_to',
            target: 'data-entry-station'
          },
          {
            id: 'start-data',
            description: 'Press E to start data processing',
            isCompleted: false,
            action: 'interact',
            target: 'data-analysis'
          }
        ],
        isCompleted: false,
        isActive: false
      },
      // Level 3 Quest
      {
        id: 'project-management',
        title: 'Team Leadership Challenge',
        description: 'Lead a project team and coordinate deliverables.',
        type: WorkStationType.PM_BOARDROOM,
        level: 3,
        xpReward: 200,
        requirements: ['data-processing'],
        steps: [
          {
            id: 'approach-boardroom',
            description: 'Walk to the Project Management Boardroom',
            isCompleted: false,
            action: 'move_to',
            target: 'pm-boardroom'
          },
          {
            id: 'start-pm',
            description: 'Press E to start project management task',
            isCompleted: false,
            action: 'interact',
            target: 'project-planning'
          }
        ],
        isCompleted: false,
        isActive: false
      },

      // Level 4 Quest
      {
        id: 'ai-innovation',
        title: 'AI Innovation Lab',
        description: 'Explore cutting-edge AI technologies and implementations.',
        type: WorkStationType.AI_PROMPT_LAB,
        level: 4,
        xpReward: 300,
        requirements: ['project-management'],
        steps: [
          {
            id: 'approach-ai-lab',
            description: 'Walk to the AI Innovation Lab',
            isCompleted: false,
            action: 'move_to',
            target: 'ai-prompt-lab'
          },
          {
            id: 'start-ai',
            description: 'Press E to start AI development task',
            isCompleted: false,
            action: 'interact',
            target: 'ai-development'
          }
        ],
        isCompleted: false,
        isActive: false
      }
    ];

    questData.forEach(quest => {
      this.quests.set(quest.id, quest);
    });
  }

  public getAvailableQuests(): Quest[] {
    return Array.from(this.quests.values()).filter(quest => 
      !quest.isCompleted && 
      !quest.isActive && 
      this.playerLevel >= quest.level &&
      quest.requirements.every(req => this.quests.get(req)?.isCompleted)
    );
  }

  public getActiveQuest(): Quest | null {
    return this.activeQuest;
  }

  public startQuest(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.isCompleted || quest.isActive) {
      return false;
    }

    // Check requirements
    if (!quest.requirements.every(req => this.quests.get(req)?.isCompleted)) {
      return false;
    }

    // Check level requirement
    if (this.playerLevel < quest.level) {
      return false;
    }

    // Deactivate current quest if any
    if (this.activeQuest) {
      this.activeQuest.isActive = false;
    }

    quest.isActive = true;
    this.activeQuest = quest;

    this.scene.events.emit('quest-started', quest);
    return true;
  }

  public completeQuestStep(stepId: string): boolean {
    if (!this.activeQuest) return false;

    const step = this.activeQuest.steps.find(s => s.id === stepId);
    if (!step || step.isCompleted) return false;

    step.isCompleted = true;
    this.scene.events.emit('quest-step-completed', { quest: this.activeQuest, step });

    // Check if all steps are completed
    if (this.activeQuest.steps.every(s => s.isCompleted)) {
      this.completeQuest(this.activeQuest.id);
    }

    return true;
  }

  public completeQuest(questId: string): boolean {
    const quest = this.quests.get(questId);
    if (!quest || quest.isCompleted) return false;

    quest.isCompleted = true;
    quest.isActive = false;
    
    // Award XP
    this.addXP(quest.xpReward);
    
    if (this.activeQuest?.id === questId) {
      this.activeQuest = null;
    }

    this.scene.events.emit('quest-completed', quest);
    return true;
  }

  public addXP(amount: number) {
    this.playerXP += amount;
    
    // Check for level up
    while (this.playerXP >= this.playerXPToNext) {
      this.playerXP -= this.playerXPToNext;
      this.playerLevel++;
      this.playerXPToNext = Math.floor(this.playerXPToNext * 1.5);
      this.scene.events.emit('player-level-up', { level: this.playerLevel });
    }
    
    this.scene.events.emit('player-xp-gained', { xp: amount, total: this.playerXP });
  }

  public getPlayerStats() {
    return {
      level: this.playerLevel,
      xp: this.playerXP,
      xpToNext: this.playerXPToNext,
      completedQuests: Array.from(this.quests.values()).filter(q => q.isCompleted).length,
      totalQuests: this.quests.size
    };
  }

  public handleWorkstationInteraction(stationType: WorkStationType): Quest | null {
    // Check if there's an active quest
    if (this.activeQuest) {
      // Check if this interaction matches the current step
      const currentStep = this.getCurrentStep();
      if (currentStep) {
        // Handle move_to steps
        if (currentStep.action === 'move_to' && currentStep.target === this.getStationId(stationType)) {
          this.completeQuestStep(currentStep.id);
          return this.activeQuest;
        }

        // Handle interact steps
        if (currentStep.action === 'interact' && this.activeQuest.type === stationType) {
          return this.activeQuest;
        }
      }

      // If active quest matches station type, return it
      if (this.activeQuest.type === stationType) {
        return this.activeQuest;
      }
    }

    // Find available quests for this station type
    const availableQuests = this.getAvailableQuests().filter(q => q.type === stationType);
    if (availableQuests.length > 0) {
      // Auto-start the first available quest
      const quest = availableQuests[0];
      this.startQuest(quest.id);
      return quest;
    }

    return null;
  }

  private getStationId(stationType: WorkStationType): string {
    const stationIds = {
      [WorkStationType.DEVELOPER_DESK]: 'developer-desk',
      [WorkStationType.DESIGN_BAY]: 'design-bay',
      [WorkStationType.DATA_ENTRY_STATION]: 'data-entry-station',
      [WorkStationType.PM_BOARDROOM]: 'pm-boardroom',
      [WorkStationType.AI_PROMPT_LAB]: 'ai-prompt-lab'
    };
    return stationIds[stationType] || 'unknown';
  }

  public getCurrentStep(): QuestStep | null {
    if (!this.activeQuest) return null;
    
    return this.activeQuest.steps.find(step => !step.isCompleted) || null;
  }
}
