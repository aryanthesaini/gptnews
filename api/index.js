import { Configuration, OpenAIApi } from 'openai';

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  })
);

export async function fetchNews() {
  const response = await openAi
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Tell me 4 positive news in brief' },
      ],
    });
  return response.data.choices[0].message.content;
}