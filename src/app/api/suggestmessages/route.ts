import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const gemini = new GoogleGenerativeAI(
  process.env.OPENAI_API_KEY!, // Replace with your Gemini API key
);

export const runtime = 'edge';

export async function POST() {
  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Create a list of three open-ended, engaging and juicy questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    const response = await model.generateContent([prompt]);
    // console.log(response);
    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    // console.log(text);
    if (text) {
      return NextResponse.json({ message: text });
    } else {
      return NextResponse.json({ error: 'No response from the AI model.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
  }
}