import express from "express";

import fetch from "node-fetch";

import dotenv from "dotenv";

import cors from "cors";

dotenv.config();

const app = express();

// Enable CORS for ALL origins (simple)

app.use(cors());

app.use(express.json());

app.post("/chat", async (req, res) => {

try {

const userMessage = req.body.message;

const response = await fetch("https://api.openai.com/v1/chat/completions", {

method: "POST",

headers: {

"Authorization": `Bearer ${process.env.OPENAI_KEY}`,

"Content-Type": "application/json"

},

body: JSON.stringify({

model: "gpt-4o-mini",

messages: [

{ role: "user", content: userMessage }

]

})

});

const data = await response.json();

res.json(data);

} catch (err) {

res.status(500).json({ error: "Server error", details: err.message });

}

});
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));