# English Janala (ইংরেজি জানালা)

> **A single-page Ed-Tech web app for learning English vocabulary—with structured lessons, pronunciation, and an AI tutor—built with modern front-end tools and public APIs.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Overview

**English Janala** (“English Window”) is an interactive, responsive web application designed to help learners—especially Bengali speakers—improve their English vocabulary through:

- **Structured lessons** loaded from a public API  
- **Word cards** with meaning, pronunciation, and one-tap audio  
- **Detailed word view** (parts of speech, example sentences, synonyms) in a modal  
- **AI-powered chat tutor** (Google Gemini) for vocabulary questions, grammar, and practice  
- **Persistent chat history** in the browser for continuity  
- **FAQ** and a clear, mobile-friendly layout  

The project demonstrates **clean separation of concerns** (HTML structure, Tailwind/DaisyUI for UI, vanilla JS for logic and APIs), **API integration**, **accessibility-minded markup**, and **responsive design**—suitable for portfolios and technical discussions with recruiters.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Lesson-based vocabulary** | Choose a lesson (e.g. Lesson 1, 2, …); words for that level load from the API. |
| **Word cards** | Each word is shown with meaning and pronunciation; **Info** opens full details, **Volume** triggers text-to-speech. |
| **Word detail modal** | Meaning, part of speech, example sentence, and synonyms in a focused modal. |
| **AI tutor chat** | Chat with an AI (Gemini) that acts as an English tutor: vocabulary, sentences, grammar, and conversation practice. |
| **Chat history** | Conversation is saved in `localStorage` and can be restored on revisit. |
| **Responsive UI** | Navbar, hero, cards, chat, and FAQ work on mobile, tablet, and desktop. |
| **FAQ section** | Accordion-style answers to common questions about the platform. |
| **Bilingual touch** | Bengali (e.g. “জানালা”, “ইংরেজি শিখুন সহজে”) alongside English for a familiar feel. |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Markup** | HTML5 (semantic sections, ARIA-friendly structure) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (CDN), [DaisyUI 5](https://daisyui.com/) |
| **Fonts** | [Poppins](https://fonts.google.com/specimen/Poppins), [Hind Siliguri](https://fonts.google.com/specimen/Hind+Siliguri) (Google Fonts) |
| **Icons** | [Font Awesome 7](https://fontawesome.com/) |
| **Logic** | Vanilla JavaScript (ES6+), ES modules for the AI script |
| **APIs** | [Programming Hero Open API](https://github.com/Programming-Hero-Web-Course4/open-api-programming-hero) (lessons & words), [Google Gemini API](https://ai.google.dev/) (AI chat) |
| **Browser APIs** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (pronunciation), `localStorage` (chat history) |
| **Other** | [marked](https://github.com/markedjs/marked) (optional, for rich AI replies), [ldrs](https://github.com/loadingio/ldrs) (loading spinner) |

---

## 📁 Project Structure

```text
Practice Project-4[HTML,Tailwind,Daisy,JS,API]/
├── index.html          # Single-page app: hero, learn section, AI chat, FAQ, footer
├── README.md            # This file
├── js/
│   ├── main.js          # Lessons & words: fetch levels/words, render cards, pronunciation, word detail modal
│   └── aiAssistant.js   # AI chat: Gemini client, chat UI, localStorage persistence (ES module)
├── style/
│   └── style.css        # Tailwind import, base styles, Hind Siliguri utility
└── assets/              # Images (e.g. logo, hero, alert-error)
```

---

## 🚀 Getting Started

### Prerequisites

- A modern browser (Chrome, Edge, Firefox, Safari) with JavaScript enabled.
- (Optional) A [Google AI Studio](https://aistudio.google.com/) API key if you want to use the AI chat.

### Run locally

1. **Clone or download** the repo and open the project folder.
2. **Serve the folder** over HTTP (to avoid CORS issues with modules):
   - **VS Code:** Use the “Live Server” extension and “Go Live.”
   - **Node:** e.g. `npx serve .` or `npx live-server .`
   - **Python:** `python -m http.server 8000` then open `http://localhost:8000`.
3. Open the app in the browser (e.g. `http://127.0.0.1:5500` or `http://localhost:8000`).

### Using the AI chat

- The AI script in `js/aiAssistant.js` uses the **Google Generative AI** SDK (ESM) and expects an API key.
- Replace the placeholder/key in `aiAssistant.js` with your own Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
- **Security note:** In production, the API key should not be in front-end code; use a backend proxy.

---

## 🔌 APIs Used

| Source | Purpose |
|--------|---------|
| **Programming Hero Open API** | `GET` levels list; `GET` words by level; `GET` word by ID (meaning, pronunciation, parts of speech, sentence, synonyms). |
| **Google Gemini** | Generate conversational responses for the in-app AI English tutor. |
| **Web Speech API** | `SpeechSynthesisUtterance` for pronunciation of words in the Learn section. |

---

## 📄 License & Attribution

- **Programming Hero Open API** is used for educational/content data; see [Programming Hero](https://www.programming-hero.com/) for their terms.
- **Google Gemini** is subject to [Google AI terms and quotas](https://ai.google.dev/gemini-api/docs).
- Project code in this repo is for portfolio/learning use.

---

## 👤 Author

Built with a focus on **clear structure**, **real API integration**, and **user experience**—suitable for learners and as a portfolio piece for front-end and full-stack roles.

**Redwan Hasan**  
*English Janala — ইংরেজি শিখুন সহজে*
