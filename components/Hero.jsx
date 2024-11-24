'use client';
import React, { useEffect } from 'react';

let loadInterval;

function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueID() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return `
      <div class="wrapper ${isAi ? 'ai' : ''}">
        <div class="chat">
          ${
            isAi
              ? `<div class="profile"><img src="/bot.svg" alt="bot" /></div>`
              : ''
          }
          <div class="message ${isAi ? 'bot-message' : 'user-message'}" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
  }
  
  

const Hero = () => {
  useEffect(() => {
    const form = document.querySelector('form');
    const chatContainer = document.querySelector('#chat_container');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = new FormData(form);
      
        chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
      
        form.reset();
      
        // Generate unique ID for bot response
        const uniqueId = generateUniqueID();
        chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
      
        // Scroll to the bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
      
        // Start the loader for the bot's response
        const messageDiv = document.getElementById(uniqueId);
        loader(messageDiv); // Show dots while waiting for response
      
        try {
          // Send request to the server
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: data.get("prompt"),
            }),
          });
      
          clearInterval(loadInterval); // Stop the loader
          messageDiv.textContent = ""; // Clear loader dots
      
          if (response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim();
      
            // Type out the bot's response
            typeText(messageDiv, parsedData);
          } else {
            const err = await response.text();
            messageDiv.textContent = "Something went wrong";
            console.error("Server Error:", err);
          }
        } catch (error) {
          clearInterval(loadInterval); // Stop the loader on error
          messageDiv.textContent = "Something went wrong"; // Show error message
          console.error("Fetch Error:", error);
        }
      };
    

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(e);
      }
    };

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keydown', handleKeyDown);

    return () => {
      form.removeEventListener('submit', handleSubmit);
      form.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="app">
      <div id="chat_container"></div>
        <form className="chat-form">
    <textarea
        name="prompt"
        rows={1}
        placeholder="Ask ChatBot a question..."
        className="chat-input"
    ></textarea>
    <button type="submit" className="chat-send-button">
        <img src="/send.svg" alt="Send" />
    </button>
    </form>
    </div>
  );
};

export default Hero;
