import React, { useState } from 'react';
import { translateText } from '../utils/translate'; 

const TranslateComponent = () => {
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleTranslatePage = async () => {
    setLoading(true);

    const bodyText = document.body.innerText;

    try {
      // Translate the collected text dynamically based on selected language
      const translated = await translateText(bodyText, selectedLanguage);

      // Replace the visible text with the translated text
      document.body.innerText = translated;

    } catch (error) {
      console.error('Error translating page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Translate Page</h1>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="zu">Zulu</option>
        <option value="st">Sesotho</option>
        <option value="nso">Sepedi</option>
        <option value="af">Afrikaans</option>
        <option value="en">English</option>
        <option value="xh">Xhosa</option>
      </select>

      <br />
      <button onClick={handleTranslatePage}>Translate Page</button>

      {loading && <p>Translating the page...</p>}
    </div>
  );
};

export default TranslateComponent;
