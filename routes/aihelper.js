const express = require('express');
const aihelperRouter = express.Router();
const auth = require("../middlewares/auth");
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: "sk-UwUhbJQFfvIIslQvIVHPxSOvP8TFXlBSFPX5d1IFQk6JWrQj", baseURL: "https://api.chatanywhere.tech/v1"});

// creat a endpoint for 

aihelperRouter.post('/api/aihelper', async (req, res) => {
    const { questions, useranswers, correctanswer, mode} = req.body;
    const grecorrectionprompt = "Please act as an teacher who is going to help the student to improve a test score by providing the explation to the question on a "+ mode +" test. I will give you a student’s response, the question for the student’s response, and the correct answer. You should not output any other letter beyond what I have asked. Please output the explanation for the student of why he/she is wrong. The response should be in Json following the following format: {\"explanation\": \"The explanation\"}";
    const prompt1 = "The student's response is as follows: ";
    const prompt2 = "The question for the student's response is as follows: ";
    const prompt3 = "The correct answer is as follows: ";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: grecorrectionprompt },{ role: "system", content: prompt1 + useranswers },{ role: "system", content: prompt2 + questions }, { role: "system", content: prompt3 + correctanswer }],
            model: "gpt-3.5-turbo",
            type: "json_object"
        });
        res.json({ completion: JSON.parse(completion.choices[0].message.content) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
);

module.exports = aihelperRouter;