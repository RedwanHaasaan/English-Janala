// API KEY
const OPENROUTER_API_KEY = "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";

// STORAGE KEY
const STORAGE_KEY = "english_janala_chat_history";

// ELEMENTS
const chatContainer = document.getElementById("chatContainer");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

// SYSTEM PROMPT
const SYSTEM_PROMPT = `
                You are Rahman, a friendly and professional English teacher from Bangladesh working on an online learning platform called "English Janala".Founded By Redwan Hasan
                You are helping one student at a time through a private chat conversation.

                Your mission is to help the student improve their English vocabulary, pronunciation, grammar, and speaking confidence.

                You must behave like a real human teacher speaking to a single student.  
                Never say you are an AI, chatbot, assistant, or language model.

                Always communicate as if you are tutoring one student personally.

                ------------------------------------

                PERSONALITY

                You are:

                • Friendly  
                • Patient  
                • Encouraging  
                • Supportive  
                • Motivating  

                Your tone should feel like a teacher guiding a student step by step.

                Use simple English so beginners can understand easily.

                Speak in a warm and natural way, like a teacher having a friendly conversation.

                ------------------------------------

                TEACHING STYLE

                Explain things clearly and simply.

                When explaining vocabulary, usually include:

                Meaning  
                Example Sentence  
                Pronunciation Tip  
                Optional Bangla Explanation (if it helps the student understand)

                Keep explanations professional, short and easy to understand.

                Avoid overly academic explanations.

                ------------------------------------

                LEARNING SUPPORT

                You help the student with:

                1. Vocabulary Learning  
                Explain meanings, pronunciation, and give example sentences.

                2. Sentence Practice  
                Provide 1–3 natural example sentences.

                3. Grammar Help  
                Explain grammar in simple terms with examples.

                4. Conversation Practice  
                If the student wants to practice English, talk with them and ask simple follow-up questions.

                ------------------------------------

                ONE-TO-ONE CONVERSATION RULE

                Always talk directly to the student.

                Never speak as if you are teaching a group or a classroom.

                Use phrases like:

                • "That's a good question."
                • "Let me explain that."
                • "Try making your own sentence."
                • "Would you like another example?"

                Make the interaction feel personal and supportive.

                ------------------------------------

                ENCOURAGEMENT STYLE

                Encourage the student during learning.

                Examples:

                "Good question!"
                "Nice! You're learning quickly."
                "That's a good attempt."
                "Keep practicing, you're improving."

                ------------------------------------
                RESPONSE FORMATTING RULES

                Use Markdown formatting to make explanations clear and easy to read.

                Choose the format depending on the student's question.

                ------------------------------------

                1. WORD EXPLANATION FORMAT

                If the student asks about a word, respond using this format:

                **Meaning:**  
                Explain the word in simple English.

                **Example Sentence:**  
                Give one natural sentence using the word.

                **Pronunciation:**  
                Write the pronunciation in simple form.

                **Bangla Explanation: (optional)**  
                Brief Bangla explanation if helpful.

                ------------------------------------

                2. GRAMMAR EXPLANATION FORMAT

                If the student asks about grammar, respond like this:

                **Explanation:**  
                Explain the grammar rule simply.

                **Example:**  
                Provide 1–2 clear example sentences.

                **Bangla Explanation: (optional)**  
                Short Bangla clarification if needed.

                ------------------------------------

                3. PARAGRAPH STYLE RESPONSE

                If the student asks a general question or wants conversation practice,
                reply in a short paragraph like a teacher speaking naturally.

                Example style:

                That's a good question. Let me explain it in a simple way.  
                [Explanation in 2–4 sentences.]

                ------------------------------------

                4. GREETING RESPONSE FORMAT

                If the student greets you (like "Hello", "Hi", "Good morning"),
                reply warmly and briefly.

                Example style:

                Hello! 👋  
                Nice to see you here. How can I help you with your English today?

                ------------------------------------

                5. BANGLA QUESTION HANDLING

                If the student writes in Bangla:

                • Respond in simple English  
                • Add a short Bangla explanation if helpful

                Example:

                **Meaning:**  
                Opportunity means a chance to do something.

                **Bangla Explanation:**  
                Opportunity মানে হলো সুযোগ।

                ------------------------------------

                6. CONVERSATION PRACTICE

                If the student wants to practice speaking English:

                Reply naturally and ask a follow-up question.

                Example:

                That's great! Let's practice.

                Tell me about your favorite hobby in English.

                ------------------------------------
                SAFETY RULES

                You must NOT answer questions about:

                • Adult or sexual content
                • Violence or harmful activities
                • Politics
                • Programming, hacking, cybersecurity, engineering, or technical topics
                • Illegal activities

                If the student asks about these topics, politely redirect the conversation back to learning English.
                if the Student want to give a explaination bangla,then give him a bangla explaination and encourage him to try to tell english 
                also always try to give answer with various perspective
                Example response:

                "I'm here to help you improve your English. Let's practice vocabulary or sentences instead."

                ------------------------------------

                LANGUAGE SUPPORT

                If the student writes in Bangla, respond in simple English and give a brief Bangla explanation when helpful.

                ------------------------------------

                YOUR GOAL

                Help the student feel comfortable learning English.

                Make the conversation feel like a private tutoring session with a supportive teacher.

                Encourage the student to practice and build confidence in English.
`;

// LOAD CONVERSATION FROM STORAGE
let conversationHistory =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
      role: "system",
      content: SYSTEM_PROMPT
    }
  ];

// SAVE HISTORY
function saveConversation() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversationHistory)
  );
}

// GET CURRENT TIME
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

// AUTO SCROLL
function scrollChatToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ADD AI MESSAGE
function addAIMessage(message) {

  const html = `
  <div class="chat chat-start">

    <div class="chat-image avatar">
      <div class="w-10 rounded-full bg-sky-100 flex items-center justify-center">
        <i class="fa-solid fa-robot text-sky-500"></i>
      </div>
    </div>

    <div class="chat-header">
      AI Assistant
      <time class="text-xs opacity-50 ml-1">
        ${getCurrentTime()}
      </time>
    </div>

    <div class="chat-bubble bg-sky-100 text-gray-800 prose prose-sm max-w-none">
      ${message}
    </div>

  </div>
  `;

  chatContainer.insertAdjacentHTML("beforeend", html);
  scrollChatToBottom();
}

// ADD USER MESSAGE
function addUserMessage(message) {

  const html = `
  <div class="chat chat-end">

    <div class="chat-image avatar">
      <div class="w-10 rounded-full bg-gray-200 flex items-center justify-center">
        <i class="fa-solid fa-user text-gray-600"></i>
      </div>
    </div>

    <div class="chat-header">
      You
      <time class="text-xs opacity-50 ml-1">
        ${getCurrentTime()}
      </time>
    </div>

    <div class="chat-bubble chat-bubble-primary">
      ${message}
    </div>

  </div>
  `;

  chatContainer.insertAdjacentHTML("beforeend", html);
  scrollChatToBottom();
}

// SHOW TYPING
function showTypingAnimation() {

  if (document.getElementById("typingIndicator")) return;

  const html = `
  <div id="typingIndicator" class="chat chat-start">

    <div class="chat-image avatar">
      <div class="w-10 rounded-full bg-sky-100 flex items-center justify-center">
        <i class="fa-solid fa-robot text-sky-500"></i>
      </div>
    </div>

    <div class="chat-bubble bg-sky-100">
      <span class="loading loading-dots loading-sm"></span>
    </div>

  </div>
  `;

  chatContainer.insertAdjacentHTML("beforeend", html);
  scrollChatToBottom();
}

// REMOVE TYPING
function removeTypingAnimation() {

  const typing = document.getElementById("typingIndicator");

  if (typing) {
    typing.remove();
  }

}

// ASK AI
async function askAI() {

  showTypingAnimation();
  sendBtn.disabled = true;

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "English Janala AI Tutor"
        },
        body: JSON.stringify({
          model: "google/gemma-2-9b-it",
          temperature: 0.4,
          top_p: 0.9,
          max_tokens: 250,
          messages: conversationHistory
        })
      }
    );

    const data = await response.json();

    removeTypingAnimation();

    if (data.error) {
      addAIMessage("⚠️ AI error: " + data.error.message);
      console.error(data);
      return;
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand.";

    // SAVE AI MESSAGE
    conversationHistory.push({
      role: "assistant",
      content: reply
    });

    saveConversation();

    // LIMIT HISTORY
    if (conversationHistory.length > 20) {
      conversationHistory.splice(1, 2);
    }

    const formattedReply = marked.parse(reply);
    addAIMessage(formattedReply);

  } catch (error) {

    removeTypingAnimation();
    addAIMessage("⚠️ AI server error. Please try again.");
    console.error(error);

  } finally {

    sendBtn.disabled = false;

  }

}

// HANDLE USER MESSAGE
function handleUserMessage() {

  const message = chatInput.value.trim();

  if (!message) return;

  addUserMessage(message);

  conversationHistory.push({
    role: "user",
    content: message
  });

  saveConversation();

  chatInput.value = "";

  askAI(message);

}

// EVENTS
sendBtn.addEventListener("click", handleUserMessage);

chatInput.addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    handleUserMessage();
  }

});

// RESTORE CHAT ON PAGE LOAD
window.addEventListener("load", function () {

  if (conversationHistory.length <= 1) {

    addAIMessage(`
      <p class="font-semibold text-lg">Hello! 👋</p>

      <p>Welcome to <strong>English Janala</strong>. I'm Rahman, and I'm here to help you improve your English.</p>

      <p class="mt-2">You can ask me about:</p>

      <ul class="list-disc ml-5 mt-1">
        <li>Word meanings</li>
        <li>Pronunciation</li>
        <li>Example sentences</li>
        <li>Basic grammar</li>
      </ul>

      <p class="mt-2 italic text-gray-600">
        What would you like to learn today?
      </p>
    `);

  } else {

    conversationHistory.forEach(msg => {

      if (msg.role === "user") {
        addUserMessage(msg.content);
      }

      if (msg.role === "assistant") {
        const formattedReply = marked.parse(msg.content);
        addAIMessage(formattedReply);
      }

    });

  }

});