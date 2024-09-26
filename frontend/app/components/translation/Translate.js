
export const translateText = async (text, targetLanguage) => {
    const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    return data.data.translations[0].translatedText;
  };
  