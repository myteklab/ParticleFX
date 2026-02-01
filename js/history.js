/**
 * Particle FX Designer - Undo/Redo History System
 * Tracks state changes and allows stepping through history
 */

// History configuration
const MAX_HISTORY_SIZE = 50;

// History stacks
let undoStack = [];
let redoStack = [];
let isRestoringState = false;
let saveStateTimeout = null;

/**
 * Save current state to history
 * @param {string} actionName - Description of the action (for debugging)
 */
function saveState(actionName) {
    if (isRestoringState) return; // Don't save while restoring

    // Clear any pending debounced save
    if (saveStateTimeout) {
        clearTimeout(saveStateTimeout);
        saveStateTimeout = null;
    }

    // Capture current state
    const state = captureState();
    state.actionName = actionName || 'Edit';

    // Don't save if state hasn't changed
    if (undoStack.length > 0) {
        const lastState = undoStack[undoStack.length - 1];
        if (JSON.stringify(lastState.layers) === JSON.stringify(state.layers)) {
            return; // No change
        }
    }

    // Push to undo stack
    undoStack.push(state);

    // Limit stack size
    if (undoStack.length > MAX_HISTORY_SIZE) {
        undoStack.shift();
    }

    // Clear redo stack (new action invalidates redo history)
    redoStack = [];

    // Update UI
    updateHistoryButtons();
    markDirty();
}

/**
 * Save state with debounce (for slider changes)
 * @param {string} actionName - Description of the action
 * @param {number} delay - Debounce delay in ms
 */
function saveStateDebounced(actionName, delay = 500) {
    if (isRestoringState) return;

    if (saveStateTimeout) {
        clearTimeout(saveStateTimeout);
    }

    saveStateTimeout = setTimeout(() => {
        saveState(actionName);
        saveStateTimeout = null;
    }, delay);
}

/**
 * Capture current state as a serializable object
 */
function captureState() {
    return {
        layers: layers.map(layer => layer.toLayerJSON()),
        selectedLayerIndex: selectedLayerIndex,
        timestamp: Date.now()
    };
}

/**
 * Restore state from a saved snapshot
 */
function restoreState(state) {
    if (!state || !state.layers) return;

    isRestoringState = true;

    // Clear existing layers
    layers = [];

    // Recreate layers from state
    state.layers.forEach((layerData, index) => {
        const emitter = new Emitter();
        emitter.fromLayerData(layerData);
        layers.push(emitter);
    });

    // Restore selection (bounded to valid range)
    selectedLayerIndex = Math.min(
        state.selectedLayerIndex || 0,
        layers.length - 1
    );

    // Ensure at least one layer exists
    if (layers.length === 0) {
        layers.push(new Emitter({ name: 'Layer 1' }));
        selectedLayerIndex = 0;
    }

    // Update UI
    renderLayerPanel();
    updateUIFromEmitter();
    updateHistoryButtons();

    isRestoringState = false;
}

/**
 * Undo last action
 */
function undo() {
    if (undoStack.length <= 1) {
        showToast('Nothing to undo', 'info');
        return;
    }

    // Save current state to redo stack
    const currentState = undoStack.pop();
    redoStack.push(currentState);

    // Restore previous state
    const previousState = undoStack[undoStack.length - 1];
    restoreState(previousState);

    showToast('Undo: ' + (currentState.actionName || 'Edit'), 'info');
    markDirty();
}

/**
 * Redo last undone action
 */
function redo() {
    if (redoStack.length === 0) {
        showToast('Nothing to redo', 'info');
        return;
    }

    // Pop from redo stack
    const stateToRestore = redoStack.pop();

    // Push to undo stack
    undoStack.push(stateToRestore);

    // Restore state
    restoreState(stateToRestore);

    showToast('Redo: ' + (stateToRestore.actionName || 'Edit'), 'info');
    markDirty();
}

/**
 * Update undo/redo button states
 */
function updateHistoryButtons() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');

    if (undoBtn) {
        undoBtn.disabled = undoStack.length <= 1;
        undoBtn.classList.toggle('disabled', undoStack.length <= 1);
    }

    if (redoBtn) {
        redoBtn.disabled = redoStack.length === 0;
        redoBtn.classList.toggle('disabled', redoStack.length === 0);
    }
}

/**
 * Initialize history with current state
 */
function initHistory() {
    undoStack = [];
    redoStack = [];

    // Save initial state
    const initialState = captureState();
    initialState.actionName = 'Initial';
    undoStack.push(initialState);

    updateHistoryButtons();
}

/**
 * Clear history (call when loading a new project)
 */
function clearHistory() {
    undoStack = [];
    redoStack = [];
    updateHistoryButtons();
}

/**
 * Get history info for debugging
 */
function getHistoryInfo() {
    return {
        undoCount: undoStack.length,
        redoCount: redoStack.length,
        canUndo: undoStack.length > 1,
        canRedo: redoStack.length > 0
    };
}
