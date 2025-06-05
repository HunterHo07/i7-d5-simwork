import * as Phaser from 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { MainScene } from './scenes/MainScene';
import { UIScene } from './scenes/UIScene';

// Game constants
export const GAME_CONFIG = {
  TILE_SIZE: 64,
  TILE_WIDTH_HALF: 32,
  TILE_HEIGHT_HALF: 16,
  MAP_WIDTH: 50,
  MAP_HEIGHT: 50,
  VIEWPORT_WIDTH: 1200,
  VIEWPORT_HEIGHT: 800,
  CHARACTER_SPEED: 150,
  DEBUG: process.env.NODE_ENV === 'development',
};

// Phaser game configuration
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.VIEWPORT_WIDTH,
  height: GAME_CONFIG.VIEWPORT_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#1a1a1a',
  scene: [PreloadScene, MainScene, UIScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: GAME_CONFIG.DEBUG,
    },
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  input: {
    mouse: {
      target: 'game-container',
    },
    touch: {
      target: 'game-container',
    },
  },
  dom: {
    createContainer: true,
  },
};

// Asset paths
export const ASSETS = {
  SPRITES: {
    CHARACTERS: '/assets/sprites/characters/',
    OBJECTS: '/assets/sprites/objects/',
    UI: '/assets/sprites/ui/',
    EFFECTS: '/assets/sprites/effects/',
  },
  TILES: {
    FLOOR: '/assets/tiles/floor/',
    WALLS: '/assets/tiles/walls/',
    OBJECTS: '/assets/tiles/objects/',
  },
  AUDIO: {
    MUSIC: '/assets/audio/music/',
    SFX: '/assets/audio/sfx/',
    AMBIENT: '/assets/audio/ambient/',
  },
  MAPS: '/assets/maps/',
  FONTS: '/assets/fonts/',
};

// Isometric utility functions
export class IsoUtils {
  /**
   * Convert cartesian coordinates to isometric
   */
  static cartToIso(cartX: number, cartY: number): { x: number; y: number } {
    return {
      x: (cartX - cartY) * GAME_CONFIG.TILE_WIDTH_HALF,
      y: (cartX + cartY) * GAME_CONFIG.TILE_HEIGHT_HALF,
    };
  }

  /**
   * Convert isometric coordinates to cartesian
   */
  static isoToCart(isoX: number, isoY: number): { x: number; y: number } {
    return {
      x: (isoX / GAME_CONFIG.TILE_WIDTH_HALF + isoY / GAME_CONFIG.TILE_HEIGHT_HALF) / 2,
      y: (isoY / GAME_CONFIG.TILE_HEIGHT_HALF - isoX / GAME_CONFIG.TILE_WIDTH_HALF) / 2,
    };
  }

  /**
   * Convert screen coordinates to tile coordinates
   */
  static screenToTile(screenX: number, screenY: number, camera: Phaser.Cameras.Scene2D.Camera): { x: number; y: number } {
    const worldX = screenX + camera.scrollX;
    const worldY = screenY + camera.scrollY;
    const cart = this.isoToCart(worldX, worldY);
    return {
      x: Math.floor(cart.x),
      y: Math.floor(cart.y),
    };
  }

  /**
   * Convert tile coordinates to world coordinates
   */
  static tileToWorld(tileX: number, tileY: number): { x: number; y: number } {
    return this.cartToIso(tileX, tileY);
  }

  /**
   * Get the depth value for isometric sorting
   */
  static getDepth(x: number, y: number): number {
    return x + y;
  }
}

// Animation configurations
export const ANIMATIONS = {
  CHARACTER: {
    IDLE: {
      NORTH: 'idle-north',
      NORTHEAST: 'idle-northeast',
      EAST: 'idle-east',
      SOUTHEAST: 'idle-southeast',
      SOUTH: 'idle-south',
      SOUTHWEST: 'idle-southwest',
      WEST: 'idle-west',
      NORTHWEST: 'idle-northwest',
    },
    WALK: {
      NORTH: 'walk-north',
      NORTHEAST: 'walk-northeast',
      EAST: 'walk-east',
      SOUTHEAST: 'walk-southeast',
      SOUTH: 'walk-south',
      SOUTHWEST: 'walk-southwest',
      WEST: 'walk-west',
      NORTHWEST: 'walk-northwest',
    },
    WORK: {
      TYPING: 'work-typing',
      THINKING: 'work-thinking',
      PRESENTING: 'work-presenting',
    },
  },
  OBJECTS: {
    COMPUTER_SCREEN: 'computer-screen-glow',
    COFFEE_MACHINE: 'coffee-machine-brew',
    ELEVATOR: 'elevator-doors',
    PRINTER: 'printer-working',
  },
  UI: {
    BUTTON_HOVER: 'button-hover',
    NOTIFICATION: 'notification-popup',
    LOADING: 'loading-spinner',
    PROGRESS_BAR: 'progress-fill',
  },
};

// Color palette for the game
export const COLORS = {
  PRIMARY: 0x0ea5e9,
  SECONDARY: 0xd946ef,
  ACCENT: 0x22c55e,
  BACKGROUND: 0x0f172a,
  SURFACE: 0x1e293b,
  TEXT: 0xffffff,
  MUTED: 0x64748b,
  SUCCESS: 0x00ff88,
  WARNING: 0xffaa00,
  ERROR: 0xff4444,
  INFO: 0x00aaff,
};

// Game events
export const GAME_EVENTS = {
  PLAYER_MOVE: 'player-move',
  PLAYER_INTERACT: 'player-interact',
  QUEST_START: 'quest-start',
  QUEST_COMPLETE: 'quest-complete',
  TOOL_OPEN: 'tool-open',
  TOOL_CLOSE: 'tool-close',
  CHAT_MESSAGE: 'chat-message',
  USER_JOIN: 'user-join',
  USER_LEAVE: 'user-leave',
  LEVEL_UP: 'level-up',
  BADGE_EARNED: 'badge-earned',
  NOTIFICATION: 'notification',
};

// Input configurations
export const INPUT_CONFIG = {
  MOVEMENT_KEYS: {
    UP: 'W',
    DOWN: 'S',
    LEFT: 'A',
    RIGHT: 'D',
  },
  ACTION_KEYS: {
    INTERACT: 'E',
    MENU: 'ESC',
    INVENTORY: 'I',
    CHAT: 'ENTER',
    MAP: 'M',
  },
  MOUSE: {
    MOVE_BUTTON: 0, // Left click
    INTERACT_BUTTON: 2, // Right click
  },
};

// Performance settings
export const PERFORMANCE = {
  MAX_PARTICLES: 1000,
  MAX_SOUNDS: 10,
  CULLING_DISTANCE: 1000,
  LOD_DISTANCE: 500,
  TEXTURE_ATLAS_SIZE: 2048,
  SPRITE_POOL_SIZE: 100,
};

// Development tools
export const DEV_TOOLS = {
  SHOW_FPS: GAME_CONFIG.DEBUG,
  SHOW_COLLISION_BOXES: GAME_CONFIG.DEBUG,
  SHOW_TILE_GRID: GAME_CONFIG.DEBUG,
  ENABLE_CONSOLE_COMMANDS: GAME_CONFIG.DEBUG,
  LOG_PERFORMANCE: GAME_CONFIG.DEBUG,
};
