// Enhanced chat functionality
let currentExpertType = 'General';
let currentCategory = null;
let chatHistory = [];
let isTyping = false;
let chatOpen = false;

function toggleChat() {
    const chatInterface = document.getElementById('chatInterface');
    const chatToggle = document.getElementById('chatToggle');
    
    if (!chatOpen) {
        chatInterface.style.display = 'flex';
        chatInterface.style.animation = 'slideInUp 0.3s ease-out';
        chatToggle.innerHTML = '✕';
        chatOpen = true;
        document.getElementById('chatInterface').setAttribute('aria-hidden', 'false');
        
        // Focus on input when chat opens
        setTimeout(() => {
            document.getElementById('messageInput').focus();
        }, 300);
    } else {
        chatInterface.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
            chatInterface.style.display = 'none';
            chatOpen = false;
            document.getElementById('chatInterface').setAttribute('aria-hidden', 'true');
        }, 300);
        chatToggle.innerHTML = '💬';
    }
}

function openCategoryChat(category) {
    currentExpertType = category.title;
    currentCategory = category;
    document.getElementById('chatTitle').textContent = `${category.title} Expert AI`;
    
    if (!chatOpen) {
        toggleChat();
    }
    
    const messagesDiv = document.getElementById('chatMessages');
    messagesDiv.innerHTML = `
        <div class="message ai">
            Hello! I'm your ${category.title} expert AI assistant. I specialize in:
            <br><br>• ${category.specialties.join('<br>• ')}
            <br><br>How can I help you with ${category.title.toLowerCase()}-related questions today?
        </div>
    `;
    
    chatHistory = [];
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message && !isTyping) {
        addMessage('user', message);
        chatHistory.push({ role: 'user', content: message });
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            hideTypingIndicator();
            generateAIResponse(message);
        }, 1500 + Math.random() * 1000);
    }
}

function addMessage(sender, text, isHTML = false) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (isHTML) {
        messageDiv.innerHTML = text;
    } else {
        messageDiv.textContent = text;
    }
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    isTyping = true;
    const messagesDiv = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        AI is typing
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(userMessage) {
    const responses = categoryResponses[currentExpertType] || [
        "Based on expert knowledge in this field, here's what I can tell you...",
        "That's an excellent question! Let me provide you with detailed insights...",
        "From professional experience in this area, I recommend...",
        "This is a common concern. Here's the expert perspective..."
    ];
    
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    let response = baseResponse;
    
    // Add context-aware responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
        response += " Regarding costs, this can vary significantly based on several factors...";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
        response += " The timeline for this typically depends on complexity and specific requirements...";
    } else if (lowerMessage.includes('legal') || lowerMessage.includes('law')) {
        response += " From a legal standpoint, it's important to consider compliance and regulatory requirements...";
    } else if (lowerMessage.includes('best') || lowerMessage.includes('recommend')) {
        response += " Based on expert consensus and industry standards, the best approach would be...";
    }
    
    addMessage('ai', response);
    chatHistory.push({ role: 'ai', content: response });
    
    // Randomly suggest human expert (30% chance)
    if (Math.random() > 0.7) {
        setTimeout(() => {
            const expertSuggestion = `
                Would you like me to connect you with a verified human expert for more personalized advice? 
                <br><br>
                <button class="cta-button primary" onclick="openModal('expertModal')" style="margin-top: 10px;">
                    Connect to Human Expert
                </button>
            `;
            addMessage('ai', expertSuggestion, true);
        }, 2000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function connectToExpert() {
    closeModal('expertModal');
    addMessage('ai', "🔄 Great! I'm connecting you with a verified human expert. Please hold while I find an available specialist in " + currentExpertType + "...");
    
    setTimeout(() => {
        addMessage('ai', "✅ <strong>Connected!</strong> Dr. Sarah Johnson (Human Expert) has joined the conversation. She'll be with you shortly to provide personalized consultation.");
        
        setTimeout(() => {
            addMessage('ai', "👩‍⚕️ <strong>Dr. Sarah Johnson:</strong> Hello! I'm a verified " + currentExpertType.toLowerCase() + " expert. I've reviewed your previous questions. How can I provide more detailed, personalized assistance?");
        }, 3000);
    }, 3000);
}