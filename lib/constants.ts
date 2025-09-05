export const APP_CONFIG = {
  name: 'KnowYourRights Cards',
  version: '1.0.0',
  description: 'Your pocket guide to legal rights during police encounters.',
  supportEmail: 'support@knowyourrights.cards',
  maxRecordingDuration: 300000, // 5 minutes in milliseconds
  maxEmergencyContacts: 5,
};

export const STORAGE_KEYS = {
  selectedState: 'kyr_selected_state',
  language: 'kyr_language',
  emergencyContacts: 'kyr_emergency_contacts',
  offlineCards: 'kyr_offline_cards',
  userPreferences: 'kyr_user_preferences',
};

export const API_ENDPOINTS = {
  generateContent: '/api/generate-content',
  mintCard: '/api/mint-card',
  saveRecord: '/api/save-record',
  sendAlert: '/api/send-alert',
  uploadToIPFS: '/api/upload-ipfs',
};

export const RECORDING_CONFIG = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'environment',
  },
};

export const EMERGENCY_ALERT_TEMPLATE = {
  en: {
    subject: 'Emergency Alert - Police Encounter',
    message: 'I am currently in a police encounter at {location}. This is an automated alert from KnowYourRights Cards. Time: {timestamp}',
  },
  es: {
    subject: 'Alerta de Emergencia - Encuentro Policial',
    message: 'Actualmente estoy en un encuentro policial en {location}. Esta es una alerta automática de KnowYourRights Cards. Hora: {timestamp}',
  },
};

export const DEFAULT_RIGHTS_CONTENT = {
  en: {
    title: 'Your Rights During Police Encounters',
    sections: [
      {
        id: 'core-rights',
        title: 'Core Rights',
        content: 'You have the right to remain silent. You have the right to refuse searches. You have the right to leave if not detained.',
        icon: 'shield',
      },
      {
        id: 'what-to-say',
        title: 'What to Say',
        content: 'Am I free to leave? I invoke my right to remain silent. I do not consent to any searches.',
        icon: 'message-circle',
      },
      {
        id: 'what-not-to-say',
        title: 'What NOT to Say',
        content: 'Do not resist physically. Do not argue or become confrontational. Do not provide false information.',
        icon: 'x-circle',
      },
    ],
  },
  es: {
    title: 'Sus Derechos Durante Encuentros Policiales',
    sections: [
      {
        id: 'core-rights',
        title: 'Derechos Fundamentales',
        content: 'Tiene derecho a permanecer en silencio. Tiene derecho a rechazar registros. Tiene derecho a irse si no está detenido.',
        icon: 'shield',
      },
      {
        id: 'what-to-say',
        title: 'Qué Decir',
        content: '¿Soy libre de irme? Invoco mi derecho a permanecer en silencio. No consiento ningún registro.',
        icon: 'message-circle',
      },
      {
        id: 'what-not-to-say',
        title: 'Qué NO Decir',
        content: 'No resista físicamente. No discuta o se vuelva confrontativo. No proporcione información falsa.',
        icon: 'x-circle',
      },
    ],
  },
};
