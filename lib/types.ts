export interface User {
  userId: string;
  walletAddress: string;
  preferredLanguage: 'en' | 'es';
  registeredState: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface RightsCard {
  cardId: string;
  state: string;
  contentHash: string;
  language: 'en' | 'es';
  mintedTxHash?: string;
  tokenURI?: string;
  content: RightsContent;
}

export interface RightsContent {
  title: string;
  sections: RightsSection[];
  scripts: Script[];
  lastUpdated: string;
}

export interface RightsSection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface Script {
  id: string;
  scenario: string;
  text: string;
  language: 'en' | 'es';
}

export interface EncounterRecord {
  recordId: string;
  userId: string;
  timestamp: string;
  filePath: string;
  shareableLink?: string;
  recordingType: 'audio' | 'video';
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface StateInfo {
  code: string;
  name: string;
  flag: string;
}

export const US_STATES: StateInfo[] = [
  { code: 'AL', name: 'Alabama', flag: '🏴󠁵󠁳󠁡󠁬󠁿' },
  { code: 'AK', name: 'Alaska', flag: '🏴󠁵󠁳󠁡󠁫󠁿' },
  { code: 'AZ', name: 'Arizona', flag: '🏴󠁵󠁳󠁡󠁺󠁿' },
  { code: 'AR', name: 'Arkansas', flag: '🏴󠁵󠁳󠁡󠁲󠁿' },
  { code: 'CA', name: 'California', flag: '🏴󠁵󠁳󠁣󠁡󠁿' },
  { code: 'CO', name: 'Colorado', flag: '🏴󠁵󠁳󠁣󠁯󠁿' },
  { code: 'CT', name: 'Connecticut', flag: '🏴󠁵󠁳󠁣󠁴󠁿' },
  { code: 'DE', name: 'Delaware', flag: '🏴󠁵󠁳󠁤󠁥󠁿' },
  { code: 'FL', name: 'Florida', flag: '🏴󠁵󠁳󠁦󠁬󠁿' },
  { code: 'GA', name: 'Georgia', flag: '🏴󠁵󠁳󠁧󠁡󠁿' },
  { code: 'HI', name: 'Hawaii', flag: '🏴󠁵󠁳󠁨󠁩󠁿' },
  { code: 'ID', name: 'Idaho', flag: '🏴󠁵󠁳󠁩󠁤󠁿' },
  { code: 'IL', name: 'Illinois', flag: '🏴󠁵󠁳󠁩󠁬󠁿' },
  { code: 'IN', name: 'Indiana', flag: '🏴󠁵󠁳󠁩󠁮󠁿' },
  { code: 'IA', name: 'Iowa', flag: '🏴󠁵󠁳󠁩󠁡󠁿' },
  { code: 'KS', name: 'Kansas', flag: '🏴󠁵󠁳󠁫󠁳󠁿' },
  { code: 'KY', name: 'Kentucky', flag: '🏴󠁵󠁳󠁫󠁹󠁿' },
  { code: 'LA', name: 'Louisiana', flag: '🏴󠁵󠁳󠁬󠁡󠁿' },
  { code: 'ME', name: 'Maine', flag: '🏴󠁵󠁳󠁭󠁥󠁿' },
  { code: 'MD', name: 'Maryland', flag: '🏴󠁵󠁳󠁭󠁤󠁿' },
  { code: 'MA', name: 'Massachusetts', flag: '🏴󠁵󠁳󠁭󠁡󠁿' },
  { code: 'MI', name: 'Michigan', flag: '🏴󠁵󠁳󠁭󠁩󠁿' },
  { code: 'MN', name: 'Minnesota', flag: '🏴󠁵󠁳󠁭󠁮󠁿' },
  { code: 'MS', name: 'Mississippi', flag: '🏴󠁵󠁳󠁭󠁳󠁿' },
  { code: 'MO', name: 'Missouri', flag: '🏴󠁵󠁳󠁭󠁯󠁿' },
  { code: 'MT', name: 'Montana', flag: '🏴󠁵󠁳󠁭󠁴󠁿' },
  { code: 'NE', name: 'Nebraska', flag: '🏴󠁵󠁳󠁮󠁥󠁿' },
  { code: 'NV', name: 'Nevada', flag: '🏴󠁵󠁳󠁮󠁶󠁿' },
  { code: 'NH', name: 'New Hampshire', flag: '🏴󠁵󠁳󠁮󠁨󠁿' },
  { code: 'NJ', name: 'New Jersey', flag: '🏴󠁵󠁳󠁮󠁪󠁿' },
  { code: 'NM', name: 'New Mexico', flag: '🏴󠁵󠁳󠁮󠁭󠁿' },
  { code: 'NY', name: 'New York', flag: '🏴󠁵󠁳󠁮󠁹󠁿' },
  { code: 'NC', name: 'North Carolina', flag: '🏴󠁵󠁳󠁮󠁣󠁿' },
  { code: 'ND', name: 'North Dakota', flag: '🏴󠁵󠁳󠁮󠁤󠁿' },
  { code: 'OH', name: 'Ohio', flag: '🏴󠁵󠁳󠁯󠁨󠁿' },
  { code: 'OK', name: 'Oklahoma', flag: '🏴󠁵󠁳󠁯󠁫󠁿' },
  { code: 'OR', name: 'Oregon', flag: '🏴󠁵󠁳󠁯󠁲󠁿' },
  { code: 'PA', name: 'Pennsylvania', flag: '🏴󠁵󠁳󠁰󠁡󠁿' },
  { code: 'RI', name: 'Rhode Island', flag: '🏴󠁵󠁳󠁲󠁩󠁿' },
  { code: 'SC', name: 'South Carolina', flag: '🏴󠁵󠁳󠁳󠁣󠁿' },
  { code: 'SD', name: 'South Dakota', flag: '🏴󠁵󠁳󠁳󠁤󠁿' },
  { code: 'TN', name: 'Tennessee', flag: '🏴󠁵󠁳󠁴󠁮󠁿' },
  { code: 'TX', name: 'Texas', flag: '🏴󠁵󠁳󠁴󠁸󠁿' },
  { code: 'UT', name: 'Utah', flag: '🏴󠁵󠁳󠁵󠁴󠁿' },
  { code: 'VT', name: 'Vermont', flag: '🏴󠁵󠁳󠁶󠁴󠁿' },
  { code: 'VA', name: 'Virginia', flag: '🏴󠁵󠁳󠁶󠁡󠁿' },
  { code: 'WA', name: 'Washington', flag: '🏴󠁵󠁳󠁷󠁡󠁿' },
  { code: 'WV', name: 'West Virginia', flag: '🏴󠁵󠁳󠁷󠁶󠁿' },
  { code: 'WI', name: 'Wisconsin', flag: '🏴󠁵󠁳󠁷󠁩󠁿' },
  { code: 'WY', name: 'Wyoming', flag: '🏴󠁵󠁳󠁷󠁹󠁿' },
];
