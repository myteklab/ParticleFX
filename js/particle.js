/**
 * Particle FX Designer - Particle Class
 * Individual particle with physics and rendering
 */

/**
 * Linear interpolation between two values
 */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Parse hex color to RGB components
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

/**
 * Interpolate between two colors
 */
function lerpColor(color1, color2, t) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(lerp(c1.r, c2.r, t));
    const g = Math.round(lerp(c1.g, c2.g, t));
    const b = Math.round(lerp(c1.b, c2.b, t));
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Particle class
 */
class Particle {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.age = 0;
        this.lifetime = config.lifetime * (0.8 + Math.random() * 0.4); // Slight variation

        // Convert angle from degrees to radians
        const angleRad = (config.angle || 0) * Math.PI / 180;
        const spreadRad = (config.spread || 0) * Math.PI / 180;

        // Velocity with spread
        const finalAngle = angleRad + (Math.random() - 0.5) * spreadRad;
        const speed = config.speed * (0.7 + Math.random() * 0.6);
        this.vx = Math.cos(finalAngle) * speed;
        this.vy = Math.sin(finalAngle) * speed;

        // Visual properties (interpolated over lifetime)
        this.sizeStart = config.sizeStart || 10;
        this.sizeEnd = config.sizeEnd || 2;
        this.colorStart = config.colorStart || '#ffffff';
        this.colorEnd = config.colorEnd || '#888888';
        this.opacityStart = config.opacityStart !== undefined ? config.opacityStart : 1;
        this.opacityEnd = config.opacityEnd !== undefined ? config.opacityEnd : 0;

        this.shape = config.shape || 'circle';
        this.emoji = config.emoji || null; // Custom emoji for 'emoji' shape type
        this.gravity = config.gravity || 0;
        this.friction = config.friction !== undefined ? config.friction : 1; // 1 = no friction, 0.95 = heavy friction

        // Rotation for some shapes (less rotation for emoji)
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = this.shape === 'emoji' ? (Math.random() - 0.5) * 1 : (Math.random() - 0.5) * 4;
    }

    /**
     * Update particle state
     * @param {number} dt - Delta time in seconds
     * @returns {boolean} - True if particle is still alive
     */
    update(dt) {
        this.age += dt;

        // Apply gravity
        this.vy += this.gravity * dt;

        // Apply friction (velocity damping)
        // Use frame-rate independent formula: v *= friction^(dt*60)
        if (this.friction < 1) {
            const frictionFactor = Math.pow(this.friction, dt * 60);
            this.vx *= frictionFactor;
            this.vy *= frictionFactor;
        }

        // Update position
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Update rotation
        this.rotation += this.rotationSpeed * dt;

        // Return true if still alive
        return this.age < this.lifetime;
    }

    /**
     * Draw the particle on canvas
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        const t = Math.min(this.age / this.lifetime, 1); // 0 to 1
        const size = lerp(this.sizeStart, this.sizeEnd, t);
        const opacity = lerp(this.opacityStart, this.opacityEnd, t);
        const color = lerpColor(this.colorStart, this.colorEnd, t);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw shape
        this.drawShape(ctx, size);

        ctx.restore();
    }

    /**
     * Draw specific shape
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} size
     */
    drawShape(ctx, size) {
        const halfSize = size / 2;

        switch (this.shape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'square':
                ctx.fillRect(-halfSize, -halfSize, size, size);
                break;

            case 'star':
                this.drawStar(ctx, 0, 0, 5, halfSize, halfSize * 0.4);
                break;

            case 'spark':
                this.drawSpark(ctx, halfSize);
                break;

            case 'snowflake':
                this.drawSnowflake(ctx, halfSize);
                break;

            case 'emoji':
                this.drawEmoji(ctx, size);
                break;

            default:
                // Default to circle
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
        }
    }

    /**
     * Draw an emoji
     */
    drawEmoji(ctx, size) {
        if (!this.emoji) return;
        ctx.font = `${size}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
    }

    /**
     * Draw a star shape
     */
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * Draw a spark/line shape
     */
    drawSpark(ctx, size) {
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    /**
     * Draw a snowflake shape
     */
    drawSnowflake(ctx, size) {
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1.5;

        // Draw 6 lines from center
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate(i * Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -size);
            // Small branches
            ctx.moveTo(0, -size * 0.6);
            ctx.lineTo(-size * 0.3, -size * 0.8);
            ctx.moveTo(0, -size * 0.6);
            ctx.lineTo(size * 0.3, -size * 0.8);
            ctx.stroke();
            ctx.restore();
        }
    }
}
