import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateStateRightsContent(state: string, language: 'en' | 'es' = 'en') {
  try {
    const prompt = `Generate comprehensive legal rights information for police encounters in ${state}. 
    Include:
    1. Core constitutional rights
    2. State-specific laws and procedures
    3. What to say and what not to say
    4. Specific scripts for common scenarios (traffic stops, street encounters, home visits)
    5. Important legal precedents for ${state}
    
    Format as JSON with sections for rights, scripts, and legal notes.
    Language: ${language === 'es' ? 'Spanish' : 'English'}
    
    Ensure all information is accurate and legally sound for ${state}.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal expert specializing in constitutional rights and police encounter law. Provide accurate, state-specific legal information.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Failed to generate rights content:', error);
    throw new Error('Failed to generate legal content');
  }
}

export async function translateContent(content: string, targetLanguage: 'en' | 'es') {
  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in legal documents. Translate the following legal rights content to ${targetLanguage === 'es' ? 'Spanish' : 'English'} while maintaining legal accuracy and clarity.`
        },
        {
          role: 'user',
          content: content
        }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Failed to translate content:', error);
    throw new Error('Failed to translate content');
  }
}
