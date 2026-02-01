/**
 * Particle FX Designer - Save/Load
 * Standalone save/load functionality.
 * Platform integration (if any) is handled externally via adapters.
 */

/**
 * Save current project.
 * In standalone mode, this exports as a JSON file download.
 * Platform adapters may override this to save to a server.
 */
function saveProject() {
    exportJSON();
    markClean();
}

/**
 * Create a new project (reset canvas)
 */
function newProject() {
    if (isDirty) {
        if (!confirm('You have unsaved changes. Create new project anyway?')) {
            return;
        }
    }

    // Reset layers to a single default layer
    initLayers();
    updateUIFromEmitter();
    markClean();
    showToast('New project created', 'success');
}

/**
 * Save screenshot as PNG download
 */
function saveScreenshot() {
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'particle-effect.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Screenshot saved!', 'success');
}

/**
 * Save screenshot silently (no-op in standalone mode)
 */
function saveScreenshotSilently() {
    // No-op in standalone mode
}

/**
 * Share project (no-op in standalone mode)
 * Platform adapters may override this.
 */
function shareProject() {
    showToast('Share is available when using the platform', 'info');
}

/**
 * Get project data as JSON (used by platform adapters)
 */
function getProjectData() {
    return exportLayersToJSON();
}

/**
 * Load project data from JSON (used by platform adapters)
 */
function loadProjectData(data) {
    if (data) {
        loadLayersFromData(data);
        markClean();
    }
}
