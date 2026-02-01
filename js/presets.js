/**
 * Particle FX Designer - Preset Effects
 * 10 one-click effect configurations
 */

const PRESETS = {
    fire: {
        name: 'Fire',
        emitter: {
            rate: 80,
            lifetime: 1.2,
            speed: 120,
            spread: 25,
            gravity: -100,
            angle: -90
        },
        particle: {
            shape: 'circle',
            sizeStart: 18,
            sizeEnd: 4,
            colorStart: '#ffaa00',
            colorEnd: '#ff2200',
            opacityStart: 1,
            opacityEnd: 0
        }
    },

    smoke: {
        name: 'Smoke',
        emitter: {
            rate: 25,
            lifetime: 3,
            speed: 40,
            spread: 30,
            gravity: -20,
            angle: -90
        },
        particle: {
            shape: 'circle',
            sizeStart: 15,
            sizeEnd: 40,
            colorStart: '#666666',
            colorEnd: '#333333',
            opacityStart: 0.6,
            opacityEnd: 0
        }
    },

    sparkles: {
        name: 'Sparkles',
        emitter: {
            rate: 40,
            lifetime: 1.5,
            speed: 80,
            spread: 360,
            gravity: 0,
            angle: 0
        },
        particle: {
            shape: 'star',
            sizeStart: 10,
            sizeEnd: 2,
            colorStart: '#ffff00',
            colorEnd: '#ff00ff',
            opacityStart: 1,
            opacityEnd: 0
        }
    },

    snow: {
        name: 'Snow',
        emitter: {
            rate: 40,
            lifetime: 5,
            speed: 30,
            spread: 40,
            gravity: 30,
            angle: 90
        },
        particle: {
            shape: 'snowflake',
            sizeStart: 8,
            sizeEnd: 6,
            colorStart: '#ffffff',
            colorEnd: '#aaddff',
            opacityStart: 1,
            opacityEnd: 0.3
        }
    },

    rain: {
        name: 'Rain',
        emitter: {
            rate: 100,
            lifetime: 1,
            speed: 300,
            spread: 10,
            gravity: 200,
            angle: 100
        },
        particle: {
            shape: 'spark',
            sizeStart: 3,
            sizeEnd: 2,
            colorStart: '#88ccff',
            colorEnd: '#4488ff',
            opacityStart: 0.8,
            opacityEnd: 0.2
        }
    },

    explosion: {
        name: 'Explosion',
        emitter: {
            rate: 200,
            lifetime: 0.8,
            speed: 200,
            spread: 360,
            gravity: 50,
            angle: 0
        },
        particle: {
            shape: 'circle',
            sizeStart: 12,
            sizeEnd: 3,
            colorStart: '#ffcc00',
            colorEnd: '#ff4400',
            opacityStart: 1,
            opacityEnd: 0
        }
    },

    fireworks: {
        name: 'Fireworks',
        emitter: {
            rate: 60,
            lifetime: 1.5,
            speed: 150,
            spread: 360,
            gravity: 80,
            angle: 0
        },
        particle: {
            shape: 'star',
            sizeStart: 8,
            sizeEnd: 2,
            colorStart: '#ff0088',
            colorEnd: '#00ffff',
            opacityStart: 1,
            opacityEnd: 0
        }
    },

    bubbles: {
        name: 'Bubbles',
        emitter: {
            rate: 15,
            lifetime: 4,
            speed: 50,
            spread: 45,
            gravity: -40,
            angle: -90
        },
        particle: {
            shape: 'circle',
            sizeStart: 20,
            sizeEnd: 25,
            colorStart: '#88ddff',
            colorEnd: '#aaeeff',
            opacityStart: 0.5,
            opacityEnd: 0.1
        }
    },

    leaves: {
        name: 'Leaves',
        emitter: {
            rate: 20,
            lifetime: 4,
            speed: 60,
            spread: 60,
            gravity: 40,
            angle: 120
        },
        particle: {
            shape: 'square',
            sizeStart: 12,
            sizeEnd: 10,
            colorStart: '#88cc44',
            colorEnd: '#cc8844',
            opacityStart: 1,
            opacityEnd: 0.3
        }
    },

    magic: {
        name: 'Magic',
        emitter: {
            rate: 50,
            lifetime: 2,
            speed: 60,
            spread: 360,
            gravity: -30,
            angle: 0
        },
        particle: {
            shape: 'star',
            sizeStart: 14,
            sizeEnd: 4,
            colorStart: '#aa44ff',
            colorEnd: '#44aaff',
            opacityStart: 1,
            opacityEnd: 0
        }
    }
};

/**
 * Apply a preset to the current configuration
 * @param {string} presetName - Name of the preset to apply
 * @returns {object} The preset configuration
 */
function applyPreset(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) {
        console.warn('Unknown preset:', presetName);
        return null;
    }
    return preset;
}
