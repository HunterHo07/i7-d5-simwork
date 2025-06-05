// Core game types for SimWork

export interface Point {
  x: number;
  y: number;
}

export interface Point3D extends Point {
  z: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Game Configuration
export interface GameConfig {
  width: number;
  height: number;
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  debug: boolean;
}

// Character System
export interface Character {
  id: string;
  name: string;
  avatar: string;
  position: Point;
  direction: Direction;
  isMoving: boolean;
  speed: number;
  level: number;
  xp: number;
  skills: Skills;
}

export interface Skills {
  coding: number;
  design: number;
  dataEntry: number;
  projectManagement: number;
  aiPrompting: number;
}

export enum Direction {
  NORTH = 'north',
  NORTHEAST = 'northeast',
  EAST = 'east',
  SOUTHEAST = 'southeast',
  SOUTH = 'south',
  SOUTHWEST = 'southwest',
  WEST = 'west',
  NORTHWEST = 'northwest',
}

// Quest System
export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: QuestDifficulty;
  timeLimit: number;
  requirements: string[];
  rewards: QuestRewards;
  status: QuestStatus;
  progress: number;
  startTime?: number;
  endTime?: number;
}

export enum QuestType {
  CODING = 'coding',
  DESIGN = 'design',
  DATA_ENTRY = 'data-entry',
  PROJECT_MANAGEMENT = 'project-management',
  AI_PROMPTING = 'ai-prompting',
}

export enum QuestDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export enum QuestStatus {
  AVAILABLE = 'available',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  LOCKED = 'locked',
}

export interface QuestRewards {
  xp: number;
  badges: string[];
  unlocks: string[];
  coins?: number;
}

// Work Station System
export interface WorkStation {
  id: string;
  name: string;
  type: WorkStationType;
  position: Point;
  size: Size;
  isOccupied: boolean;
  occupiedBy?: string;
  availableQuests: string[];
  requiredLevel: number;
  tools: EmbeddedTool[];
}

export enum WorkStationType {
  DEVELOPER_DESK = 'developer-desk',
  DESIGN_BAY = 'design-bay',
  DATA_ENTRY_STATION = 'data-entry-station',
  PM_BOARDROOM = 'pm-boardroom',
  AI_PROMPT_LAB = 'ai-prompt-lab',
}

// Embedded Tools
export interface EmbeddedTool {
  id: string;
  name: string;
  icon: string;
  type: ToolType;
  isActive: boolean;
  config: ToolConfig;
}

export enum ToolType {
  CODE_EDITOR = 'code-editor',
  DESIGN_CANVAS = 'design-canvas',
  FORM_FILLER = 'form-filler',
  AI_CHAT = 'ai-chat',
  TERMINAL = 'terminal',
  BROWSER = 'browser',
}

export interface ToolConfig {
  [key: string]: any;
}

// User Profile System
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  skills: Skills;
  badges: Badge[];
  completedQuests: string[];
  currentQuest?: string;
  currentLocation: Point;
  currentScene: string;
  joinDate: Date;
  lastActive: Date;
  isOnline: boolean;
  preferences: UserPreferences;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  earnedDate: Date;
}

export enum BadgeRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export interface UserPreferences {
  soundEnabled: boolean;
  musicEnabled: boolean;
  effectsEnabled: boolean;
  autoSave: boolean;
  showTutorials: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Game World System
export interface GameWorld {
  id: string;
  name: string;
  description: string;
  mapData: MapData;
  workStations: WorkStation[];
  npcs: NPC[];
  interactiveObjects: InteractiveObject[];
  spawnPoints: Point[];
}

export interface MapData {
  width: number;
  height: number;
  tileSize: number;
  layers: MapLayer[];
}

export interface MapLayer {
  name: string;
  type: LayerType;
  data: number[][];
  visible: boolean;
  opacity: number;
  zIndex: number;
}

export enum LayerType {
  BACKGROUND = 'background',
  FLOOR = 'floor',
  WALLS = 'walls',
  OBJECTS = 'objects',
  COLLISION = 'collision',
  OVERLAY = 'overlay',
}

export interface NPC {
  id: string;
  name: string;
  type: NPCType;
  position: Point;
  sprite: string;
  dialogue: DialogueNode[];
  quests: string[];
  isInteractable: boolean;
}

export enum NPCType {
  QUEST_GIVER = 'quest-giver',
  MENTOR = 'mentor',
  COLLEAGUE = 'colleague',
  RECEPTIONIST = 'receptionist',
  MANAGER = 'manager',
}

export interface DialogueNode {
  id: string;
  text: string;
  options: DialogueOption[];
  conditions?: DialogueCondition[];
}

export interface DialogueOption {
  text: string;
  nextNodeId?: string;
  action?: DialogueAction;
}

export interface DialogueCondition {
  type: 'level' | 'quest' | 'badge' | 'skill';
  value: any;
}

export interface DialogueAction {
  type: 'give-quest' | 'give-item' | 'give-xp' | 'unlock-area';
  data: any;
}

export interface InteractiveObject {
  id: string;
  name: string;
  type: ObjectType;
  position: Point;
  size: Size;
  sprite: string;
  isInteractable: boolean;
  action: ObjectAction;
}

export enum ObjectType {
  COMPUTER = 'computer',
  COFFEE_MACHINE = 'coffee-machine',
  BULLETIN_BOARD = 'bulletin-board',
  ELEVATOR = 'elevator',
  DOOR = 'door',
  WHITEBOARD = 'whiteboard',
  PRINTER = 'printer',
  PLANT = 'plant',
}

export interface ObjectAction {
  type: 'open-tool' | 'show-quests' | 'teleport' | 'give-item' | 'show-info';
  data: any;
}

// Real-time System
export interface GameSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  currentQuest?: string;
  score: number;
  actions: GameAction[];
  isActive: boolean;
}

export interface GameAction {
  id: string;
  type: ActionType;
  timestamp: Date;
  data: any;
  score?: number;
}

export enum ActionType {
  MOVE = 'move',
  INTERACT = 'interact',
  START_QUEST = 'start-quest',
  COMPLETE_QUEST = 'complete-quest',
  USE_TOOL = 'use-tool',
  CHAT = 'chat',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
}

// Freelancer Discovery
export interface FreelancerProfile {
  userId: string;
  profile: UserProfile;
  availability: AvailabilityStatus;
  hourlyRate?: number;
  portfolio: PortfolioItem[];
  reviews: Review[];
  currentProject?: string;
  location: Point;
  isVisible: boolean;
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  AWAY = 'away',
  OFFLINE = 'offline',
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  completedDate: Date;
  score: number;
  screenshots: string[];
  tags: string[];
}

export interface Review {
  id: string;
  reviewerId: string;
  rating: number;
  comment: string;
  date: Date;
  projectType: QuestType;
}

// Visual Effects
export interface VisualEffect {
  id: string;
  name: string;
  type: EffectType;
  duration: number;
  target: string;
  config: EffectConfig;
  isActive: boolean;
}

export enum EffectType {
  PARTICLE = 'particle',
  ANIMATION = 'animation',
  SHADER = 'shader',
  LIGHTING = 'lighting',
  TRANSITION = 'transition',
}

export interface EffectConfig {
  [key: string]: any;
}
