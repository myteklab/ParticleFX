# ParticleFX

A browser-based particle effect designer for creating visual effects like fire, smoke, sparkles, explosions, and more. Design multi-layer particle systems with real-time preview and export them as JSON for use in games.

## Features

- **Multi-layer particle systems** — Stack multiple emitter layers with independent settings
- **Rich particle controls** — Size, speed, lifetime, gravity, spread angle, rotation, fade, and more
- **Color system** — Start/end colors with gradient interpolation
- **Blend modes** — Additive, multiply, screen, and normal blending
- **Shape types** — Circle, square, triangle, star, and custom shapes
- **Emission patterns** — Point, line, ring, and area emitters
- **Real-time preview** — See effects update instantly as you adjust parameters
- **Layer management** — Add, remove, reorder, duplicate, and rename layers
- **Preset library** — Built-in presets for common effects (fire, smoke, rain, sparkles, etc.)
- **Randomize** — Generate random effects for inspiration
- **Undo/redo** — Full history with keyboard shortcuts
- **Export options** — Download as JSON file or export as asset data
- **Screenshot** — Save the current canvas as a PNG image

## Getting Started

Open `index.html` in a modern browser. No build tools or server required.

1. Adjust emitter settings in the right panel to shape your effect
2. Use the layer panel to add multiple particle layers
3. Press **Play/Pause** to control the animation
4. Click **File > Export JSON** to save your effect

## Architecture

- `index.html` — Full UI layout with inline CSS
- `css/style.css` — Additional styles
- `js/particle.js` — Particle class with physics and rendering
- `js/emitter.js` — Emitter class managing particle spawning and lifetime
- `js/layers.js` — Multi-layer management and serialization
- `js/engine.js` — Main render loop, UI controls, keyboard shortcuts
- `js/saveload.js` — Save/load and export functionality
- `js/history.js` — Undo/redo state management
- `js/presets.js` — Built-in effect presets
- `js/help.js` — Help panel content and tutorial

## License

This project is licensed under the GNU General Public License v3.0 — see [LICENSE](LICENSE) for details.
