# 🌟 Give it a star 🌟

🧑💻 Developed by [Developer](tg://user?id=5190902724)  
📢 Updates Channel: [Private Bots](https://t.me/Private_Bots)

[![Deploy](https://img.shields.io/badge/Deploy%20To-Deno%20Deploy-blue?style=flat&logo=deno)](https://dash.deno.com/new)

---

# What is this bot for ?

- This bot host image to imgbb server and provides the direct link to that image.

---

## ⚙️ Configuration Variables

Set these environment variables before deployment:

| Variable    | Description                                                  | Required |
| ----------- | ------------------------------------------------------------ | -------- |
| `BOT_TOKEN` | Telegram Bot Token from [@BotFather](https://t.me/BotFather) | Yes      |
| `CHANNEL_USERNAME` | Make bot admin in @YourChannel and put username in env | Yes      |
| `MONGO_URI` | MongoDB Connection URL (Optional)                            | No       |

---

## 🚀 Deployment

- Give a star to this repo 😁.
- [Fork](/../../fork) this repo on GitHub.
- Create an account to https://dash.deno.com.
- After that click the image below:
  - <a href="https://dash.deno.com/new"><img src="https://img.shields.io/badge/Deployed%20on-Deno%20Deploy-blue?logo=deno" alt="Click this after forking"></img></a>
- Seek into the _Deploy your own code_ section,
- Create a project from your forked repo.
- Select `main.ts` as Entrypoint and dont add anything else for now.
- Go to the project's `Settings` tab and add the Environment Variables from [.env-example](.env-example) file. You can skip adding the optional one.
- Make any changes in your repo (_it can be any change like editing any file as adding " " (space) in a new line._) after adding Environment Variables as committing it.
- Grab the <a href="#deployment-url">deployment URL</a> from the `Overview` tab and set the webhook (mentioned below).
  - [How o set a webhook?](https://core.telegram.org/bots/api#setwebhook).
    - It's simple, In this url `https://api.telegram.org/botBOT_TOKEN/setWebhook?url=DEPLOYMENT_URL` replace "BOT_TOKEN" with your bot's token and replace DEPLOYMENT_URL with <a href="#deployment-url">deno deployed (domain) url</a>, and open that edited url in your browser. Once you see "Webhook was set", Go to your bot, it must be running.

### Deployment Url

- **_Once you set your Enviroment Variables and made any commit in your forked repo, you will see your deployment url in the project as:_**
  <br><br>

  - <img src="https://i.ibb.co/wVLwVPT/20250321-064909.png"/>

- **_MUST: ADD "https://" BEFORE THE URL_**

---

## 📋 Environment Setup

1. Get `BOT_TOKEN` from [@BotFather](https://t.me/BotFather)
2. Make a channel and make bot admin in it and put @ChannelUsername in `CHANNEL_USERNAME` env.
3. (Optional) Get MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🛠️ Commands

- `/start` - Show welcome message
- `/users` - Display total users (MongoDB required)
- Send any image - Convert to direct link

---

## 📞 Contact

[![Developer](https://img.shields.io/badge/Developer-Contact-blue?logo=telegram)](https://t.me/Prime_Hritu)  
[![Channel](https://img.shields.io/badge/Updates_Channel-Join-green?logo=telegram)](https://t.me/Private_Bots)

<p align="center">
<a href="https://www.buymeacoffee.com/hritu" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
</a>
</p>
