// "use strict";
const Insta = require('@androz2091/insta.js');
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const client = new Insta.Client();
client.on("connected", () => {
  console.log(`Logged in as ${client.user.username}`);
});
const configuration = new Configuration({
  apiKey: process.env.SECRET_KEY,
});
const USERNAME =process.env.USER_NAME;
const PASSWORD =process.env.PASS_WORD;

const openai = new OpenAIApi(configuration);
async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 200,
  });
  return completion.data.choices[0].text;
}
client.on("messageCreate", (message) => {
  try {
    if (message.author.id === client.user.id) return;
    // message.markSeen();
    if (message.content === undefined) {
      message.reply("[🤖BOT🤖] : ❤THANKYOU FOR SENDING..💖");
    } else if (
      message.content.toLowerCase() === "hii" ||
      message.content.toLowerCase() === "hello" ||
      message.content.toLowerCase() === "hlo" ||
      message.content.toLowerCase() === "hi" ||
      message.content.toLowerCase() === "hlw" ||
      message.content.toLowerCase() === "hloo" ||
      message.content.toLowerCase() === "hola" ||
      message.content.toLowerCase() === "." 
  
    ) {
      message.reply(
        "[🤖BOT🤖] : Hello i am AI bot from openAi, the user Md_taqui_imam is currently 'OFFLINE' but reply  will get you as soon as possible... "
      );
    }else if(message.content.toLowerCase() === "allah hafiz" ||
     message.content.toLowerCase() === "allah hafz" ||
     message.content.toLowerCase() === "byy" ||
     message.content.toLowerCase() === "byyy" ||
     message.content.toLowerCase() === "by" ||
     message.content.toLowerCase() === "khuda hafiz"   
     ){
      message.reply(
        `[🤖BOT🤖] : I will reply soon...
        Have a nice day 💖✨
        ${message.content}` 
      )
    }else {
      runCompletion(message.content).then((result) => {
        message.reply(`[🤖BOT🤖] :
             ${result}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
});


client.login(USERNAME,PASSWORD);


