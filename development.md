# 🚀 SimWork Development Guide

## 🏗️ Architecture Overview

### Frontend Stack
```
Next.js 15 (App Router)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
├── Phaser 3 (2.5D Game Engine)
├── Three.js (3D Elements)
├── GSAP (Advanced Animations)
├── Framer Motion (UI Animations)
└── Lucide React (Icons)
```

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── game/              # Game pages
│   └── api/               # API routes
├── components/            # React Components
│   ├── game/              # Game-specific components
│   │   ├── GameCanvas.tsx # Phaser game container
│   │   ├── GameUI.tsx     # Game overlay UI
│   │   └── scenes/        # Phaser scenes
│   ├── tools/             # Embedded tools
│   │   ├── CodeEditor.tsx # VS Code interface
│   │   ├── DesignCanvas.tsx # Design tool
│   │   └── FormFiller.tsx # Form simulation
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── lib/                   # Utilities & Config
│   ├── phaser/            # Phaser configuration
│   ├── three/             # Three.js utilities
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # App constants
├── assets/                # Game Assets
│   ├── sprites/           # Character & object sprites
│   ├── tiles/             # Map tiles
│   ├── audio/             # Sound effects & music
│   └── models/            # 3D models
├── types/                 # TypeScript definitions
└── styles/                # Global styles
```

## 🎮 Game Engine Setup

### Phaser 3 Configuration
```typescript
// lib/phaser/config.ts
export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#2c3e50',
  scene: [PreloadScene, MainScene, UIScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  render: {
    pixelArt: true,
    antialias: false
  }
};
```

### Scene Management
- **PreloadScene** - Asset loading and progress
- **MainScene** - Core game world and interactions
- **UIScene** - Overlay interface and menus
- **ToolScenes** - Individual embedded tool interfaces

## 🗺️ Isometric World System

### Coordinate System
```typescript
// Isometric coordinate conversion
export class IsoUtils {
  static cartToIso(cartX: number, cartY: number) {
    return {
      x: (cartX - cartY) * TILE_WIDTH_HALF,
      y: (cartX + cartY) * TILE_HEIGHT_HALF
    };
  }
  
  static isoToCart(isoX: number, isoY: number) {
    return {
      x: (isoX / TILE_WIDTH_HALF + isoY / TILE_HEIGHT_HALF) / 2,
      y: (isoY / TILE_HEIGHT_HALF - isoX / TILE_WIDTH_HALF) / 2
    };
  }
}
```

### Tile System
- **Base tiles** - Floor, walls, ceilings
- **Object tiles** - Furniture, decorations
- **Interactive tiles** - Workstations, doors
- **Collision tiles** - Invisible barriers

### Pathfinding
```typescript
// A* pathfinding for isometric movement
export class PathFinder {
  findPath(start: Point, end: Point, obstacles: Point[]): Point[] {
    // A* algorithm implementation
    // Returns array of waypoints
  }
}
```

## 🎨 Asset Management

### Sprite Sheets
- **Character animations** - 8-direction movement (idle, walk, work)
- **Object sprites** - Furniture, equipment, decorations
- **UI elements** - Buttons, panels, icons
- **Effect sprites** - Particles, highlights, transitions

### Tile Maps
- **Tiled Map Editor** - Level design tool
- **JSON export** - Phaser-compatible format
- **Layer system** - Background, objects, collision, overlay

### Audio System
```typescript
// Audio manager for game sounds
export class AudioManager {
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  
  play(key: string, config?: Phaser.Types.Sound.SoundConfig) {
    const sound = this.sounds.get(key);
    if (sound) sound.play(config);
  }
  
  playAmbient(key: string) {
    this.play(key, { loop: true, volume: 0.3 });
  }
}
```

## 🛠️ Embedded Tools Architecture

### Tool Interface Pattern
```typescript
interface EmbeddedTool {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  onComplete: (result: any) => void;
  onClose: () => void;
}
```

### Code Editor Integration
- **Monaco Editor** - VS Code experience
- **Syntax highlighting** - Multiple languages
- **Auto-completion** - Context-aware suggestions
- **Error detection** - Real-time validation

### Design Canvas
- **Fabric.js** - Interactive canvas library
- **Shape tools** - Rectangle, circle, text, image
- **Layer management** - Z-index control
- **Export functionality** - PNG, SVG, JSON

### Form Filler Simulation
- **Dynamic forms** - Generated from templates
- **Validation rules** - Real-time feedback
- **Auto-fill features** - Smart suggestions
- **Performance tracking** - Speed and accuracy

## 🎯 Quest System

### Quest Generation
```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'coding' | 'design' | 'data-entry' | 'pm' | 'ai-prompt';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  requirements: string[];
  rewards: {
    xp: number;
    badges: string[];
    unlocks: string[];
  };
}
```

### AI Quest Generator
- **OpenAI integration** - Dynamic quest creation
- **Skill-based difficulty** - Adaptive challenges
- **Context awareness** - Role-specific tasks
- **Performance analysis** - Improvement suggestions

## 👥 User System

### Profile Management
```typescript
interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  skills: {
    coding: number;
    design: number;
    dataEntry: number;
    projectManagement: number;
    aiPrompting: number;
  };
  badges: Badge[];
  completedQuests: string[];
  currentLocation: {
    x: number;
    y: number;
    scene: string;
  };
}
```

### Real-time Presence
- **WebSocket connection** - Live user updates
- **Position synchronization** - See other users
- **Activity status** - What others are working on
- **Chat system** - Communication features

## 🎨 Visual Effects System

### Effect Pool Implementation
```typescript
class EffectPool {
  private effects: Map<string, Effect> = new Map();
  
  register(name: string, effect: Effect) {
    this.effects.set(name, effect);
  }
  
  apply(name: string, target: any, config?: any) {
    const effect = this.effects.get(name);
    if (effect) effect.apply(target, config);
  }
}
```

### Available Effects
- **Matrix rain** - Background digital effect
- **Particle systems** - Environmental ambiance
- **Tilt 3D hover** - Interactive object effects
- **Parallax scrolling** - Depth illusion
- **Typing animations** - Text reveal effects
- **Audio visualizers** - Sound-reactive graphics

## 📱 Responsive Design

### Breakpoint Strategy
```css
/* Mobile First Approach */
.game-container {
  @apply w-full h-screen;
}

@screen sm {
  .game-container {
    @apply max-w-md mx-auto;
  }
}

@screen lg {
  .game-container {
    @apply max-w-6xl;
  }
}
```

### Touch Controls
- **Virtual joystick** - Mobile movement
- **Gesture recognition** - Swipe, pinch, tap
- **Adaptive UI** - Context-sensitive controls
- **Haptic feedback** - Touch response

## 🚀 Performance Optimization

### Asset Loading
- **Progressive loading** - Load as needed
- **Sprite atlasing** - Reduce draw calls
- **Texture compression** - Smaller file sizes
- **Caching strategy** - Browser and memory cache

### Rendering Optimization
- **Object pooling** - Reuse game objects
- **Culling** - Hide off-screen objects
- **Level of detail** - Reduce complexity at distance
- **Batch rendering** - Group similar objects

## 🧪 Testing Strategy

### Unit Tests
- **Component testing** - React component behavior
- **Utility functions** - Helper function validation
- **Game logic** - Quest and scoring systems

### Integration Tests
- **Tool interactions** - Embedded tool functionality
- **User flows** - Complete quest scenarios
- **Performance tests** - Frame rate and memory usage

### User Testing
- **Usability testing** - Navigation and controls
- **Accessibility testing** - Screen readers, keyboard nav
- **Cross-browser testing** - Compatibility validation
