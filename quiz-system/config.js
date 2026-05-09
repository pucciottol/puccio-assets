// Configuration for PuccioQuiz System
// Replace with your Google Apps Script Web App URL
const BACKEND_URL = 'https://script.google.com/macros/d/{SCRIPT_ID}/usercss=AKfycby...'; // Update this

const API_CONFIG = {
  CHECK_ELIGIBILITY: 'checkEligibility',
  SAVE_QUIZ: 'saveQuiz',
  SAVE_WHEEL_RESULT: 'saveWheelResult',
  GET_USER_DATA: 'getUserData'
};

// Helper function to get user's IP (via ipify)
async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (e) {
    console.warn('Could not fetch IP:', e);
    return 'unknown';
  }
}

// Call backend
async function callBackend(action, data = {}) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action,
        ...data,
        timestamp: new Date().toISOString()
      })
    });
    return await response.json();
  } catch (e) {
    console.error('Backend call failed:', e);
    return { error: 'Impossibile contattare il server' };
  }
}
