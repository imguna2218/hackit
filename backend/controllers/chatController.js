// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatMessage from "../models/chatModel.js";
const genAI = new GoogleGenerativeAI('AIzaSyAQeXL5RJU5_UFyslqjT-mGGHyl-Vh2-4I');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getPrompt = async (req, res) => {
  try {

    const prompt = req.body;
    console.log(prompt);
    const user = req.user
    const result = await model.generateContent(prompt.prompt);
    const chat = new ChatMessage({
      sender: user.id,
      prompt: prompt.prompt,
      response: result.response.text(),
      timestamp: new Date(),
    })
    await chat.save();
    console.log("response saved", chat)
    console.log(result);
    console.log(result.response.text());
    console.log("jhbjh", result.response.text())
    const messages = await ChatMessage.find(
      { sender: user.id }
    ).sort({ timestamp: 1 });
    res.json(messages);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' });
  }
}

const saveMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;

    const newMessage = new ChatMessage({
      sender,
      message,
    });

    await newMessage.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve chat history
const getChatHistory = async (req, res) => {
  try {
    const user = req.user;
    const messages = await ChatMessage.find(
      { sender: user.id }
    ).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getPrompt, getChatHistory, saveMessage };