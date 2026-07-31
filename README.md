#  ⚡NovaAi

> **Powerful, clean, and flexible chat UI** for modern conversational AI.  
> NovaAi delivers a polished messaging experience that you can connect to **any conversational backend** — OpenAI, local models, or custom APIs.

---

<p align="center">
  <img src="https://img.shields.io/github/stars/realtushartyagi/NovaAi?style=social" alt="GitHub stars"/>
  <img src="https://img.shields.io/github/languages/top/realtushartyagi/NovaAi" alt="Top Language"/>
  <img src="https://img.shields.io/github/last-commit/realtushartyagi/NovaAi" alt="Last Commit"/>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
</p>

---

## 📖 Table of Contents
- [✨ Overview](#-overview)
- [🔥 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚡ Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [▶️ Usage](#️-usage)
- [🎨 Customization](#-customization)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## ✨ Overview
NovaAi is a **user-friendly chat interface** designed as the **front-end layer** for bot-driven experiences.  
It focuses on speed, accessibility, and delightful conversations while being **adaptable to any backend**.  

💡 Perfect for:
- AI-powered chatbots  
- Customer support systems  
- Real-time collaboration tools  
- Experimenting with OpenAI or local LLMs  

---

## 🔥 Features
✅ Conversational message list with timestamps  
✅ Rich message rendering (💬 text, 🖼 images, 🔗 links, 💻 code blocks)  
✅ History + context preservation  
✅ Typing indicators + basic presence  
✅ Light/Dark theme support 🌗  
✅ Easy API adapter to plug into any backend  
✅ Mobile responsive + accessible keyboard navigation  

---

## 🛠 Tech Stack
- **Frontend:** React (JavaScript / TypeScript)  
- **Styling:** TailwindCSS / CSS-in-JS  
- **Backend Adapter (Optional):** Node.js + Express (for API key proxying)  
- **Integrations:** OpenAI, Anthropic, local LLMs, or any chat API  

---

## ⚡ Installation
Clone the repository:
```bash
git clone https://github.com/realtushartyagi/NovaAi.git
cd NovaAi


Install:
```bash
npm install
# or using yarn
yarn install
```

Configuration
-------------
Add environment variables for the chat backend (example .env):
```
REACT_APP_CHAT_API_URL=http://localhost:3000/api/chat
REACT_APP_API_KEY=your_api_key_here
```

If you plan to call a vendor API from the client, consider creating a small backend to keep keys secret:
```bash
# example: simple express proxy
POST /api/chat -> forwards request to external provider using server-side API key
```

Usage
-----
Start the development server:
```bash
npm start
# or
yarn start
```

Open http://localhost:3000 in your browser and interact with the chat UI. Connect it to your backend by updating the API URL in the environment variables.

Customization
-------------
- To change themes: edit src/styles or theme provider
- To add new message types: extend MessageRenderer and message components
- To swap backend providers: implement a new adapter that conforms to the ChatAdapter interface (see /src/adapters)

Contributing
------------
We love contributions! To contribute:
1. Fork the repo
2. Create a topic branch
3. Submit a PR and describe your change clearly

Please follow the existing code style and add tests where reasonable.

License
-------
MIT License — see LICENSE for details.

Contact
-------
If you’d like help integrating NovaAi into your project or want to submit ideas, open an issue or PR. Maintained by realtushartyagi. Enjoy building!
Built by realtushartyagi — feel free to open issues, feature requests, or PRs. Thank you for checking out NovaAi!
