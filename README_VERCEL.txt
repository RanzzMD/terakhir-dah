
# Deploy to Vercel (Frontend + Telegram Function)

## What you have
- Static frontend: `index.html`, `styles.css`, `app.js`
- Serverless function: `api/telegram.js` (Node 18)
- Config: `vercel.json`, `package.json`

## Steps
1) **Import repo to Vercel** (or drag-and-drop these files in the Vercel dashboard).
2) Go to **Project Settings → Environment Variables**, add:
   - `BOT_TOKEN` = your Telegram bot token (from @BotFather)
   - `CHAT_ID`  = your chat / group ID
3) **Deploy**. The frontend will be served from root, and the function at `/api/telegram`.
4) Open your site and submit the form — you should receive a Telegram message.

> Notes
- The frontend already posts to `/api/telegram` via `fetch` inside `app.js`.
- If you have CORS issues when testing locally with `vercel dev`, keep both frontend and API in the same project (as here).
- Attachments are not sent; to send files, first upload them to storage and include a link in the Telegram message.
