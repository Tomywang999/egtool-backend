const express = require('express');
const aigradingRouter = express.Router();
const auth = require("../middlewares/auth");
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: "sk-UwUhbJQFfvIIslQvIVHPxSOvP8TFXlBSFPX5d1IFQk6JWrQj", baseURL: "https://api.chatanywhere.tech/v1"});

// create a gre api endpoint as folling the same structure as the toefl
aigradingRouter.post('/api/grecorrection', async (req, res) => {
    const { questions, useranswers} = req.body;
    const grecorrectionprompt = "Please act as an English teacher and improver. I will give you a student’s writing and the essay prompt for that writing. You should not output any other letter beyond what I have asked. Please output a grade of this essay from 1 to 6. 1 means the essay is very poor, 2 means the essay is poor, 3 means the essay is average, 4 means the essay is good, 5 means the essay is excellent, and 6 means the essay is perfect. And a perfect essay sample. And feedback for the student. The response should be in Json following the following format: {\"grade\": 3, \"sample\": \"The sample essay\", \"feedback\": \"The feedback\"}";
    const prompt1 = "The student’s writing is as follows: ";
    const prompt2 = "The essay prompt for that writing is as follows: ";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: grecorrectionprompt },{ role: "system", content: prompt1 + useranswers },{ role: "system", content: prompt2 + questions }],
            model: "gpt-3.5-turbo",
            type: "json_object"
        });
        res.json({ completion: JSON.parse(completion.choices[0].message.content) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
);

// create a ielts api endpoint as folling the same structure as the toefl
aigradingRouter.post('/api/ieltscorrection', async (req, res) => {
    const { questions, useranswers} = req.body;
    const ieltscorrectionprompt = "Please act as an English teacher and improver. I will give you a student’s writing and the essay prompt for that writing. You should not output any other letter beyond what I have asked. Please output a grade of this essay from 1 to 9. 1 means the essay is very poor, 2 means the essay is poor, 3 means the essay is average, 4 means the essay is good, 5 means the essay is excellent, 6 means the essay is perfect, 7 means the essay is very good, 8 means the essay is very excellent, and 9 means the essay is very perfect. And a perfect essay sample. And feedback for the student. The response should be in Json following the following format: {\"grade\": 3, \"sample\": \"The sample essay\", \"feedback\": \"The feedback\"}";
    const prompt1 = "The student’s writing is as follows: ";
    const prompt2 = "The essay prompt for that writing is as follows: ";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: ieltscorrectionprompt },{ role: "system", content: prompt1 + useranswers },{ role: "system", content: prompt2 + questions }],
            model: "gpt-3.5-turbo",
            type: "json_object"
        });
        res.json({ completion: JSON.parse(completion.choices[0].message.content) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
);

// crrate a toefl api endpoint as folling the same structure as the toefl
aigradingRouter.post('/api/toeflcorrection', async (req, res) => {
    const { questions, useranswers} = req.body;
    const toeflcorrectionprompt = "Please act as an English teacher and improver. I will give you a student’s writing and the essay prompt for that writing. You should not output any other letter beyond what I have asked. Please output a grade of this essay from 1 to 5. 0 means the essay is very poor, 1 means the essay is poor, 2 means the essay is average, 3 means the essay is good, 4 means the essay is excellent, 5 means the essay is perfect. And a perfect essay sample. And feedback for the student. The response should be in Json following the following format: {\"grade\": 3, \"sample\": \"The sample essay\", \"feedback\": \"The feedback\"}";
    const prompt1 = "The student’s writing is as follows: ";
    const prompt2 = "The essay prompt for that writing is as follows: ";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: toeflcorrectionprompt },{ role: "system", content: prompt1 + useranswers },{ role: "system", content: prompt2 + questions }],
            model: "gpt-3.5-turbo",
            type: "json_object"
        });
        res.json({ completion: JSON.parse(completion.choices[0].message.content) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
);

aigradingRouter.post('/api/toeflreadingdetail', async (req, res) => {
    const { language, reading} = req.body;
    const toeflreadingdetailprompt = "Please act as an English teacher and improver. I will give you an English reading article. I want you to create a List of vocabulary words that might be difficult for an ESL reader and include their definition in " + language + ". I want you to create a summary for each paragraph of this article, be sure to be clear and follow the article. The response should be JSON format like this example: {\"vocabulary\": [{\"word\": \"word\", \"definition\": \"definition\"}], \"summary\": [{\"paragraph\": \"paragraph\", \"summary\": \"summary\"}]}";
    const phase1 = "The reading is as follows: ";
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: toeflreadingdetailprompt },{ role: "system", content: phase1 + reading }],
            model: "gpt-3.5-turbo",
            type: "json_object"
        });
        res.json({ completion: JSON.parse(completion.choices[0].message.content) });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = aigradingRouter;
