// ============================================
// HELP SYSTEM - ParticleFX Designer
// ============================================
// Educational content about particle effects and how to use the designer

const helpContent = {
    about: {
        title: '✨ Welcome to ParticleFX Designer!',
        content: `
            <div style="background: linear-gradient(135deg, rgba(155,89,182,0.2), rgba(52,152,219,0.2)); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 14px; color: #fff; line-height: 1.5;"><strong>ParticleFX Designer</strong> lets you create stunning visual effects like fire, smoke, sparkles, and explosions. Use your effects in GameMaker and other projects!</p>
            </div>

            <h4>🎯 What Are Particle Effects?</h4>
            <p style="font-size: 13px; color: #ccc; margin-bottom: 15px;">Particle effects are collections of many small images (particles) that move, change, and fade to create dynamic visuals. They're used in games for:</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #e94560;">🔥 Environmental</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Fire, smoke, rain, snow, fog</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #3498db;">💥 Impact</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Explosions, sparks, debris</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #2ecc71;">✨ Magic</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Sparkles, auras, spell effects</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #f39c12;">🎮 Feedback</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Coin collection, damage hits, level up</p>
                </div>
            </div>

            <h4>🚀 Quick Start Guide</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">1</span>
                    <div>
                        <strong style="color: #fff;">Choose a Preset</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Click a preset button (fire, smoke, sparkles) to start with a working effect</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">2</span>
                    <div>
                        <strong style="color: #fff;">Adjust Settings</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Tweak the sliders to customize the effect to your liking</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">3</span>
                    <div>
                        <strong style="color: #fff;">Save Your Project</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Click Save to store your effect for later editing</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 10px;">4</span>
                    <div>
                        <strong style="color: #fff;">Export to Assets</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Export your effect to use in GameMaker and other apps!</p>
                    </div>
                </div>
            </div>

            <h4>⌨️ Controls</h4>
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; font-size: 11px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                <code style="color: #99f;">Click Canvas</code><span style="color: #aaa;">Move the emitter to that position</span>
                <code style="color: #99f;">Ctrl+S</code><span style="color: #aaa;">Save project</span>
                <code style="color: #99f;">Play/Pause</code><span style="color: #aaa;">Start or stop the particle simulation</span>
                <code style="color: #99f;">Reset</code><span style="color: #aaa;">Clear all particles from screen</span>
            </div>

            <div class="help-tip" style="margin-top: 15px;"><p>Click the <strong>?</strong> icons next to each section to learn more about specific settings!</p></div>
        `
    },

    presets: {
        title: '🎨 Presets',
        content: `
            <h4>What Are Presets?</h4>
            <p>Presets are pre-configured particle effects that give you a starting point. Instead of building from scratch, choose a preset and then customize it!</p>

            <h4>Available Presets</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #ff6600;">🔥 Fire</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Rising flames with orange-to-red gradient</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #888;">💨 Smoke</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Slow rising gray particles that expand</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #ffd700;">✨ Sparkles</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Glittering star-shaped particles</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #87ceeb;">❄️ Snow</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Gently falling snowflakes</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #4a90d9;">🌧️ Rain</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Fast downward streaks</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #e74c3c;">💥 Explosion</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Burst of particles in all directions</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #e91e63;">🎆 Fireworks</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Colorful upward burst with gravity</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #00bcd4;">🫧 Bubbles</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Rising circular particles</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #8bc34a;">🍂 Leaves</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Falling autumn leaves</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <strong style="color: #9c27b0;">🪄 Magic</strong>
                    <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Mystical purple sparkles</p>
                </div>
            </div>

            <h4>💡 How to Use Presets</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li>Click a preset to instantly load its settings</li>
                <li>All sliders will update to show the preset's values</li>
                <li>Modify any setting to create your own variation</li>
                <li>Your changes won't affect the original preset</li>
            </ul>

            <div class="help-tip"><p>Start with a preset close to what you want, then tweak! It's much faster than building from scratch.</p></div>
        `
    },

    randomize: {
        title: '🎲 Randomize',
        content: `
            <h4>What is Randomize?</h4>
            <p>Randomize generates completely random particle effects! It's a great way to discover unexpected combinations and get inspired.</p>

            <h4>Randomize Options</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #9b59b6;">Current Layer Only</strong>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Randomizes just the selected layer, keeping other layers unchanged. Good for tweaking one part of a multi-layer effect.</p>
                </div>
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #3498db;">All Existing Layers</strong>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Randomizes every layer with different random settings. Each layer gets unique colors, shapes, and behaviors.</p>
                </div>
                <div>
                    <strong style="color: #2ecc71;">Create New Random Layers</strong>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Clears everything and creates fresh random layers. Choose 1-8 layers for simple to complex effects.</p>
                </div>
            </div>

            <h4>What Gets Randomized?</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>Colors:</strong> Random harmonious color pairs (complementary or analogous)</li>
                <li><strong>Shapes:</strong> Circle, square, star, spark, or snowflake</li>
                <li><strong>Emitter:</strong> Point, line, circle, or rectangle spawning</li>
                <li><strong>Physics:</strong> Speed, gravity, spread, friction</li>
                <li><strong>Appearance:</strong> Size, opacity, blend mode</li>
            </ul>

            <div class="help-tip"><p>Keep clicking Randomize until you find something you like, then fine-tune it with the sliders!</p></div>
        `
    },

    emitter: {
        title: '⚙️ Emitter Settings',
        content: `
            <div style="background: linear-gradient(135deg, rgba(155,89,182,0.15), rgba(52,152,219,0.15)); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #ddd;">The <strong>emitter</strong> is the source that spawns particles. Think of it like a fountain - these settings control how the fountain sprays water.</p>
            </div>

            <h4>📊 Settings Explained</h4>

            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #e94560;">Rate</strong> <span style="color: #888;">(1 - 200 per second)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">How many particles spawn per second. Higher = denser effect, but uses more performance.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        Low (1-20): Sparse, like occasional raindrops<br>
                        Medium (20-80): Standard effects<br>
                        High (80-200): Dense, like heavy fire or smoke
                    </div>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #3498db;">Lifetime</strong> <span style="color: #888;">(0.1 - 5.0 seconds)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">How long each particle exists before disappearing. This controls how far particles travel.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        Short (0.1-0.5s): Quick flashes, sparks<br>
                        Medium (0.5-2s): Standard effects<br>
                        Long (2-5s): Lingering smoke, slow-moving effects
                    </div>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #2ecc71;">Speed</strong> <span style="color: #888;">(0 - 300 pixels/sec)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">How fast particles move when they spawn. Combine with lifetime to control travel distance.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        Low (0-50): Floating, drifting<br>
                        Medium (50-150): Walking speed<br>
                        High (150-300): Fast projectiles, explosions
                    </div>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #f39c12;">Spread</strong> <span style="color: #888;">(0° - 360°)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">The angle range particles can spawn in. 0° = all in one direction, 360° = all directions.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        Narrow (0-30°): Focused beam, laser<br>
                        Medium (30-90°): Cone shape, fountain<br>
                        Wide (90-180°): Fan, hemisphere<br>
                        Full (360°): All directions, explosion
                    </div>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #9b59b6;">Gravity</strong> <span style="color: #888;">(-200 to +200)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Vertical force applied to particles. Positive = fall down, Negative = float up.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        Negative (-200 to -50): Rising (fire, smoke, bubbles)<br>
                        Zero (0): No gravity (space, magic)<br>
                        Positive (50 to 200): Falling (rain, debris, leaves)
                    </div>
                </div>

                <div>
                    <strong style="color: #1abc9c;">Direction</strong> <span style="color: #888;">(-180° to +180°)</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">The main angle particles travel. -90° = up, 0° = right, 90° = down, ±180° = left.</p>
                    <div style="font-size: 10px; color: #666; margin-top: 4px;">
                        -90°: Upward (fire, smoke)<br>
                        0°: Rightward (horizontal spray)<br>
                        90°: Downward (rain, waterfalls)<br>
                        ±180°: Leftward
                    </div>
                </div>
            </div>

            <div class="help-tip"><p>Experiment! Drag sliders while watching the preview - you'll quickly learn how each setting affects the result.</p></div>
        `
    },

    emitterShape: {
        title: '🎯 Emitter Shape',
        content: `
            <h4>What is Emitter Shape?</h4>
            <p>The <strong>emitter shape</strong> determines WHERE particles spawn. Instead of all particles coming from a single point, they can spawn along a line, inside a circle, or within a rectangle!</p>

            <h4>Available Shapes</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #9b59b6; font-size: 16px;">● Point</strong> (Default)
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">All particles spawn from a single point. Classic behavior for most effects.</p>
                        <p style="font-size: 10px; color: #666; margin-top: 4px;">Best for: Sparks, magic wands, campfires, explosions</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #3498db; font-size: 16px;">━ Line</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Particles spawn along a horizontal line. Set the width to control the line length.</p>
                        <p style="font-size: 10px; color: #666; margin-top: 4px;">Best for: Rain clouds, waterfalls, curtains, laser beams</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #2ecc71; font-size: 16px;">○ Circle</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Particles spawn inside a circle (or on its edge). Set the radius and filled/edge mode.</p>
                        <p style="font-size: 10px; color: #666; margin-top: 4px;">Best for: Portals, auras, shockwaves, magic circles</p>
                    </div>
                    <div>
                        <strong style="color: #f39c12; font-size: 16px;">□ Rectangle</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Particles spawn within a rectangular area. Set width and height.</p>
                        <p style="font-size: 10px; color: #666; margin-top: 4px;">Best for: Snow, fog, ambient dust, screen-wide effects</p>
                    </div>
                </div>
            </div>

            <h4>Circle: Inside vs Edge</h4>
            <p style="font-size: 12px; color: #ccc;">For circles, the "Spawn Inside" toggle controls whether particles spawn anywhere inside the circle (filled) or only on the outer edge (ring).</p>
            <ul style="font-size: 11px; color: #aaa; margin-left: 16px;">
                <li><strong>Inside (on):</strong> Uniform fill - good for area effects, clouds</li>
                <li><strong>Edge only (off):</strong> Ring spawn - perfect for portals, shockwaves</li>
            </ul>

            <div class="help-tip"><p>The dashed purple outline on the canvas shows your current emitter shape. Particles will spawn anywhere within that area!</p></div>
        `
    },

    particle: {
        title: '🎨 Particle Appearance',
        content: `
            <div style="background: linear-gradient(135deg, rgba(155,89,182,0.15), rgba(231,76,60,0.15)); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #ddd;">These settings control how each <strong>individual particle</strong> looks and how it changes over its lifetime.</p>
            </div>

            <h4>🔷 Shape</h4>
            <p style="font-size: 12px; color: #ccc; margin-bottom: 10px;">Choose the visual shape of each particle:</p>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 15px;">
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 20px;">●</span>
                    <p style="font-size: 10px; color: #aaa; margin: 4px 0 0 0;">Circle</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 20px;">■</span>
                    <p style="font-size: 10px; color: #aaa; margin: 4px 0 0 0;">Square</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 20px;">★</span>
                    <p style="font-size: 10px; color: #aaa; margin: 4px 0 0 0;">Star</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 20px;">✦</span>
                    <p style="font-size: 10px; color: #aaa; margin: 4px 0 0 0;">Spark</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; text-align: center;">
                    <span style="font-size: 20px;">❄</span>
                    <p style="font-size: 10px; color: #aaa; margin: 4px 0 0 0;">Snowflake</p>
                </div>
            </div>

            <h4>📏 Size (Start & End)</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin-bottom: 8px;">Particles can grow or shrink over their lifetime:</p>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 11px; color: #aaa;">
                    <div style="text-align: center;">
                        <div style="width: 30px; height: 30px; background: #9b59b6; border-radius: 50%; margin: 0 auto 4px;"></div>
                        Start Size
                    </div>
                    <span style="font-size: 20px; color: #666;">→</span>
                    <div style="text-align: center;">
                        <div style="width: 12px; height: 12px; background: #9b59b6; border-radius: 50%; margin: 0 auto 4px;"></div>
                        End Size
                    </div>
                </div>
                <p style="font-size: 10px; color: #666; margin-top: 8px;">
                    <strong>Start > End:</strong> Particles shrink (fire, smoke)<br>
                    <strong>Start < End:</strong> Particles grow (explosions)<br>
                    <strong>Start = End:</strong> Constant size
                </p>
            </div>

            <h4>🌈 Color (Start & End)</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin-bottom: 8px;">Particles smoothly transition from start color to end color:</p>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 11px; color: #aaa;">
                    <div style="text-align: center;">
                        <div style="width: 30px; height: 30px; background: #ff6600; border-radius: 4px; margin: 0 auto 4px;"></div>
                        Start Color
                    </div>
                    <span style="font-size: 20px; color: #666;">→</span>
                    <div style="text-align: center;">
                        <div style="width: 30px; height: 30px; background: #ff0000; border-radius: 4px; margin: 0 auto 4px;"></div>
                        End Color
                    </div>
                </div>
                <p style="font-size: 10px; color: #666; margin-top: 8px;">
                    <strong>Fire:</strong> Yellow → Orange → Red<br>
                    <strong>Smoke:</strong> Light gray → Dark gray<br>
                    <strong>Magic:</strong> Bright colors → Fade to dark
                </p>
            </div>

            <h4>👁️ Opacity (Start & End)</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin-bottom: 8px;">Control transparency over particle lifetime:</p>
                <ul style="font-size: 11px; color: #aaa; margin-left: 16px;">
                    <li><strong>1.0 → 0.0:</strong> Fade out (most common)</li>
                    <li><strong>0.0 → 1.0:</strong> Fade in</li>
                    <li><strong>1.0 → 1.0:</strong> Stay solid</li>
                    <li><strong>0.5 → 0.5:</strong> Always semi-transparent</li>
                </ul>
            </div>

            <div class="help-tip"><p>Most effects look best when particles fade out (opacity 1 → 0) as they die. This creates smooth, natural-looking effects.</p></div>
        `
    },

    export: {
        title: '📦 Export & Usage',
        content: `
            <div style="background: linear-gradient(135deg, rgba(39,174,96,0.2), rgba(46,204,113,0.2)); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #ddd;">Export your particle effects to use them in GameMaker and other projects!</p>
            </div>

            <h4>📤 Export Options</h4>

            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #27ae60;">Export to Assets</strong> <span style="background: #27ae60; color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">Recommended</span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Exports your effect as JSON data. You can copy the data and paste it into GameMaker's particle effect fields.</p>
                </div>

                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong style="color: #3498db;">Download JSON</strong>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Downloads the effect data as a .json file to your computer. Useful for backups or sharing with others.</p>
                </div>

                <div>
                    <strong style="color: #9b59b6;">Save Screenshot</strong>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #aaa;">Captures the current canvas as a preview image. Good for thumbnails or documentation.</p>
                </div>
            </div>

            <h4>🎮 Using in GameMaker</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; margin-right: 10px;">1</span>
                    <div>
                        <strong style="color: #fff; font-size: 12px;">Export your effect</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Click "Export to Assets" and copy the URL</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; margin-right: 10px;">2</span>
                    <div>
                        <strong style="color: #fff; font-size: 12px;">Open GameMaker</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Go to Game Settings → Particles</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; margin-right: 10px;">3</span>
                    <div>
                        <strong style="color: #fff; font-size: 12px;">Enable Particle Effects</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Check the "Enable Particle Effects" checkbox</p>
                    </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <span style="background: #9b59b6; color: white; border-radius: 50%; min-width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; margin-right: 10px;">4</span>
                    <div>
                        <strong style="color: #fff; font-size: 12px;">Paste the URL</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 2px 0 0 0;">Paste into the appropriate effect field (player damage, collect item, etc.)</p>
                    </div>
                </div>
            </div>

            <h4>✨ Effect Use Cases</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px;">
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #e94560; font-size: 11px;">Player Damage</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Red sparks or flash</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #f39c12; font-size: 11px;">Collect Item</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Gold sparkles, stars</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #e74c3c; font-size: 11px;">Enemy Death</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Poof, explosion</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #2ecc71; font-size: 11px;">Level Complete</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Fireworks, confetti</p>
                </div>
            </div>

            <div class="help-tip"><p>Create multiple variations of the same effect! Different colors for different collectible types, for example.</p></div>
        `
    },

    rate: {
        title: '⚡ Particle Rate',
        content: `
            <h4>What is Rate?</h4>
            <p>The <strong>rate</strong> controls how many particles spawn per second. Think of it like a faucet - higher rate means more water (particles) flowing.</p>

            <h4>Understanding the Numbers</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #888;">1-20/s:</strong> Sparse, occasional particles (dripping water, slow embers)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #f39c12;">20-50/s:</strong> Light effect (gentle rain, small fire)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #e94560;">50-100/s:</strong> Medium density (standard fire, sparkles)</div>
                    <div><strong style="color: #9b59b6;">100-200/s:</strong> Dense effect (heavy smoke, explosions)</div>
                </div>
            </div>

            <h4>⚠️ Performance Note</h4>
            <p style="font-size: 12px; color: #ccc;">Higher rates create more particles, which uses more processing power. In games with many effects, keep rates reasonable (under 100) for smooth performance.</p>

            <div class="help-tip"><p>Balance rate with lifetime. High rate + long lifetime = LOTS of particles on screen at once!</p></div>
        `
    },

    lifetime: {
        title: '⏱️ Particle Lifetime',
        content: `
            <h4>What is Lifetime?</h4>
            <p>The <strong>lifetime</strong> is how long each particle exists before disappearing. This directly affects how far particles travel and how long effects linger.</p>

            <h4>Lifetime × Speed = Distance</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin-bottom: 8px;">A particle's travel distance depends on both lifetime and speed:</p>
                <div style="font-family: monospace; font-size: 11px; color: #9b59b6;">
                    Distance = Speed × Lifetime<br><br>
                    Example: 100 speed × 2 seconds = 200 pixels
                </div>
            </div>

            <h4>When to Use Different Lifetimes</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #e94560;">Short (0.1-0.5s):</strong> Quick flashes, sparks, impacts</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #f39c12;">Medium (0.5-2s):</strong> Most standard effects</div>
                    <div><strong style="color: #3498db;">Long (2-5s):</strong> Lingering smoke, slow-falling particles</div>
                </div>
            </div>

            <div class="help-tip"><p>Longer lifetimes mean more particles exist at once (rate × lifetime = average particle count).</p></div>
        `
    },

    speed: {
        title: '💨 Particle Speed',
        content: `
            <h4>What is Speed?</h4>
            <p>The <strong>speed</strong> controls how fast particles move when they spawn. Higher speed = faster, more energetic particles.</p>

            <h4>Speed Reference Guide</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #3498db;">0-30:</strong> Almost stationary, floating (fog, ambient dust)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #2ecc71;">30-80:</strong> Gentle movement (rising smoke, falling leaves)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #f39c12;">80-150:</strong> Moderate speed (fire, rain)</div>
                    <div><strong style="color: #e94560;">150-300:</strong> Fast movement (explosions, projectiles)</div>
                </div>
            </div>

            <h4>Combining with Other Settings</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>Speed + Gravity:</strong> Creates arcing trajectories</li>
                <li><strong>Speed + Spread:</strong> Controls the cone of emission</li>
                <li><strong>Speed + Lifetime:</strong> Determines travel distance</li>
            </ul>

            <div class="help-tip"><p>Zero speed with gravity creates a pure falling effect - particles spawn stationary then accelerate downward.</p></div>
        `
    },

    spread: {
        title: '📐 Emission Spread',
        content: `
            <h4>What is Spread?</h4>
            <p>The <strong>spread</strong> controls the range of angles particles can spawn at, centered around the Direction setting.</p>

            <h4>Visual Guide</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px; text-align: center;">
                <div style="font-size: 12px; color: #ccc; margin-bottom: 10px;">
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #e94560;">0° Spread</strong> - Single direction<br>
                        <span style="font-size: 20px;">→</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #f39c12;">45° Spread</strong> - Narrow cone<br>
                        <span style="font-size: 20px;">↗→↘</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #3498db;">90° Spread</strong> - Wide cone<br>
                        <span style="font-size: 20px;">↑↗→↘↓</span>
                    </div>
                    <div>
                        <strong style="color: #9b59b6;">360° Spread</strong> - All directions<br>
                        <span style="font-size: 20px;">←↖↑↗→↘↓↙</span>
                    </div>
                </div>
            </div>

            <h4>Common Uses</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>0-20°:</strong> Laser beams, focused jets</li>
                <li><strong>30-60°:</strong> Flames, fountains</li>
                <li><strong>90-180°:</strong> Wide sprays, fans</li>
                <li><strong>360°:</strong> Explosions, ambient effects</li>
            </ul>

            <div class="help-tip"><p>Use 360° spread for explosions and ambient effects that should emit in all directions!</p></div>
        `
    },

    gravity: {
        title: '⬇️ Gravity',
        content: `
            <h4>What is Gravity?</h4>
            <p>The <strong>gravity</strong> setting adds a constant vertical force to particles. Positive gravity pulls down, negative gravity pushes up.</p>

            <h4>Gravity Direction</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #3498db;">Negative (-200 to -1):</strong> Particles float upward<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Fire, smoke, bubbles, rising magic</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #888;">Zero (0):</strong> No gravity, straight-line movement<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Space effects, lasers, magic beams</span>
                    </div>
                    <div>
                        <strong style="color: #e94560;">Positive (1 to 200):</strong> Particles fall down<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Rain, snow, debris, falling leaves</span>
                    </div>
                </div>
            </div>

            <h4>Creating Arcs</h4>
            <p style="font-size: 12px; color: #ccc;">Combine upward speed with positive gravity to create arcing trajectories - particles go up, slow down, then fall. Great for fountains and fireworks!</p>

            <div class="help-tip"><p>Real-world gravity on Earth is about 9.8 m/s². In particle effects, values around 50-150 look natural for most falling objects.</p></div>
        `
    },

    friction: {
        title: '🌊 Friction (Air Resistance)',
        content: `
            <h4>What is Friction?</h4>
            <p>The <strong>friction</strong> setting slows particles down over time, simulating air resistance or drag. Lower values = more friction = particles slow down faster.</p>

            <h4>Friction Values</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #2ecc71;">1.00 (No friction):</strong> Particles maintain speed<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Space, lasers, constant-speed effects</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #3498db;">0.98 - 0.99 (Light friction):</strong> Gradual slowdown<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Smoke, clouds, gentle effects</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #f39c12;">0.95 - 0.97 (Medium friction):</strong> Noticeable deceleration<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Bubbles, dust, underwater effects</span>
                    </div>
                    <div>
                        <strong style="color: #e94560;">0.90 - 0.94 (Heavy friction):</strong> Rapid slowdown<br>
                        <span style="font-size: 11px; color: #aaa;">Perfect for: Thick liquids, honey, slime</span>
                    </div>
                </div>
            </div>

            <h4>Combining with Gravity</h4>
            <p style="font-size: 12px; color: #ccc;">Friction + Gravity creates realistic falling effects. Particles speed up from gravity but eventually reach a "terminal velocity" where friction balances gravity.</p>

            <div class="help-tip"><p>Try friction around 0.97-0.98 for natural-looking effects. Values below 0.95 create very noticeable drag that's great for underwater or thick-air environments.</p></div>
        `
    },

    direction: {
        title: '🧭 Direction (Angle)',
        content: `
            <h4>What is Direction?</h4>
            <p>The <strong>direction</strong> (or angle) sets the main direction particles travel when they spawn. The spread setting creates variation around this direction.</p>

            <h4>Angle Reference</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px; text-align: center;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #3498db;">-90° (or 270°):</strong> ⬆️ Upward</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #2ecc71;">0°:</strong> ➡️ Right</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #f39c12;">90°:</strong> ⬇️ Downward</div>
                    <div><strong style="color: #e94560;">±180°:</strong> ⬅️ Left</div>
                </div>
            </div>

            <h4>Common Directions</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>-90° (Up):</strong> Fire, smoke, fountains</li>
                <li><strong>90° (Down):</strong> Rain, waterfalls, falling debris</li>
                <li><strong>0° (Right):</strong> Projectiles, horizontal sprays</li>
                <li><strong>Any angle:</strong> Diagonal effects, custom directions</li>
            </ul>

            <div class="help-tip"><p>With 360° spread, direction doesn't matter much - particles go everywhere. Direction is most noticeable with lower spread values.</p></div>
        `
    },

    shape: {
        title: '🔷 Particle Shape',
        content: `
            <h4>Available Shapes</h4>
            <p>Choose from 6 different particle shapes, each suited to different effects:</p>

            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #9b59b6; font-size: 16px;">● Circle</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Most versatile. Great for: smoke, fire, bubbles, magic, anything organic-looking</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #3498db; font-size: 16px;">■ Square</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Geometric, blocky. Great for: pixel art, debris, confetti, digital effects</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #f39c12; font-size: 16px;">★ Star</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Eye-catching, magical. Great for: sparkles, magic, collectibles, celebrations</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #e94560; font-size: 16px;">✦ Spark</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Four-pointed, electric. Great for: electricity, impacts, glints, energy</p>
                    </div>
                    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <strong style="color: #87ceeb; font-size: 16px;">❄ Snowflake</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Six-pointed, intricate. Great for: snow, ice, frost, winter themes</p>
                    </div>
                    <div>
                        <strong style="color: #f1c40f; font-size: 16px;">😀 Emoji</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Fun and expressive! Great for: celebrations, reactions, themed effects</p>
                    </div>
                </div>
            </div>

            <h4>⚡ Performance Tip: Why Emojis Are Slower</h4>
            <div style="background: rgba(241, 196, 15, 0.1); border: 1px solid rgba(241, 196, 15, 0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin: 0 0 10px 0;">
                    You may notice that <strong style="color: #f1c40f;">emoji particles run slower</strong> than basic shapes. Here's why:
                </p>
                <div style="font-size: 11px; color: #aaa;">
                    <p style="margin: 0 0 8px 0;"><strong style="color: #e94560;">Basic shapes (circle, square, etc.):</strong> The computer draws simple geometric primitives using fast mathematical operations. Drawing a circle is just one calculation.</p>
                    <p style="margin: 0 0 8px 0;"><strong style="color: #e94560;">Emojis:</strong> Each emoji is a complex image/glyph that must be looked up, measured, and rendered as text. This involves font loading, glyph mapping, and anti-aliasing - much more work per particle!</p>
                    <p style="margin: 0; color: #9b59b6;"><strong>💡 This is why game developers often use sprite sheets instead of text for game objects - they're much faster to render!</strong></p>
                </div>
            </div>

            <div class="help-tip"><p>Circle is the most common choice and looks good for almost any effect. Use emojis sparingly with lower particle rates (10-30/s) for best performance.</p></div>
        `
    },

    size: {
        title: '📏 Particle Size',
        content: `
            <h4>Size Over Time</h4>
            <p>Particles can change size during their lifetime. Set a <strong>Start Size</strong> and <strong>End Size</strong> to create growing or shrinking particles.</p>

            <h4>Size Patterns</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #e94560;">Shrinking (Start > End):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Fire, smoke, dying sparks - most common</span><br>
                        <span style="font-size: 10px; color: #666;">Example: 20 → 4</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #2ecc71;">Growing (Start < End):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Expanding rings, shockwaves</span><br>
                        <span style="font-size: 10px; color: #666;">Example: 4 → 30</span>
                    </div>
                    <div>
                        <strong style="color: #3498db;">Constant (Start = End):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Rain, confetti, debris</span><br>
                        <span style="font-size: 10px; color: #666;">Example: 8 → 8</span>
                    </div>
                </div>
            </div>

            <h4>Size Reference</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>1-5:</strong> Tiny (dust, distant sparkles)</li>
                <li><strong>5-15:</strong> Small (rain, normal particles)</li>
                <li><strong>15-30:</strong> Medium (fire, smoke puffs)</li>
                <li><strong>30-50:</strong> Large (explosions, big effects)</li>
            </ul>

            <div class="help-tip"><p>Shrinking particles (big → small) create a natural "dying out" look that works for most effects.</p></div>
        `
    },

    color: {
        title: '🎨 Particle Colors',
        content: `
            <h4>Color Gradient</h4>
            <p>Each particle smoothly transitions from <strong>Start Color</strong> to <strong>End Color</strong> over its lifetime. This creates dynamic, living effects!</p>

            <h4>Classic Color Combinations</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: linear-gradient(90deg, #ffff00, #ff0000); border-radius: 3px;"></div>
                        <span><strong>Fire:</strong> Yellow → Red</span>
                    </div>
                    <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: linear-gradient(90deg, #aaaaaa, #333333); border-radius: 3px;"></div>
                        <span><strong>Smoke:</strong> Light Gray → Dark Gray</span>
                    </div>
                    <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: linear-gradient(90deg, #ffffff, #ffff00); border-radius: 3px;"></div>
                        <span><strong>Sparkle:</strong> White → Gold</span>
                    </div>
                    <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: linear-gradient(90deg, #ff00ff, #0000ff); border-radius: 3px;"></div>
                        <span><strong>Magic:</strong> Pink → Blue</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 20px; height: 20px; background: linear-gradient(90deg, #00ffff, #ffffff); border-radius: 3px;"></div>
                        <span><strong>Ice:</strong> Cyan → White</span>
                    </div>
                </div>
            </div>

            <h4>Tips</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li>Use <strong>same start/end color</strong> for constant-colored effects</li>
                <li>Ending with a <strong>darker color</strong> helps particles "fade into" dark backgrounds</li>
                <li>Bright colors draw attention - use for important effects</li>
            </ul>

            <div class="help-tip"><p>Color transitions add life to effects. Even a subtle shift (orange → dark orange) looks more dynamic than a solid color.</p></div>
        `
    },

    opacity: {
        title: '👁️ Particle Opacity',
        content: `
            <h4>Transparency Over Time</h4>
            <p>Opacity controls how see-through particles are. <strong>1.0</strong> = fully visible, <strong>0.0</strong> = invisible.</p>

            <h4>Common Opacity Patterns</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #2ecc71;">Fade Out (1.0 → 0.0):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Most common! Particles smoothly disappear. Fire, smoke, sparkles.</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #3498db;">Fade In (0.0 → 1.0):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Particles appear gradually. Ghosts, materializing effects.</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #f39c12;">Always Solid (1.0 → 1.0):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Hard-edged particles. Confetti, debris, rain.</span>
                    </div>
                    <div>
                        <strong style="color: #9b59b6;">Semi-transparent (0.5 → 0.2):</strong><br>
                        <span style="font-size: 11px; color: #aaa;">Ghostly, ethereal. Fog, mist, auras.</span>
                    </div>
                </div>
            </div>

            <h4>Why Fade Out?</h4>
            <p style="font-size: 12px; color: #ccc;">Fading out (1 → 0) is almost always the right choice because:</p>
            <ul style="font-size: 11px; color: #aaa; margin-left: 16px;">
                <li>Particles disappear smoothly instead of popping out of existence</li>
                <li>Creates natural-looking dissipation</li>
                <li>Blends better with backgrounds</li>
            </ul>

            <div class="help-tip"><p>When in doubt, use 1.0 → 0.0. Fade out looks good for almost every type of particle effect!</p></div>
        `
    },

    layers: {
        title: '📚 Layers',
        content: `
            <div style="background: linear-gradient(135deg, rgba(155,89,182,0.2), rgba(52,152,219,0.2)); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #ddd;"><strong>Layers</strong> let you combine multiple particle effects into one! Each layer is a separate emitter with its own settings.</p>
            </div>

            <h4>🔥 Why Use Layers?</h4>
            <p style="font-size: 12px; color: #ccc;">Complex effects like realistic fire are actually made of multiple layers:</p>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #666;">Layer 1 - Smoke:</strong> Dark gray, large, slow-rising</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #ff6600;">Layer 2 - Outer Flame:</strong> Orange, medium size</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #ff0000;">Layer 3 - Mid Flame:</strong> Red-orange, smaller</div>
                    <div><strong style="color: #ffff00;">Layer 4 - Core:</strong> Yellow-white, smallest, brightest</div>
                </div>
            </div>

            <h4>🎮 Layer Controls</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 8px;"><strong style="color: #9b59b6;">+ Add:</strong> Create a new empty layer</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #9b59b6;">📋 Duplicate:</strong> Copy the selected layer (Ctrl+D)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #9b59b6;">🗑️ Delete:</strong> Remove the selected layer (Del)</div>
                    <div style="margin-bottom: 8px;"><strong style="color: #9b59b6;">▲ / ▼ Reorder:</strong> Change render order</div>
                    <div><strong style="color: #9b59b6;">👁️ Visibility:</strong> Toggle layer on/off</div>
                </div>
            </div>

            <h4>🔗 Link Positions</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin: 0 0 10px 0;">When <strong>Link Positions</strong> is enabled, clicking on the canvas moves <strong>all layers together</strong> instead of just the selected layer.</p>
                <div style="font-size: 11px; color: #aaa;">
                    <div style="margin-bottom: 6px;"><strong style="color: #2ecc71;">✓ Linked (ON):</strong> All emitters move as a group - great for multi-layer effects that should stay together</div>
                    <div><strong style="color: #888;">○ Unlinked (OFF):</strong> Only the selected layer moves - position layers independently</div>
                </div>
            </div>

            <h4>📐 Render Order</h4>
            <p style="font-size: 12px; color: #ccc;">Layers at the <strong>top</strong> of the list render <strong>on top</strong> (in front). Drag layers up to bring them forward, down to push them back.</p>

            <h4>✏️ Renaming Layers</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="font-size: 12px; color: #ccc; margin: 0 0 8px 0;"><strong>Double-click</strong> on any layer name to rename it:</p>
                <ul style="font-size: 11px; color: #aaa; margin: 0 0 0 16px; padding: 0;">
                    <li>Type your new name</li>
                    <li>Press <strong>Enter</strong> to save</li>
                    <li>Press <strong>Escape</strong> to cancel</li>
                </ul>
                <p style="font-size: 11px; color: #666; margin: 8px 0 0 0;">Tip: Use descriptive names like "Smoke", "Inner Flame", "Sparks" to stay organized!</p>
            </div>

            <h4>💡 Tips</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li>Click a layer to select it for editing</li>
                <li>Presets apply to the selected layer only</li>
                <li>Each layer has its own position, colors, and settings</li>
            </ul>

            <div class="help-tip"><p>Start simple! Add layers one at a time and adjust until you get the look you want.</p></div>
        `
    },

    blending: {
        title: '✨ Additive Blending',
        content: `
            <div style="background: linear-gradient(135deg, rgba(155,89,182,0.2), rgba(241,196,15,0.2)); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 13px; color: #ddd;"><strong>Additive Blending</strong> makes overlapping particles glow brighter instead of blocking each other!</p>
            </div>

            <h4>🔬 How It Works</h4>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                <div style="font-size: 12px; color: #ccc;">
                    <div style="margin-bottom: 12px;">
                        <strong style="color: #888;">Normal Blending (OFF):</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Particles on top cover particles behind them. Like stacking paper.</p>
                    </div>
                    <div>
                        <strong style="color: #f1c40f;">Additive Blending (ON):</strong>
                        <p style="font-size: 11px; color: #aaa; margin: 4px 0 0 0;">Particle colors are added together. Overlapping areas become brighter. Like mixing light!</p>
                    </div>
                </div>
            </div>

            <h4>⚡ Best Used For</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px;">
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #ff6600; font-size: 11px;">🔥 Fire</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Glowing hot core</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #00bfff; font-size: 11px;">⚡ Lightning</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Electric glow</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #9b59b6; font-size: 11px;">✨ Magic</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Mystical sparkles</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                    <strong style="color: #f1c40f; font-size: 11px;">💫 Stars</strong>
                    <p style="font-size: 10px; color: #aaa; margin: 2px 0 0 0;">Bright celestial</p>
                </div>
            </div>

            <h4>⚠️ Not Great For</h4>
            <ul style="font-size: 12px; color: #ccc; margin-left: 16px;">
                <li><strong>Smoke:</strong> Should block, not glow</li>
                <li><strong>Rain/Snow:</strong> Solid particles look better</li>
                <li><strong>Debris:</strong> Physical objects don't emit light</li>
            </ul>

            <div class="help-tip"><p>Additive blending works best with brighter colors and dark backgrounds. Try it on fire and magic effects!</p></div>
        `
    }
};

function showHelp(topic) {
    const help = helpContent[topic];
    if (!help) {
        console.warn('Help topic not found:', topic);
        return;
    }

    document.getElementById('help-modal-title').textContent = help.title;
    document.getElementById('help-modal-content').innerHTML = help.content;
    document.getElementById('help-modal').style.display = 'flex';
}

function closeHelpModal() {
    document.getElementById('help-modal').style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('help-modal');
    if (e.target === modal) {
        closeHelpModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeHelpModal();
    }
});
