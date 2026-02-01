/**
 * Particle FX Designer - Emitter Class
 * Manages particle spawning and lifecycle
 */

class Emitter {
    constructor(config = {}) {
        // Layer properties
        this.name = config.name || 'Layer 1';
        this.visible = config.visible !== undefined ? config.visible : true;

        // Position
        this.x = config.x || 400;
        this.y = config.y || 300;

        // Emission settings
        this.rate = config.rate || 50; // particles per second
        this.lifetime = config.lifetime || 2;
        this.speed = config.speed || 100;
        this.spread = config.spread || 45;
        this.gravity = config.gravity || 0;
        this.angle = config.angle || -90;

        // Particle appearance
        this.shape = config.shape || 'circle';
        this.emoji = config.emoji || '❤️'; // Default emoji
        this.sizeStart = config.sizeStart || 12;
        this.sizeEnd = config.sizeEnd || 4;
        this.colorStart = config.colorStart || '#ff6600';
        this.colorEnd = config.colorEnd || '#ff0000';
        this.opacityStart = config.opacityStart !== undefined ? config.opacityStart : 1;
        this.opacityEnd = config.opacityEnd !== undefined ? config.opacityEnd : 0;

        // Physics
        this.friction = config.friction !== undefined ? config.friction : 1; // 1 = no friction, <1 = slow down

        // Blending mode
        this.blendMode = config.blendMode || 'source-over'; // 'source-over' or 'lighter' (additive)

        // Emitter shape settings
        this.emitterShape = config.emitterShape || 'point'; // 'point', 'line', 'circle', 'rectangle'
        this.emitterWidth = config.emitterWidth || 100;     // For line and rectangle
        this.emitterHeight = config.emitterHeight || 50;    // For rectangle
        this.emitterRadius = config.emitterRadius || 50;    // For circle
        this.emitterFilled = config.emitterFilled !== undefined ? config.emitterFilled : true; // For circle: filled or edge only

        // Internal state
        this.particles = [];
        this.accumulator = 0;
        this.paused = false;
    }

    /**
     * Get current particle configuration
     */
    getParticleConfig() {
        return {
            lifetime: this.lifetime,
            speed: this.speed,
            spread: this.spread,
            gravity: this.gravity,
            friction: this.friction,
            angle: this.angle,
            shape: this.shape,
            emoji: this.emoji,
            sizeStart: this.sizeStart,
            sizeEnd: this.sizeEnd,
            colorStart: this.colorStart,
            colorEnd: this.colorEnd,
            opacityStart: this.opacityStart,
            opacityEnd: this.opacityEnd,
            blendMode: this.blendMode
        };
    }

    /**
     * Update emitter configuration
     */
    updateConfig(config) {
        // Layer properties
        if (config.name !== undefined) this.name = config.name;
        if (config.visible !== undefined) this.visible = config.visible;

        if (config.emitter) {
            if (config.emitter.x !== undefined) this.x = config.emitter.x;
            if (config.emitter.y !== undefined) this.y = config.emitter.y;
            if (config.emitter.rate !== undefined) this.rate = config.emitter.rate;
            if (config.emitter.lifetime !== undefined) this.lifetime = config.emitter.lifetime;
            if (config.emitter.speed !== undefined) this.speed = config.emitter.speed;
            if (config.emitter.spread !== undefined) this.spread = config.emitter.spread;
            if (config.emitter.gravity !== undefined) this.gravity = config.emitter.gravity;
            if (config.emitter.angle !== undefined) this.angle = config.emitter.angle;
            if (config.emitter.emitterShape !== undefined) this.emitterShape = config.emitter.emitterShape;
            if (config.emitter.emitterWidth !== undefined) this.emitterWidth = config.emitter.emitterWidth;
            if (config.emitter.emitterHeight !== undefined) this.emitterHeight = config.emitter.emitterHeight;
            if (config.emitter.emitterRadius !== undefined) this.emitterRadius = config.emitter.emitterRadius;
            if (config.emitter.emitterFilled !== undefined) this.emitterFilled = config.emitter.emitterFilled;
        }

        if (config.particle) {
            if (config.particle.shape !== undefined) this.shape = config.particle.shape;
            if (config.particle.emoji !== undefined) this.emoji = config.particle.emoji;
            if (config.particle.sizeStart !== undefined) this.sizeStart = config.particle.sizeStart;
            if (config.particle.sizeEnd !== undefined) this.sizeEnd = config.particle.sizeEnd;
            if (config.particle.colorStart !== undefined) this.colorStart = config.particle.colorStart;
            if (config.particle.colorEnd !== undefined) this.colorEnd = config.particle.colorEnd;
            if (config.particle.opacityStart !== undefined) this.opacityStart = config.particle.opacityStart;
            if (config.particle.opacityEnd !== undefined) this.opacityEnd = config.particle.opacityEnd;
            if (config.particle.blendMode !== undefined) this.blendMode = config.particle.blendMode;
            if (config.particle.friction !== undefined) this.friction = config.particle.friction;
        }
    }

    /**
     * Calculate spawn position based on emitter shape
     */
    getSpawnPosition() {
        let spawnX = this.x;
        let spawnY = this.y;

        switch (this.emitterShape) {
            case 'line':
                // Horizontal line centered on emitter position
                spawnX = this.x + (Math.random() - 0.5) * this.emitterWidth;
                break;

            case 'circle':
                const angle = Math.random() * Math.PI * 2;
                let radius;
                if (this.emitterFilled) {
                    // Random point inside circle (sqrt for uniform distribution)
                    radius = Math.sqrt(Math.random()) * this.emitterRadius;
                } else {
                    // Point on edge only
                    radius = this.emitterRadius;
                }
                spawnX = this.x + Math.cos(angle) * radius;
                spawnY = this.y + Math.sin(angle) * radius;
                break;

            case 'rectangle':
                // Random point inside rectangle
                spawnX = this.x + (Math.random() - 0.5) * this.emitterWidth;
                spawnY = this.y + (Math.random() - 0.5) * this.emitterHeight;
                break;

            case 'point':
            default:
                // Single point (default behavior)
                break;
        }

        return { x: spawnX, y: spawnY };
    }

    /**
     * Spawn a new particle
     */
    spawn() {
        const pos = this.getSpawnPosition();
        const particle = new Particle(pos.x, pos.y, this.getParticleConfig());
        this.particles.push(particle);
    }

    /**
     * Update all particles
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        if (!this.paused) {
            // Spawn new particles based on rate
            this.accumulator += this.rate * dt;
            while (this.accumulator >= 1) {
                this.spawn();
                this.accumulator -= 1;
            }
        }

        // Update existing particles
        this.particles = this.particles.filter(particle => particle.update(dt));
    }

    /**
     * Draw all particles
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} showIndicator - Whether to show emitter position indicator
     */
    draw(ctx, showIndicator = true) {
        // Apply blend mode
        ctx.save();
        ctx.globalCompositeOperation = this.blendMode;

        this.particles.forEach(particle => particle.draw(ctx));

        ctx.restore();

        // Draw emitter position indicator (only for selected layer)
        if (showIndicator) {
            ctx.save();
            ctx.strokeStyle = 'rgba(155, 89, 182, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);

            // Draw emitter shape indicator
            switch (this.emitterShape) {
                case 'line':
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.emitterWidth / 2, this.y);
                    ctx.lineTo(this.x + this.emitterWidth / 2, this.y);
                    ctx.stroke();
                    // Draw end caps
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(this.x - this.emitterWidth / 2, this.y, 4, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(this.x + this.emitterWidth / 2, this.y, 4, 0, Math.PI * 2);
                    ctx.stroke();
                    break;

                case 'circle':
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.emitterRadius, 0, Math.PI * 2);
                    ctx.stroke();
                    // Draw center point
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(155, 89, 182, 0.5)';
                    ctx.fill();
                    break;

                case 'rectangle':
                    ctx.strokeRect(
                        this.x - this.emitterWidth / 2,
                        this.y - this.emitterHeight / 2,
                        this.emitterWidth,
                        this.emitterHeight
                    );
                    // Draw center point
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(155, 89, 182, 0.5)';
                    ctx.fill();
                    break;

                case 'point':
                default:
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
            }

            // Draw direction indicator
            ctx.setLineDash([]);
            const indicatorLength = 20;
            const angleRad = this.angle * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x + Math.cos(angleRad) * indicatorLength,
                this.y + Math.sin(angleRad) * indicatorLength
            );
            ctx.stroke();
            ctx.restore();
        }
    }

    /**
     * Set emitter position
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Clear all particles
     */
    clear() {
        this.particles = [];
        this.accumulator = 0;
    }

    /**
     * Pause particle emission
     */
    pause() {
        this.paused = true;
    }

    /**
     * Resume particle emission
     */
    resume() {
        this.paused = false;
    }

    /**
     * Toggle pause state
     */
    togglePause() {
        this.paused = !this.paused;
        return !this.paused;
    }

    /**
     * Get particle count
     */
    getParticleCount() {
        return this.particles.length;
    }

    /**
     * Export layer configuration as JSON (used for multi-layer format)
     */
    toLayerJSON() {
        return {
            name: this.name,
            visible: this.visible,
            emitter: {
                x: this.x,
                y: this.y,
                rate: this.rate,
                lifetime: this.lifetime,
                speed: this.speed,
                spread: this.spread,
                gravity: this.gravity,
                angle: this.angle,
                emitterShape: this.emitterShape,
                emitterWidth: this.emitterWidth,
                emitterHeight: this.emitterHeight,
                emitterRadius: this.emitterRadius,
                emitterFilled: this.emitterFilled
            },
            particle: {
                shape: this.shape,
                emoji: this.emoji,
                sizeStart: this.sizeStart,
                sizeEnd: this.sizeEnd,
                colorStart: this.colorStart,
                colorEnd: this.colorEnd,
                opacityStart: this.opacityStart,
                opacityEnd: this.opacityEnd,
                blendMode: this.blendMode,
                friction: this.friction
            }
        };
    }

    /**
     * Export configuration as JSON (backwards compatible single-layer format)
     */
    toJSON() {
        return {
            version: '1.1',
            emitter: {
                x: this.x,
                y: this.y,
                rate: this.rate,
                lifetime: this.lifetime,
                speed: this.speed,
                spread: this.spread,
                gravity: this.gravity,
                angle: this.angle,
                emitterShape: this.emitterShape,
                emitterWidth: this.emitterWidth,
                emitterHeight: this.emitterHeight,
                emitterRadius: this.emitterRadius,
                emitterFilled: this.emitterFilled
            },
            particle: {
                shape: this.shape,
                emoji: this.emoji,
                sizeStart: this.sizeStart,
                sizeEnd: this.sizeEnd,
                colorStart: this.colorStart,
                colorEnd: this.colorEnd,
                opacityStart: this.opacityStart,
                opacityEnd: this.opacityEnd,
                blendMode: this.blendMode,
                friction: this.friction
            }
        };
    }

    /**
     * Load configuration from JSON
     */
    fromJSON(data) {
        // Layer properties
        if (data.name !== undefined) this.name = data.name;
        if (data.visible !== undefined) this.visible = data.visible;

        if (data.emitter) {
            this.x = data.emitter.x || 400;
            this.y = data.emitter.y || 300;
            this.rate = data.emitter.rate || 50;
            this.lifetime = data.emitter.lifetime || 2;
            this.speed = data.emitter.speed || 100;
            this.spread = data.emitter.spread || 45;
            this.gravity = data.emitter.gravity || 0;
            this.angle = data.emitter.angle || -90;
            this.emitterShape = data.emitter.emitterShape || 'point';
            this.emitterWidth = data.emitter.emitterWidth || 100;
            this.emitterHeight = data.emitter.emitterHeight || 50;
            this.emitterRadius = data.emitter.emitterRadius || 50;
            this.emitterFilled = data.emitter.emitterFilled !== undefined ? data.emitter.emitterFilled : true;
        }

        if (data.particle) {
            this.shape = data.particle.shape || 'circle';
            this.emoji = data.particle.emoji || '❤️';
            this.sizeStart = data.particle.sizeStart || 12;
            this.sizeEnd = data.particle.sizeEnd || 4;
            this.colorStart = data.particle.colorStart || '#ff6600';
            this.colorEnd = data.particle.colorEnd || '#ff0000';
            this.opacityStart = data.particle.opacityStart !== undefined ? data.particle.opacityStart : 1;
            this.opacityEnd = data.particle.opacityEnd !== undefined ? data.particle.opacityEnd : 0;
            this.blendMode = data.particle.blendMode || 'source-over';
            this.friction = data.particle.friction !== undefined ? data.particle.friction : 1;
        }
    }

    /**
     * Load from layer data (v2.0 format)
     */
    fromLayerData(layerData) {
        this.name = layerData.name || 'Layer';
        this.visible = layerData.visible !== undefined ? layerData.visible : true;
        this.fromJSON(layerData);
    }
}
