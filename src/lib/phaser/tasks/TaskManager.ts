import * as Phaser from 'phaser';
import { WorkStationType } from '@/types/game';

export interface TaskResult {
  success: boolean;
  score: number;
  feedback: string;
  xpEarned: number;
}

export class TaskManager {
  private scene: Phaser.Scene;
  private currentTask: string | null = null;
  private taskContainer: Phaser.GameObjects.Container | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public startTask(taskId: string, stationType: WorkStationType): Promise<TaskResult> {
    return new Promise((resolve) => {
      this.currentTask = taskId;
      
      switch (stationType) {
        case WorkStationType.DEVELOPER_DESK:
          this.startCodingTask(taskId, resolve);
          break;
        case WorkStationType.DESIGN_BAY:
          this.startDesignTask(taskId, resolve);
          break;
        case WorkStationType.DATA_ENTRY_STATION:
          this.startDataTask(taskId, resolve);
          break;
        case WorkStationType.PM_BOARDROOM:
          this.startManagementTask(taskId, resolve);
          break;
        case WorkStationType.AI_PROMPT_LAB:
          this.startAITask(taskId, resolve);
          break;
        default:
          resolve({
            success: false,
            score: 0,
            feedback: 'Unknown task type',
            xpEarned: 0
          });
      }
    });
  }

  private startCodingTask(taskId: string, resolve: (result: TaskResult) => void) {
    const { width, height } = this.scene.cameras.main;
    
    // Create task interface
    this.taskContainer = this.scene.add.container(0, 0);
    this.taskContainer.setScrollFactor(0);
    this.taskContainer.setDepth(15000);

    // Background overlay
    const overlay = this.scene.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, width, height);
    if (this.taskContainer) this.taskContainer.add(overlay);

    // Task window
    const taskWindow = this.scene.add.graphics();
    taskWindow.fillStyle(0x1e293b, 0.95);
    taskWindow.fillRoundedRect(width / 2 - 400, height / 2 - 300, 800, 600, 12);
    taskWindow.lineStyle(2, 0x0ea5e9);
    taskWindow.strokeRoundedRect(width / 2 - 400, height / 2 - 300, 800, 600, 12);
    if (this.taskContainer) this.taskContainer.add(taskWindow);

    // Task title
    const title = this.scene.add.text(width / 2, height / 2 - 250, this.getTaskTitle(taskId), {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    if (this.taskContainer) this.taskContainer.add(title);

    // Task description
    const description = this.scene.add.text(width / 2, height / 2 - 200, this.getTaskDescription(taskId), {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#cbd5e1',
      wordWrap: { width: 700 },
      align: 'center'
    });
    description.setOrigin(0.5);
    if (this.taskContainer) this.taskContainer.add(description);

    // Code editor simulation
    const editorBg = this.scene.add.graphics();
    editorBg.fillStyle(0x0f172a);
    editorBg.fillRoundedRect(width / 2 - 350, height / 2 - 150, 700, 200, 8);
    editorBg.lineStyle(1, 0x334155);
    editorBg.strokeRoundedRect(width / 2 - 350, height / 2 - 150, 700, 200, 8);
    if (this.taskContainer) this.taskContainer.add(editorBg);

    // Simulated code
    const codeLines = this.getCodeExample(taskId);
    codeLines.forEach((line, index) => {
      const codeLine = this.scene.add.text(width / 2 - 330, height / 2 - 130 + (index * 20), line, {
        fontSize: '12px',
        fontFamily: 'JetBrains Mono, monospace',
        color: line.includes('//') ? '#6b7280' : '#22c55e',
      });
      if (this.taskContainer) {
        this.taskContainer.add(codeLine);
      }
    });

    // Progress simulation
    let progress = 0;
    const progressBar = this.scene.add.graphics();
    if (this.taskContainer) this.taskContainer.add(progressBar);

    const updateProgress = () => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;

      progressBar.clear();
      progressBar.fillStyle(0x374151);
      progressBar.fillRoundedRect(width / 2 - 350, height / 2 + 80, 700, 20, 10);
      progressBar.fillStyle(0x22c55e);
      progressBar.fillRoundedRect(width / 2 - 350, height / 2 + 80, (700 * progress) / 100, 20, 10);

      const progressText = this.scene.add.text(width / 2, height / 2 + 90, `${Math.floor(progress)}%`, {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        color: '#ffffff',
      });
      progressText.setOrigin(0.5);
      if (this.taskContainer) {
        this.taskContainer.add(progressText);
      }

      if (progress >= 100) {
        this.completeTask(taskId, resolve);
      } else {
        this.scene.time.delayedCall(500, updateProgress);
      }
    };

    // Start progress
    this.scene.time.delayedCall(1000, updateProgress);

    // Instructions
    const instructions = this.scene.add.text(width / 2, height / 2 + 150, 'Task in progress... Please wait for completion.', {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#94a3b8',
    });
    instructions.setOrigin(0.5);
    if (this.taskContainer) this.taskContainer.add(instructions);

    // Close button
    const closeBtn = this.scene.add.text(width / 2 + 350, height / 2 - 280, '✕', {
      fontSize: '20px',
      fontFamily: 'Inter, sans-serif',
      color: '#ef4444',
    });
    closeBtn.setOrigin(0.5);
    closeBtn.setInteractive();
    closeBtn.on('pointerdown', () => {
      this.cancelTask(resolve);
    });
    if (this.taskContainer) this.taskContainer.add(closeBtn);
  }

  private startDesignTask(taskId: string, resolve: (result: TaskResult) => void) {
    // Similar to coding task but with design-specific interface
    this.createGenericTask(taskId, 'Design Task', 'Creating beautiful user interfaces...', resolve);
  }

  private startDataTask(taskId: string, resolve: (result: TaskResult) => void) {
    this.createGenericTask(taskId, 'Data Processing', 'Processing and analyzing data...', resolve);
  }

  private startManagementTask(taskId: string, resolve: (result: TaskResult) => void) {
    this.createGenericTask(taskId, 'Project Management', 'Coordinating team activities...', resolve);
  }

  private startAITask(taskId: string, resolve: (result: TaskResult) => void) {
    this.createGenericTask(taskId, 'AI Integration', 'Implementing AI solutions...', resolve);
  }

  private createGenericTask(taskId: string, type: string, description: string, resolve: (result: TaskResult) => void) {
    const { width, height } = this.scene.cameras.main;
    
    this.taskContainer = this.scene.add.container(0, 0);
    this.taskContainer.setScrollFactor(0);
    this.taskContainer.setDepth(15000);

    // Background
    const overlay = this.scene.add.graphics();
    overlay.fillStyle(0x000000, 0.8);
    overlay.fillRect(0, 0, width, height);
    if (this.taskContainer) this.taskContainer.add(overlay);

    // Task window
    const taskWindow = this.scene.add.graphics();
    taskWindow.fillStyle(0x1e293b, 0.95);
    taskWindow.fillRoundedRect(width / 2 - 300, height / 2 - 200, 600, 400, 12);
    taskWindow.lineStyle(2, 0x0ea5e9);
    taskWindow.strokeRoundedRect(width / 2 - 300, height / 2 - 200, 600, 400, 12);
    if (this.taskContainer) this.taskContainer.add(taskWindow);

    // Title
    const title = this.scene.add.text(width / 2, height / 2 - 150, type, {
      fontSize: '24px',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    if (this.taskContainer) this.taskContainer.add(title);

    // Description
    const desc = this.scene.add.text(width / 2, height / 2 - 100, description, {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#cbd5e1',
    });
    desc.setOrigin(0.5);
    if (this.taskContainer) this.taskContainer.add(desc);

    // Animated progress
    let progress = 0;
    const progressBar = this.scene.add.graphics();
    if (this.taskContainer) this.taskContainer.add(progressBar);

    const updateProgress = () => {
      progress += Math.random() * 20 + 10;
      if (progress > 100) progress = 100;

      progressBar.clear();
      progressBar.fillStyle(0x374151);
      progressBar.fillRoundedRect(width / 2 - 200, height / 2 - 20, 400, 20, 10);
      progressBar.fillStyle(0x22c55e);
      progressBar.fillRoundedRect(width / 2 - 200, height / 2 - 20, (400 * progress) / 100, 20, 10);

      if (progress >= 100) {
        this.completeTask(taskId, resolve);
      } else {
        this.scene.time.delayedCall(300, updateProgress);
      }
    };

    this.scene.time.delayedCall(500, updateProgress);
  }

  private completeTask(taskId: string, resolve: (result: TaskResult) => void) {
    const score = Math.floor(Math.random() * 30) + 70; // 70-100 score
    const xpEarned = Math.floor(score / 2); // XP based on score

    // Show completion animation
    if (this.taskContainer) {
      const { width, height } = this.scene.cameras.main;
      
      const successText = this.scene.add.text(width / 2, height / 2 + 50, 'TASK COMPLETED!', {
        fontSize: '20px',
        fontFamily: 'Inter, sans-serif',
        color: '#22c55e',
        fontStyle: 'bold',
      });
      successText.setOrigin(0.5);
      if (this.taskContainer) this.taskContainer.add(successText);

      const scoreText = this.scene.add.text(width / 2, height / 2 + 80, `Score: ${score}/100`, {
        fontSize: '16px',
        fontFamily: 'Inter, sans-serif',
        color: '#fbbf24',
      });
      scoreText.setOrigin(0.5);
      if (this.taskContainer) this.taskContainer.add(scoreText);

      // Auto-close after 2 seconds
      this.scene.time.delayedCall(2000, () => {
        this.closeTask();
        resolve({
          success: true,
          score,
          feedback: this.getTaskFeedback(score),
          xpEarned
        });
      });
    }
  }

  private cancelTask(resolve: (result: TaskResult) => void) {
    this.closeTask();
    resolve({
      success: false,
      score: 0,
      feedback: 'Task cancelled',
      xpEarned: 0
    });
  }

  private closeTask() {
    if (this.taskContainer) {
      this.taskContainer.destroy();
      this.taskContainer = null;
    }
    this.currentTask = null;
  }

  private getTaskTitle(taskId: string): string {
    const titles: { [key: string]: string } = {
      'hello-world': 'Hello World Program',
      'button-design': 'Button Component Design',
      'architecture-plan': 'System Architecture',
      'feature-implementation': 'Feature Development',
      'testing-phase': 'Testing & QA',
      'user-interviews': 'User Research',
      'persona-creation': 'User Personas',
      'journey-map': 'User Journey Mapping',
    };
    return titles[taskId] || 'Work Task';
  }

  private getTaskDescription(taskId: string): string {
    const descriptions: { [key: string]: string } = {
      'hello-world': 'Create a simple "Hello World" program to get started with coding.',
      'button-design': 'Design a reusable button component with hover and active states.',
      'architecture-plan': 'Design the overall system architecture for the application.',
      'feature-implementation': 'Implement the core features according to specifications.',
      'testing-phase': 'Write and run tests to ensure code quality and functionality.',
    };
    return descriptions[taskId] || 'Complete this work task to earn XP and progress.';
  }

  private getCodeExample(taskId: string): string[] {
    const examples: { [key: string]: string[] } = {
      'hello-world': [
        'function helloWorld() {',
        '  console.log("Hello, World!");',
        '  return "Hello, World!";',
        '}',
        '',
        '// Call the function',
        'helloWorld();'
      ],
      'feature-implementation': [
        'class UserManager {',
        '  constructor() {',
        '    this.users = [];',
        '  }',
        '',
        '  addUser(user) {',
        '    this.users.push(user);',
        '  }',
        '}'
      ]
    };
    return examples[taskId] || ['// Task code will appear here...'];
  }

  private getTaskFeedback(score: number): string {
    if (score >= 90) return 'Excellent work! Outstanding performance.';
    if (score >= 80) return 'Great job! Well done.';
    if (score >= 70) return 'Good work! Keep it up.';
    return 'Task completed. Room for improvement.';
  }
}
