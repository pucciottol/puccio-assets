// js/config.js
// Sostituisci {SCRIPT_ID} con il tuo ID reale e assicurati che l'URL sia corretto
const BACKEND_URL = 'https://script.google.com/macros/s/{SCRIPT_ID}/exec';

const API_CONFIG = {
  CHECK_ELIGIBILITY: 'checkEligibility',
  SAVE_QUIZ: 'saveQuiz',
  SAVE_WHEEL_RESULT: 'saveWheelResult',
  GET_USER_DATA: 'getUserData'
};

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

async function callBackend(action, data = {}) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...data, timestamp: new Date().toISOString() })
    });
    return await response.json();
  } catch (e) {
    console.error('Backend call failed:', e);
    return { error: 'Impossibile contattare il server' };
  }
}
