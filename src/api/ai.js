import axios from 'axios';

export const getAIDraft = async (title) => {
  // 실제 구현 시에는 본인의 OpenAI API 키를 환경변수로 관리하세요.
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `'${title}'이라는 제목으로 블로그 포스트 초안을 작성해줘.` }],
    },
    {
      headers: { Authorization: `Bearer YOUR_OPENAI_API_KEY` }
    }
  );
  return response.data.choices[0].message.content;
};