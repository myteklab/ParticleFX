/**
 * Particle FX Designer - Main Engine
 * Handles rendering loop and UI interactions
 * Updated for multi-layer support
 */

// Global state
let canvas, ctx;
let isPlaying = true;
let lastTime = 0;
let isDirty = false;

/**
 * Initialize the particle engine
 */
function initEngine() {
    // Get canvas
    canvas = document.getElementById('particle-canvas');
    ctx = canvas.getContext('2d');

    // Initialize layers system
    initLayers();

    // Load initial data if available
    if (typeof INITIAL_DATA !== 'undefined' && INITIAL_DATA) {
        loadLayersFromData(INITIAL_DATA);
    }

    // Setup UI controls
    setupControls();

    // Setup canvas click
    canvas.addEventListener('click', handleCanvasClick);

    // Start render loop
    requestAnimationFrame(render);

    // Update UI to match loaded data
    updateUIFromEmitter();

    // Initialize history system
    initHistory();

    console.log('Particle FX Engine initialized with layer support');
}

/**
 * Main render loop
 */
function render(timestamp) {
    // Calculate delta time
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 0;
    lastTime = timestamp;

    // Cap delta time to prevent huge jumps
    const cappedDt = Math.min(dt, 0.1);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all visible layers (in order - first layer renders first, last on top)
    const allLayers = getAllLayers();
    allLayers.forEach((layer, index) => {
        // Always update (keeps particles moving even when hidden)
        layer.update(cappedDt);

        // Only draw if visible
        if (layer.visible) {
            // Only show indicator for selected layer
            const isSelected = index === selectedLayerIndex;
            layer.draw(ctx, isSelected);
        }
    });

    // Update particle count display (total across all layers)
    document.getElementById('particle-count').textContent =
        getTotalParticleCount() + ' particles';

    // Update layer panel particle counts
    updateLayerCounts();

    // Continue loop
    requestAnimationFrame(render);
}

/**
 * Handle canvas click to move emitter(s)
 */
function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if link positions is enabled
    const linkPositions = document.getElementById('link-positions').checked;

    if (linkPositions) {
        // Move all layers together
        const allLayers = getAllLayers();
        allLayers.forEach(emitter => {
            emitter.setPosition(x, y);
        });
        saveState('Move All Emitters');
        markDirty();
    } else {
        // Move only the selected layer's emitter
        const emitter = getSelectedEmitter();
        if (emitter) {
            emitter.setPosition(x, y);
            saveState('Move Emitter');
            markDirty();
        }
    }
}

/**
 * Setup UI control event listeners
 */
function setupControls() {
    // Toolbar action buttons
    document.getElementById('btn-play').addEventListener('click', togglePlay);
    document.getElementById('btn-reset').addEventListener('click', resetParticles);
    document.getElementById('btn-share').addEventListener('click', shareProject);
    document.getElementById('btn-randomize').addEventListener('click', openRandomizeModal);

    // File menu items (close menu after action)
    document.getElementById('btn-save').addEventListener('click', () => { closeAllMenus(); saveProject(); });
    document.getElementById('btn-export').addEventListener('click', () => { closeAllMenus(); exportJSON(); });
    document.getElementById('btn-export-asset').addEventListener('click', () => { closeAllMenus(); exportAsset(); });
    document.getElementById('btn-screenshot').addEventListener('click', () => { closeAllMenus(); saveScreenshot(); });

    // Edit menu items (close menu after action)
    document.getElementById('btn-undo').addEventListener('click', () => { closeAllMenus(); undo(); });
    document.getElementById('btn-redo').addEventListener('click', () => { closeAllMenus(); redo(); });

    // Randomize modal radio buttons
    document.querySelectorAll('input[name="randomize-mode"]').forEach(radio => {
        radio.addEventListener('change', updateRandomizeUI);
    });

    // Link positions toggle - update canvas hint
    const linkPositionsCheckbox = document.getElementById('link-positions');
    if (linkPositionsCheckbox) {
        linkPositionsCheckbox.addEventListener('change', updateCanvasHint);
    }

    // Layer control buttons
    const addLayerBtn = document.getElementById('btn-add-layer');
    if (addLayerBtn) addLayerBtn.addEventListener('click', addLayer);

    const deleteLayerBtn = document.getElementById('btn-delete-layer');
    if (deleteLayerBtn) deleteLayerBtn.addEventListener('click', deleteLayer);

    const duplicateLayerBtn = document.getElementById('btn-duplicate-layer');
    if (duplicateLayerBtn) duplicateLayerBtn.addEventListener('click', duplicateLayer);

    const moveUpBtn = document.getElementById('btn-layer-up');
    if (moveUpBtn) moveUpBtn.addEventListener('click', moveLayerUp);

    const moveDownBtn = document.getElementById('btn-layer-down');
    if (moveDownBtn) moveDownBtn.addEventListener('click', moveLayerDown);

    const centerAllBtn = document.getElementById('btn-center-all');
    if (centerAllBtn) centerAllBtn.addEventListener('click', centerAllLayers);

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const presetName = btn.dataset.preset;
            loadPreset(presetName);
        });
    });

    // Shape buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const emitter = getSelectedEmitter();
            document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            emitter.shape = btn.dataset.shape;

            // Show/hide emoji picker based on shape selection
            const emojiPickerRow = document.getElementById('emoji-picker-row');
            if (btn.dataset.shape === 'emoji') {
                emojiPickerRow.style.display = 'flex';
            } else {
                emojiPickerRow.style.display = 'none';
            }

            saveState('Change Shape');
            markDirty();
        });
    });

    // Emitter shape buttons
    document.querySelectorAll('.emitter-shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const emitter = getSelectedEmitter();
            document.querySelectorAll('.emitter-shape-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            emitter.emitterShape = btn.dataset.emitterShape;
            updateEmitterShapeParams(btn.dataset.emitterShape);
            saveState('Change Emitter Shape');
            markDirty();
        });
    });

    // Emoji buttons
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const emitter = getSelectedEmitter();
            const emoji = btn.dataset.emoji;
            emitter.emoji = emoji;

            // Update selected state
            document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Update display
            document.getElementById('current-emoji-display').textContent = emoji;

            // Clear and restart to show new emoji
            emitter.clear();

            saveState('Change Emoji');
            markDirty();
        });
    });

    // Range sliders - use functions that get current emitter
    setupSlider('rate', (val) => { getSelectedEmitter().rate = val; }, v => v + '/s');
    setupSlider('lifetime', (val) => { getSelectedEmitter().lifetime = val; }, v => v.toFixed(1) + 's');
    setupSlider('speed', (val) => { getSelectedEmitter().speed = val; }, v => v);
    setupSlider('spread', (val) => { getSelectedEmitter().spread = val; }, v => v + '\u00B0');
    setupSlider('gravity', (val) => { getSelectedEmitter().gravity = val; }, v => v);
    setupSlider('friction', (val) => { getSelectedEmitter().friction = val; }, v => v.toFixed(2));
    setupSlider('angle', (val) => { getSelectedEmitter().angle = val; }, v => v + '\u00B0');
    setupSlider('emitterWidth', (val) => { getSelectedEmitter().emitterWidth = val; }, v => v);
    setupSlider('emitterHeight', (val) => { getSelectedEmitter().emitterHeight = val; }, v => v);
    setupSlider('emitterRadius', (val) => { getSelectedEmitter().emitterRadius = val; }, v => v);

    // Emitter filled toggle
    const emitterFilledToggle = document.getElementById('emitterFilled');
    if (emitterFilledToggle) {
        emitterFilledToggle.addEventListener('change', (e) => {
            getSelectedEmitter().emitterFilled = e.target.checked;
            saveState('Toggle Emitter Filled');
            markDirty();
        });
    }
    setupSlider('sizeStart', (val) => { getSelectedEmitter().sizeStart = val; }, v => v);
    setupSlider('sizeEnd', (val) => { getSelectedEmitter().sizeEnd = val; }, v => v);
    setupSlider('opacityStart', (val) => { getSelectedEmitter().opacityStart = val; }, v => v.toFixed(2));
    setupSlider('opacityEnd', (val) => { getSelectedEmitter().opacityEnd = val; }, v => v.toFixed(2));

    // Color inputs
    document.getElementById('colorStart').addEventListener('input', (e) => {
        getSelectedEmitter().colorStart = e.target.value;
        saveStateDebounced('Change Start Color');
        markDirty();
    });

    document.getElementById('colorEnd').addEventListener('input', (e) => {
        getSelectedEmitter().colorEnd = e.target.value;
        saveStateDebounced('Change End Color');
        markDirty();
    });

    // Blend mode toggle
    const blendToggle = document.getElementById('blend-mode');
    if (blendToggle) {
        blendToggle.addEventListener('change', (e) => {
            getSelectedEmitter().blendMode = e.target.checked ? 'lighter' : 'source-over';
            saveState('Toggle Blend Mode');
            markDirty();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

/**
 * Setup a slider control
 */
function setupSlider(id, updateFn, formatFn) {
    const slider = document.getElementById(id);
    const display = document.getElementById(id + '-value');

    if (!slider) return;

    slider.addEventListener('input', () => {
        const value = parseFloat(slider.value);
        updateFn(value);
        display.textContent = formatFn(value);
        saveStateDebounced('Change ' + id);
        markDirty();
    });
}

/**
 * Show/hide emitter shape parameter rows based on selected shape
 */
function updateEmitterShapeParams(shape) {
    const widthRow = document.getElementById('emitter-width-row');
    const heightRow = document.getElementById('emitter-height-row');
    const radiusRow = document.getElementById('emitter-radius-row');
    const filledRow = document.getElementById('emitter-filled-row');

    // Hide all first
    widthRow.style.display = 'none';
    heightRow.style.display = 'none';
    radiusRow.style.display = 'none';
    filledRow.style.display = 'none';

    // Show relevant ones based on shape
    switch (shape) {
        case 'line':
            widthRow.style.display = 'flex';
            break;
        case 'circle':
            radiusRow.style.display = 'flex';
            filledRow.style.display = 'flex';
            break;
        case 'rectangle':
            widthRow.style.display = 'flex';
            heightRow.style.display = 'flex';
            break;
        case 'point':
        default:
            // No extra parameters for point
            break;
    }
}

/**
 * Update UI controls to match selected emitter state
 */
function updateUIFromEmitter() {
    const emitter = getSelectedEmitter();
    if (!emitter) return;

    // Update sliders
    setSliderValue('rate', emitter.rate, emitter.rate + '/s');
    setSliderValue('lifetime', emitter.lifetime, emitter.lifetime.toFixed(1) + 's');
    setSliderValue('speed', emitter.speed, emitter.speed);
    setSliderValue('spread', emitter.spread, emitter.spread + '\u00B0');
    setSliderValue('gravity', emitter.gravity, emitter.gravity);
    setSliderValue('friction', emitter.friction, emitter.friction.toFixed(2));
    setSliderValue('angle', emitter.angle, emitter.angle + '\u00B0');
    setSliderValue('emitterWidth', emitter.emitterWidth, emitter.emitterWidth);
    setSliderValue('emitterHeight', emitter.emitterHeight, emitter.emitterHeight);
    setSliderValue('emitterRadius', emitter.emitterRadius, emitter.emitterRadius);
    setSliderValue('sizeStart', emitter.sizeStart, emitter.sizeStart);
    setSliderValue('sizeEnd', emitter.sizeEnd, emitter.sizeEnd);
    setSliderValue('opacityStart', emitter.opacityStart, emitter.opacityStart.toFixed(2));
    setSliderValue('opacityEnd', emitter.opacityEnd, emitter.opacityEnd.toFixed(2));

    // Update emitter shape buttons
    document.querySelectorAll('.emitter-shape-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.emitterShape === emitter.emitterShape);
    });

    // Update emitter shape parameters visibility
    updateEmitterShapeParams(emitter.emitterShape);

    // Update emitter filled toggle
    const emitterFilledToggle = document.getElementById('emitterFilled');
    if (emitterFilledToggle) {
        emitterFilledToggle.checked = emitter.emitterFilled;
    }

    // Update colors
    document.getElementById('colorStart').value = emitter.colorStart;
    document.getElementById('colorEnd').value = emitter.colorEnd;

    // Update shape buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.shape === emitter.shape);
    });

    // Update emoji picker visibility
    const emojiPickerRow = document.getElementById('emoji-picker-row');
    if (emojiPickerRow) {
        emojiPickerRow.style.display = emitter.shape === 'emoji' ? 'flex' : 'none';
    }

    // Update blend mode toggle
    const blendToggle = document.getElementById('blend-mode');
    if (blendToggle) {
        blendToggle.checked = emitter.blendMode === 'lighter';
    }
}

/**
 * Set slider value and display
 */
function setSliderValue(id, value, displayValue) {
    const slider = document.getElementById(id);
    const display = document.getElementById(id + '-value');
    if (slider) slider.value = value;
    if (display) display.textContent = displayValue;
}

/**
 * Load a preset to the selected layer
 */
function loadPreset(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) return;

    const emitter = getSelectedEmitter();

    // Apply preset to emitter (keep position)
    const currentX = emitter.x;
    const currentY = emitter.y;

    emitter.updateConfig(preset);
    emitter.x = currentX;
    emitter.y = currentY;

    // Clear existing particles for clean transition
    emitter.clear();

    // Update UI
    updateUIFromEmitter();
    renderLayerPanel();
    saveState('Load Preset');
    markDirty();

    showToast(`Loaded "${preset.name}" preset to ${emitter.name}`, 'info');
}

/**
 * Toggle play/pause for all layers
 */
function togglePlay() {
    const allLayers = getAllLayers();

    // Toggle based on current state
    isPlaying = !isPlaying;

    allLayers.forEach(layer => {
        if (isPlaying) {
            layer.resume();
        } else {
            layer.pause();
        }
    });

    const btn = document.getElementById('btn-play');
    if (isPlaying) {
        btn.innerHTML = '<span class="icon">&#10074;&#10074;</span> Pause';
        btn.classList.add('active');
    } else {
        btn.innerHTML = '<span class="icon">&#9658;</span> Play';
        btn.classList.remove('active');
    }
}

/**
 * Reset/clear all particles from all layers
 */
function resetParticles() {
    getAllLayers().forEach(layer => layer.clear());
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboard(e) {
    // Ctrl+S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
    }

    // Ctrl+Z to undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }

    // Ctrl+Y or Ctrl+Shift+Z to redo
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
    }

    // Space to toggle play/pause
    if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    }

    // R to reset particles
    if (e.key === 'r' && e.target.tagName !== 'INPUT') {
        resetParticles();
    }

    // Delete key to delete selected layer
    if (e.key === 'Delete' && e.target.tagName !== 'INPUT') {
        deleteLayer();
    }

    // Ctrl+D to duplicate layer
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateLayer();
    }
}

/**
 * Mark project as having unsaved changes
 */
function markDirty() {
    isDirty = true;
}

/**
 * Mark project as saved
 */
function markClean() {
    isDirty = false;
}

/**
 * Export configuration as JSON file (v2.0 format with layers)
 */
function exportJSON() {
    const data = exportLayersToJSON();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'particle-effect.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Exported JSON file', 'success');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Export effect as JSON asset (v2.0 format)
 */
function exportAsset() {
    const data = exportLayersToJSON();
    const json = JSON.stringify(data, null, 2);

    // Show the asset data in the modal for copying
    document.getElementById('asset-url').textContent = json;
    document.getElementById('asset-modal').style.display = 'flex';
    showToast('Asset exported!', 'success');
}

/**
 * Close asset modal
 */
function closeAssetModal() {
    document.getElementById('asset-modal').style.display = 'none';
}

/**
 * Copy code to clipboard
 */
function copyCode(elementId) {
    const code = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Code copied to clipboard!', 'success');
    });
}

/**
 * Toggle dropdown menu visibility
 */
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const allMenus = document.querySelectorAll('.menu-content');

    // Close all other menus
    allMenus.forEach(m => {
        if (m.id !== menuId) {
            m.classList.remove('show');
        }
    });

    // Toggle this menu
    menu.classList.toggle('show');
}

/**
 * Close all dropdown menus
 */
function closeAllMenus() {
    document.querySelectorAll('.menu-content').forEach(menu => {
        menu.classList.remove('show');
    });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-dropdown')) {
        closeAllMenus();
    }
});

/**
 * Update canvas hint based on link positions state
 */
function updateCanvasHint() {
    const hint = document.querySelector('.canvas-hint');
    const linkPositions = document.getElementById('link-positions').checked;

    if (hint) {
        if (linkPositions) {
            hint.textContent = 'Click to move all emitters';
            hint.style.color = '#9b59b6';
        } else {
            hint.textContent = 'Click to move emitter';
            hint.style.color = '';
        }
    }
}

/**
 * Open the randomize modal
 */
function openRandomizeModal() {
    document.getElementById('randomize-modal').style.display = 'flex';
    updateRandomizeUI();
}

/**
 * Close the randomize modal
 */
function closeRandomizeModal() {
    document.getElementById('randomize-modal').style.display = 'none';
}

/**
 * Update randomize UI based on selected mode
 */
function updateRandomizeUI() {
    const mode = document.querySelector('input[name="randomize-mode"]:checked').value;
    const layersCountSection = document.getElementById('layers-count-section');
    const linkOptionSection = document.getElementById('link-option-section');

    if (mode === 'new') {
        layersCountSection.style.display = 'flex';
        linkOptionSection.style.display = 'block';
    } else if (mode === 'all') {
        layersCountSection.style.display = 'none';
        linkOptionSection.style.display = 'block';
    } else {
        layersCountSection.style.display = 'none';
        linkOptionSection.style.display = 'none';
    }
}

/**
 * Adjust layer count in randomize modal
 */
function adjustLayerCount(delta) {
    const input = document.getElementById('random-layer-count');
    let value = parseInt(input.value) + delta;
    value = Math.max(1, Math.min(8, value));
    input.value = value;
}

/**
 * Execute the randomize action
 */
function executeRandomize() {
    const mode = document.querySelector('input[name="randomize-mode"]:checked').value;
    const linkCheckbox = document.getElementById('randomize-link-positions');
    const shouldLink = linkCheckbox && linkCheckbox.checked;

    switch (mode) {
        case 'current':
            randomizeCurrentLayer();
            break;
        case 'all':
            randomizeAllLayers(shouldLink);
            break;
        case 'new':
            const count = parseInt(document.getElementById('random-layer-count').value);
            createRandomLayers(count, shouldLink);
            break;
    }

    closeRandomizeModal();
}

/**
 * Generate a random hex color
 */
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Generate random emitter settings
 */
function generateRandomSettings() {
    const shapes = ['circle', 'square', 'star', 'spark', 'snowflake'];
    const emitterShapes = ['point', 'line', 'circle', 'rectangle'];

    // Random color palette approach - sometimes complementary, sometimes analogous
    const hue1 = Math.random() * 360;
    const hueVariation = Math.random() > 0.5 ?
        (30 + Math.random() * 60) : // Analogous colors
        (150 + Math.random() * 60);  // Complementary colors
    const hue2 = (hue1 + hueVariation) % 360;

    const colorStart = `hsl(${hue1}, ${60 + Math.random() * 40}%, ${50 + Math.random() * 30}%)`;
    const colorEnd = `hsl(${hue2}, ${60 + Math.random() * 40}%, ${30 + Math.random() * 40}%)`;

    // Convert HSL to hex
    const hslToHex = (h, s, l) => {
        s /= 100;
        l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const s1 = 60 + Math.random() * 40;
    const l1 = 50 + Math.random() * 30;
    const s2 = 60 + Math.random() * 40;
    const l2 = 30 + Math.random() * 40;

    return {
        emitter: {
            rate: Math.floor(20 + Math.random() * 130),
            lifetime: 0.5 + Math.random() * 3.5,
            speed: Math.floor(30 + Math.random() * 220),
            spread: Math.floor(15 + Math.random() * 345),
            gravity: Math.floor(-150 + Math.random() * 300),
            angle: Math.floor(-180 + Math.random() * 360),
            emitterShape: emitterShapes[Math.floor(Math.random() * emitterShapes.length)],
            emitterWidth: Math.floor(50 + Math.random() * 150),
            emitterHeight: Math.floor(30 + Math.random() * 100),
            emitterRadius: Math.floor(30 + Math.random() * 120),
            emitterFilled: Math.random() > 0.3
        },
        particle: {
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            sizeStart: Math.floor(4 + Math.random() * 30),
            sizeEnd: Math.floor(1 + Math.random() * 15),
            colorStart: hslToHex(hue1, s1, l1),
            colorEnd: hslToHex(hue2, s2, l2),
            opacityStart: 0.7 + Math.random() * 0.3,
            opacityEnd: Math.random() * 0.3,
            blendMode: Math.random() > 0.6 ? 'lighter' : 'source-over',
            friction: 0.95 + Math.random() * 0.05
        }
    };
}

/**
 * Randomize the current layer
 */
function randomizeCurrentLayer() {
    const emitter = getSelectedEmitter();
    const settings = generateRandomSettings();

    // Keep position
    const currentX = emitter.x;
    const currentY = emitter.y;
    const currentName = emitter.name;

    // Apply random settings
    emitter.updateConfig(settings);
    emitter.x = currentX;
    emitter.y = currentY;
    emitter.name = currentName;

    // Clear particles for clean look
    emitter.clear();

    // Update UI
    updateUIFromEmitter();
    renderLayerPanel();
    saveState('Randomize Layer');
    markDirty();

    showToast('Randomized ' + emitter.name + '!', 'success');
}

/**
 * Randomize all existing layers
 */
function randomizeAllLayers(linkPositions = false) {
    const allLayers = getAllLayers();

    // If linking, move all to center first
    const centerX = 400;
    const centerY = 300;

    allLayers.forEach((emitter, index) => {
        const settings = generateRandomSettings();

        // Keep name, optionally link positions
        const currentName = emitter.name;

        emitter.updateConfig(settings);
        emitter.name = currentName;

        if (linkPositions) {
            emitter.x = centerX;
            emitter.y = centerY;
        }

        emitter.clear();
    });

    // Set link positions checkbox and update hint
    if (linkPositions && allLayers.length > 1) {
        document.getElementById('link-positions').checked = true;
        updateCanvasHint();
    }

    // Update UI
    updateUIFromEmitter();
    renderLayerPanel();
    saveState('Randomize All Layers');
    markDirty();

    const linkMsg = (linkPositions && allLayers.length > 1) ? ' (positions linked)' : '';
    showToast('Randomized all ' + allLayers.length + ' layers!' + linkMsg, 'success');
}

/**
 * Create new random layers
 */
function createRandomLayers(count, linkPositions = false) {
    // Clear existing layers
    layers = [];

    // Determine positions - all same if linking, or random spread
    const centerX = 400;
    const centerY = 300;

    // Create new random layers
    for (let i = 0; i < count; i++) {
        const settings = generateRandomSettings();

        // If linking positions, all layers at center; otherwise random spread
        const x = linkPositions ? centerX : (200 + Math.random() * 400);
        const y = linkPositions ? centerY : (150 + Math.random() * 300);

        const newEmitter = new Emitter({
            name: 'Random Layer ' + (i + 1),
            x: x,
            y: y
        });

        newEmitter.updateConfig(settings);
        layers.push(newEmitter);
    }

    selectedLayerIndex = 0;

    // Set link positions checkbox and update hint
    if (linkPositions && count > 1) {
        document.getElementById('link-positions').checked = true;
        updateCanvasHint();
    }

    // Update UI
    updateUIFromEmitter();
    renderLayerPanel();
    saveState('Create Random Layers');
    markDirty();

    const linkMsg = (linkPositions && count > 1) ? ' (positions linked)' : '';
    showToast('Created ' + count + ' random layers!' + linkMsg, 'success');
}

/**
 * Toggle section collapse state
 */
function toggleSection(sectionName, event) {
    // Don't toggle if clicking help button
    if (event && event.target.closest('.help-icon')) {
        return;
    }

    const section = document.querySelector(`.panel-section[data-section="${sectionName}"]`);
    if (!section) return;

    section.classList.toggle('collapsed');

    // Save state to localStorage
    saveSectionStates();
}

/**
 * Save collapsed states to localStorage
 */
function saveSectionStates() {
    const sections = document.querySelectorAll('.panel-section[data-section]');
    const states = {};

    sections.forEach(section => {
        const name = section.dataset.section;
        states[name] = section.classList.contains('collapsed');
    });

    localStorage.setItem('particlefx_section_states', JSON.stringify(states));
}

/**
 * Load collapsed states from localStorage
 */
function loadSectionStates() {
    const saved = localStorage.getItem('particlefx_section_states');
    if (!saved) return;

    try {
        const states = JSON.parse(saved);
        Object.keys(states).forEach(name => {
            if (states[name]) {
                const section = document.querySelector(`.panel-section[data-section="${name}"]`);
                if (section) {
                    section.classList.add('collapsed');
                }
            }
        });
    } catch (e) {
        console.warn('Failed to load section states:', e);
    }
}

/**
 * Initialize resizable panel
 */
function initResizablePanel() {
    const panel = document.querySelector('.control-panel');
    const handle = document.getElementById('panel-resize-handle');
    if (!panel || !handle) return;

    let isResizing = false;
    let startX, startWidth;
    const defaultWidth = 280;

    // Load saved width
    const savedWidth = localStorage.getItem('particlefx_panel_width');
    if (savedWidth) {
        panel.style.width = savedWidth + 'px';
    }

    // Double-click to reset to default width
    handle.addEventListener('dblclick', () => {
        panel.style.width = defaultWidth + 'px';
        localStorage.setItem('particlefx_panel_width', defaultWidth);
        showToast('Panel width reset', 'info');
    });

    handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = panel.offsetWidth;
        handle.classList.add('resizing');
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        // Calculate new width (dragging left edge, so subtract delta)
        const delta = startX - e.clientX;
        let newWidth = startWidth + delta;

        // Constrain width
        newWidth = Math.max(280, Math.min(600, newWidth));

        panel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            handle.classList.remove('resizing');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            // Save width
            localStorage.setItem('particlefx_panel_width', panel.offsetWidth);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEngine();
    loadSectionStates();
    initResizablePanel();
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAssetModal();
        closeRandomizeModal();
    }
});

// Warn about unsaved changes
window.addEventListener('beforeunload', (e) => {
    if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Leave anyway?';
        return e.returnValue;
    }
});
