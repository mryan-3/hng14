/**
 * HNG Stage 1B - Profile Card Logic
 * Handles real-time UTC update in milliseconds
 */

document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.querySelector('[data-testid="test-user-time"]');

    /**
     * Updates the text content of the time display with the current epoch time.
     */
    function updateTime() {
        if (timeDisplay) {
            timeDisplay.textContent = Date.now().toString();
        }
    }

    // Initial update
    updateTime();

    // Refresh time every 1000ms as per instructions suggesting a "reasonable" 500–1000ms interval.
    setInterval(updateTime, 1000);
});
