
Comparely - One Click Deploy Instructions

1. Backend Deployment (Free, No Card Needed):
--------------------------------------------------
- Go to: https://render.com/
- Create a free account
- Click "New" > "Web Service"
- Connect your GitHub (or choose deploy from repo)
- Use: https://github.com/openai-sample-projects/comparely-backend
- Use the default settings (Node, port 3000)
- Set build command: npm install
- Set start command: node index.js

2. Scheduler for Scraping:
--------------------------------------------------
- Still in Render, go to "Cron Jobs"
- Add a job to call: `https://comparely-backend.onrender.com/scrape`
- Choose daily/weekly schedule

3. Frontend Hosting (Static Site):
--------------------------------------------------
- Go to: https://www.netlify.com/
- Drop this folder (unzip first) into their drag-and-drop deploy box
- Or upload to GitHub and link the repo

Your search site will call the backend live.
