import { GoogleGenAI } from '@google/genai';

// Initialize Gemini SDK with server environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { draftBullet, jobTitle } = req.body;

  if (!draftBullet) {
    return res.status(400).json({ error: 'Draft text is required.' });
  }

  try {
    const prompt = `You are an expert resume writer.
    Rephrase the following rough bullet point into 3 punchy, ATS-friendly, professional action statements.
    Job Title Context: ${jobTitle || 'Professional'}
    
    Draft Bullet: "${draftBullet}"
    
    Return strictly a JSON array of 3 string options. Example format: ["Option 1", "Option 2", "Option 3"]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const suggestions = JSON.parse(response.text);
    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate suggestions.' });
  }
}
