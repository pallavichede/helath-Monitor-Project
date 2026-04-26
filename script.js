// Load data from localStorage or set defaults
function loadData() {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('healthData')) || {};
    return data[today] || { steps: 0, sleep: 0 };
}

// Save data to localStorage
function saveData(steps, sleep) {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('healthData')) || {};
    data[today] = { steps: parseInt(steps) || 0, sleep: parseFloat(sleep) || 0 };
    localStorage.setItem('healthData', JSON.stringify(data));
    updateDashboard();
}

// Update progress bars and text
function updateDashboard() {
    const { steps, sleep } = loadData();
    const stepsPercent = Math.min((steps / 10000) * 100, 100);
    const sleepPercent = Math.min((sleep / 8) * 100, 100);

    document.getElementById('steps-bar').style.width = stepsPercent + '%';
    document.getElementById('steps-text').textContent = steps + ' / 10000 steps';

    document.getElementById('sleep-bar').style.width = sleepPercent + '%';
    document.getElementById('sleep-text').textContent = sleep + ' / 8 hours';
}

// Handle form submission
document.getElementById('activity-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const steps = document.getElementById('steps').value;
    const sleep = document.getElementById('sleep').value;
    saveData(steps, sleep);
    // Clear form
    document.getElementById('steps').value = '';
    document.getElementById('sleep').value = '';
});

// Initialize dashboard on load
updateDashboard();