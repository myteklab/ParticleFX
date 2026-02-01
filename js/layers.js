/**
 * Particle FX Designer - Layer Management
 * Handles layer creation, deletion, reordering, and selection
 */

// Global layer state
let layers = [];
let selectedLayerIndex = 0;

/**
 * Initialize layers with default layer
 */
function initLayers() {
    layers = [new Emitter({ name: 'Layer 1' })];
    selectedLayerIndex = 0;
    renderLayerPanel();
}

/**
 * Get the currently selected emitter
 */
function getSelectedEmitter() {
    return layers[selectedLayerIndex] || layers[0];
}

/**
 * Get all layers
 */
function getAllLayers() {
    return layers;
}

/**
 * Add a new layer
 */
function addLayer() {
    const newName = 'Layer ' + (layers.length + 1);
    const newEmitter = new Emitter({
        name: newName,
        x: 400,
        y: 300
    });
    layers.push(newEmitter);
    selectedLayerIndex = layers.length - 1;
    renderLayerPanel();
    updateUIFromEmitter();
    saveState('Add Layer');
    markDirty();
    showToast('Added new layer: ' + newName, 'success');
}

/**
 * Delete the currently selected layer
 */
function deleteLayer() {
    if (layers.length <= 1) {
        showToast('Cannot delete the only layer', 'error');
        return;
    }

    const deletedName = layers[selectedLayerIndex].name;
    layers.splice(selectedLayerIndex, 1);

    // Adjust selection
    if (selectedLayerIndex >= layers.length) {
        selectedLayerIndex = layers.length - 1;
    }

    renderLayerPanel();
    updateUIFromEmitter();
    saveState('Delete Layer');
    markDirty();
    showToast('Deleted layer: ' + deletedName, 'info');
}

/**
 * Duplicate the currently selected layer
 */
function duplicateLayer() {
    const source = layers[selectedLayerIndex];
    const newEmitter = new Emitter();

    // Copy all properties
    newEmitter.fromJSON(source.toJSON());
    newEmitter.name = source.name + ' (Copy)';
    newEmitter.visible = true;
    newEmitter.particles = []; // Start fresh with particles

    // Insert after current layer
    layers.splice(selectedLayerIndex + 1, 0, newEmitter);
    selectedLayerIndex = selectedLayerIndex + 1;

    renderLayerPanel();
    updateUIFromEmitter();
    saveState('Duplicate Layer');
    markDirty();
    showToast('Duplicated layer: ' + source.name, 'success');
}

/**
 * Center all layers on the canvas
 */
function centerAllLayers() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    layers.forEach(layer => {
        layer.x = centerX;
        layer.y = centerY;
    });

    updateUIFromEmitter();
    saveState('Center All Layers');
    markDirty();
    showToast('All layers centered', 'success');
}

/**
 * Move selected layer up (towards front/top of render order)
 */
function moveLayerUp() {
    if (selectedLayerIndex >= layers.length - 1) {
        return; // Already at top
    }

    // Swap with layer above
    const temp = layers[selectedLayerIndex];
    layers[selectedLayerIndex] = layers[selectedLayerIndex + 1];
    layers[selectedLayerIndex + 1] = temp;
    selectedLayerIndex++;

    renderLayerPanel();
    saveState('Reorder Layers');
    markDirty();
}

/**
 * Move selected layer down (towards back/bottom of render order)
 */
function moveLayerDown() {
    if (selectedLayerIndex <= 0) {
        return; // Already at bottom
    }

    // Swap with layer below
    const temp = layers[selectedLayerIndex];
    layers[selectedLayerIndex] = layers[selectedLayerIndex - 1];
    layers[selectedLayerIndex - 1] = temp;
    selectedLayerIndex--;

    renderLayerPanel();
    saveState('Reorder Layers');
    markDirty();
}

/**
 * Select a layer by index
 */
function selectLayer(index) {
    if (index < 0 || index >= layers.length) return;

    // Skip re-render if already selected (allows double-click to work)
    if (selectedLayerIndex === index) return;

    selectedLayerIndex = index;
    renderLayerPanel();
    updateUIFromEmitter();
}

/**
 * Toggle layer visibility
 */
function toggleLayerVisibility(index) {
    if (index < 0 || index >= layers.length) return;

    layers[index].visible = !layers[index].visible;
    renderLayerPanel();
    saveState('Toggle Visibility');
    markDirty();
}

/**
 * Rename a layer
 */
function renameLayer(index, newName) {
    if (index < 0 || index >= layers.length) return;
    if (!newName || newName.trim() === '') {
        renderLayerPanel(); // Revert to original
        return;
    }

    const trimmedName = newName.trim();
    const oldName = layers[index].name;

    // Don't save state if name didn't change
    if (trimmedName === oldName) {
        renderLayerPanel();
        return;
    }

    layers[index].name = trimmedName;
    renderLayerPanel();
    saveState('Rename Layer');
    markDirty();
    showToast('Renamed to "' + trimmedName + '"', 'success');
}

/**
 * Render the layer panel UI
 */
function renderLayerPanel() {
    const panel = document.getElementById('layer-list');
    if (!panel) return;

    panel.innerHTML = '';

    // Render layers in reverse order (top layer = last in array = renders on top)
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        const isSelected = i === selectedLayerIndex;

        const layerEl = document.createElement('div');
        layerEl.className = 'layer-item' + (isSelected ? ' selected' : '');
        layerEl.onclick = (e) => {
            // Don't interfere with visibility toggle or rename input
            if (!e.target.closest('.layer-visibility') && !e.target.closest('.layer-name-input')) {
                selectLayer(i);
            }
        };

        // Visibility toggle
        const visBtn = document.createElement('button');
        visBtn.className = 'layer-visibility' + (layer.visible ? ' visible' : '');
        visBtn.innerHTML = layer.visible ? '&#128065;' : '&#128065;';
        visBtn.title = layer.visible ? 'Hide layer' : 'Show layer';
        visBtn.onclick = (e) => {
            e.stopPropagation();
            toggleLayerVisibility(i);
        };

        // Layer name - use click with timer to detect double-click
        const nameSpan = document.createElement('span');
        nameSpan.className = 'layer-name';
        nameSpan.textContent = layer.name;
        nameSpan.title = 'Double-click to rename';
        nameSpan.onclick = (e) => {
            e.stopPropagation();
            const layerIndex = i;

            // Check for double-click using timer
            if (nameSpan.clickTimer) {
                // Double-click detected
                clearTimeout(nameSpan.clickTimer);
                nameSpan.clickTimer = null;
                startLayerRename(layerIndex, nameSpan);
            } else {
                // First click - select layer and wait for potential second click
                selectedLayerIndex = layerIndex;
                updateUIFromEmitter();
                // Update visual selection without full re-render
                document.querySelectorAll('.layer-item').forEach((item, idx) => {
                    const actualIndex = layers.length - 1 - idx;
                    item.classList.toggle('selected', actualIndex === layerIndex);
                });

                nameSpan.clickTimer = setTimeout(() => {
                    nameSpan.clickTimer = null;
                }, 300);
            }
        };

        // Particle count badge
        const countBadge = document.createElement('span');
        countBadge.className = 'layer-count';
        countBadge.textContent = layer.getParticleCount();

        layerEl.appendChild(visBtn);
        layerEl.appendChild(nameSpan);
        layerEl.appendChild(countBadge);

        panel.appendChild(layerEl);
    }

    // Update layer count display
    const countEl = document.getElementById('layer-count');
    if (countEl) {
        countEl.textContent = layers.length + ' layer' + (layers.length !== 1 ? 's' : '');
    }
}

/**
 * Start inline renaming of a layer
 */
function startLayerRename(index, nameSpan) {
    const layer = layers[index];
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'layer-name-input';
    input.value = layer.name;

    input.onblur = () => {
        renameLayer(index, input.value);
    };

    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            renameLayer(index, input.value);
        } else if (e.key === 'Escape') {
            renderLayerPanel(); // Cancel
        }
    };

    nameSpan.replaceWith(input);
    input.focus();
    input.select();
}

/**
 * Update particle counts in layer panel
 */
function updateLayerCounts() {
    const items = document.querySelectorAll('.layer-item');
    const reversedLayers = [...layers].reverse();

    items.forEach((item, displayIndex) => {
        const layerIndex = layers.length - 1 - displayIndex;
        const layer = layers[layerIndex];
        if (layer) {
            const countEl = item.querySelector('.layer-count');
            if (countEl) {
                countEl.textContent = layer.getParticleCount();
            }
        }
    });
}

/**
 * Load layers from project data (handles both v1.0 and v2.0 formats)
 */
function loadLayersFromData(data) {
    layers = [];

    if (data.version === '2.0' && Array.isArray(data.layers)) {
        // v2.0 format with layers
        data.layers.forEach((layerData, index) => {
            const emitter = new Emitter();
            emitter.fromLayerData(layerData);
            if (!emitter.name) emitter.name = 'Layer ' + (index + 1);
            layers.push(emitter);
        });
    } else {
        // v1.0/v1.1 format - single layer
        const emitter = new Emitter();
        emitter.fromJSON(data);
        emitter.name = 'Layer 1';
        layers.push(emitter);
    }

    if (layers.length === 0) {
        // Fallback
        layers.push(new Emitter({ name: 'Layer 1' }));
    }

    selectedLayerIndex = 0;
    renderLayerPanel();
}

/**
 * Export all layers to v2.0 format
 */
function exportLayersToJSON() {
    return {
        version: '2.0',
        layers: layers.map(layer => layer.toLayerJSON())
    };
}

/**
 * Get total particle count across all layers
 */
function getTotalParticleCount() {
    return layers.reduce((total, layer) => total + layer.getParticleCount(), 0);
}
