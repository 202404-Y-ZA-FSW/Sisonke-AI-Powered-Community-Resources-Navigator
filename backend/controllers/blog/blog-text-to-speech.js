const googleTTS = require("google-tts-api");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const AUDIO_DIR = path.join(__dirname, "../../../frontend/app/audio/");

exports.convertToSpeech = async (req, res) => {
  try {
    const { text, language = "en", slow = false } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (text.length > 200) {
      return res
        .status(400)
        .json({ error: "Text must be 200 characters or less" });
    }

    // Ensure the audio directory exists
    await fs.mkdir(AUDIO_DIR, { recursive: true });

    const fileName = `${uuidv4()}.mp3`;
    const filePath = path.join(AUDIO_DIR, fileName);

    // Get the audio URL
    const url = googleTTS.getAudioUrl(text, {
      lang: language,
      slow: slow,
      host: "https://translate.google.com",
    });

    // Download and save the audio file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const audioUrl = `/audio/${fileName}`;

    res.json({
      success: true,
      message: "Audio generated successfully",
      audioUrl: audioUrl,
      text: text,
      language: language,
      slow: slow,
    });
  } catch (error) {
    console.error("Error in text-to-speech conversion:", error);
    res.status(500).json({
      success: false,
      error: "Error in text-to-speech conversion",
      details: error.message,
    });
  }
};
