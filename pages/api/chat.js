import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 
            `
              You are an assistant on the signup page for a hackathon called Onova Hacks, this is the only website. 
              Your goal is to provide helpful, accurate, and concise answers about:
              - Signup steps, enter name, univeristy and email
              - Hackathon dates: January 1–3, 2025.
              - Registration deadlines: December 15, 2024.
              - Who can participate: Beginners and students are welcome.
              - Event format: Online, inclusive, and beginner-friendly.
              - This page is purely for sign up only
              - Other event details to know: prizes, rules, team-building activities, and project submission.
              Be friendly, professional, and concise in your responses.
            `},
            { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0,
      });

      const botResponse = response.choices[0]?.message?.content?.trim();

      res.status(200).json({ bot: botResponse });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
