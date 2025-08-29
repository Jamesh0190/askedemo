// Expert categories data with enhanced information
const categories = [
    { 
        icon: '⚖️', 
        title: 'Legal', 
        description: 'Legal advice, contracts, litigation, and consultation', 
        experts: '2,847',
        specialties: ['Contract Law', 'Personal Injury', 'Criminal Defense', 'Corporate Law']
    },
    { 
        icon: '🏥', 
        title: 'Medical', 
        description: 'Health advice, diagnosis, treatment, and wellness', 
        experts: '3,421',
        specialties: ['General Medicine', 'Cardiology', 'Dermatology', 'Mental Health']
    },
    { 
        icon: '💰', 
        title: 'Finance', 
        description: 'Investment, taxes, financial planning, and wealth management', 
        experts: '1,956',
        specialties: ['Investment Planning', 'Tax Advisory', 'Retirement Planning', 'Insurance']
    },
    { 
        icon: '🏠', 
        title: 'Real Estate', 
        description: 'Property advice, market insights, and investment guidance', 
        experts: '1,234',
        specialties: ['Residential Sales', 'Commercial Real Estate', 'Property Management', 'Investment']
    },
    { 
        icon: '💻', 
        title: 'Technology', 
        description: 'IT support, development, cybersecurity, and tech consulting', 
        experts: '4,567',
        specialties: ['Software Development', 'Cybersecurity', 'Cloud Computing', 'AI/ML']
    },
    { 
        icon: '🎨', 
        title: 'Design', 
        description: 'Creative design, branding, UI/UX, and artistic consultation', 
        experts: '892',
        specialties: ['Graphic Design', 'UI/UX Design', 'Brand Strategy', 'Web Design']
    },
    { 
        icon: '🏢', 
        title: 'Business', 
        description: 'Strategy, marketing, entrepreneurship, and management', 
        experts: '2,145',
        specialties: ['Business Strategy', 'Marketing', 'Operations', 'Leadership']
    },
    { 
        icon: '🎓', 
        title: 'Education', 
        description: 'Academic support, career guidance, and learning strategies', 
        experts: '1,678',
        specialties: ['Academic Tutoring', 'Career Counseling', 'Test Prep', 'Skills Training']
    },
    { 
        icon: '🔧', 
        title: 'Engineering', 
        description: 'Technical solutions, project consulting, and innovation', 
        experts: '987',
        specialties: ['Civil Engineering', 'Mechanical Engineering', 'Software Engineering', 'Electrical']
    },
    { 
        icon: '🌱', 
        title: 'Environment', 
        description: 'Sustainability, environmental consulting, and green solutions', 
        experts: '543',
        specialties: ['Sustainability', 'Environmental Law', 'Green Technology', 'Climate Change']
    },
    { 
        icon: '💊', 
        title: 'Pharmacy', 
        description: 'Medication advice, drug interactions, and pharmaceutical guidance', 
        experts: '756',
        specialties: ['Clinical Pharmacy', 'Drug Information', 'Pharmacovigilance', 'Compounding']
    },
    { 
        icon: '🚗', 
        title: 'Automotive', 
        description: 'Car maintenance, automotive expertise, and vehicle consultation', 
        experts: '1,089',
        specialties: ['Auto Repair', 'Vehicle Inspection', 'Performance Tuning', 'Classic Cars']
    }
];

// Features data
const features = [
    { icon: '🤖', title: 'AI-Powered Expertise', description: 'Get instant, accurate answers powered by advanced AI trained on expert knowledge from every field' },
    { icon: '👥', title: 'Human Expert Network', description: 'Connect with verified professionals when you need personalized human insight and consultation' },
    { icon: '⚡', title: '24/7 Availability', description: 'Expert knowledge available anytime, anywhere, at your convenience - never wait for answers' },
    { icon: '🔒', title: 'Secure & Private', description: 'Your conversations and data are protected with enterprise-grade security and encryption' },
    { icon: '📊', title: 'Smart Analytics', description: 'Track your consultation history and get personalized recommendations for better decisions' },
    { icon: '🌍', title: 'Global Access', description: 'Access experts from around the world with multi-language support and cultural awareness' }
];

// Pricing data
const pricingPlans = [
    {
        name: 'Free',
        price: '$0',
        subtitle: 'Perfect for getting started',
        features: ['5 AI consultations per day', 'Basic expert categories', 'Email support', 'Community forum access'],
        buttonText: 'Get Started Free',
        featured: false
    },
    {
        name: 'Professional',
        price: '$29',
        subtitle: 'Most popular choice',
        features: ['Unlimited AI consultations', 'All expert categories', '5 human expert sessions', 'Priority support', 'Document analysis', 'Advanced analytics'],
        buttonText: 'Start Pro Trial',
        featured: true
    },
    {
        name: 'Enterprise',
        price: '$99',
        subtitle: 'For businesses and teams',
        features: ['Everything in Professional', 'Unlimited human experts', 'Team collaboration tools', 'Custom integrations', 'Dedicated account manager', 'White-label options'],
        buttonText: 'Contact Sales',
        featured: false
    }
];

// Enhanced AI responses based on categories
const categoryResponses = {
    'Legal': [
        "Based on legal precedent and current regulations, here's what you need to know...",
        "From a legal perspective, this situation requires careful consideration of...",
        "According to current legal standards and best practices...",
        "This is a common legal question. Let me break down the key points..."
    ],
    'Medical': [
        "From a medical standpoint, these symptoms could indicate...",
        "Based on current medical literature and guidelines...",
        "This is an important health concern. Here's what the medical community recommends...",
        "Medical experts generally agree that in cases like this..."
    ],
    'Finance': [
        "From a financial planning perspective, here's what I recommend...",
        "Based on current market conditions and financial best practices...",
        "This is a smart financial question. Here's how experts typically approach it...",
        "According to financial advisors and market analysis..."
    ],
    'Technology': [
        "From a technical perspective, the best approach would be...",
        "Based on current technology trends and best practices...",
        "This is a common tech challenge. Here's the recommended solution...",
        "According to industry standards and technical documentation..."
    ]
};

// Enhanced category population with animations
function populateCategories() {
    const grid = document.getElementById('categoryGrid');
    categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.onclick = () => openCategoryChat(category);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Consult with ${category.title} experts`);
        
        card.innerHTML = `
            <span class="category-icon" aria-hidden="true">${category.icon}</span>
            <h3>${category.title}</h3>
            <p>${category.description}</p>
            <div style="margin-top: 15px;">
                <span class="expert-count">${category.experts} experts available</span>
                <div style="font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 5px;">
                    ${category.specialties.slice(0, 2).join(' • ')}
                </div>
            </div>
        `;
        
        // Add entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Add keyboard support
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                openCategoryChat(category);
            }
        });
        
        grid.appendChild(card);
    });
}

// Populate features
function populateFeatures() {
    const grid = document.querySelector('.features-grid');
    features.forEach((feature, index) => {
        const item = document.createElement('div');
        item.className = 'feature-item';
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.innerHTML = `
            <div class="feature-icon" aria-hidden="true">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        
        grid.appendChild(item);
    });
}

// Populate pricing
function populatePricing() {
    const grid = document.querySelector('.pricing-grid');
    pricingPlans.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = `pricing-card ${plan.featured ? 'featured' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const featuresList = plan.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        card.innerHTML = `
            <h3>${plan.name}</h3>
            <div class="price">${plan.price}<span style="font-size: 1rem;">/month</span></div>
            <div class="price-subtitle">${plan.subtitle}</div>
            <ul class="features-list">
                ${featuresList}
            </ul>
            <button class="cta-button ${plan.featured ? 'primary' : 'secondary'}" onclick="openModal('authModal')" style="width: 100%;">
                ${plan.buttonText}
            </button>
        `;
        
        grid.appendChild(card);
    });
}

function initiateSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Smart category detection
        let detectedCategory = detectCategory(query);
        
        openCategoryChat(detectedCategory);
        addMessage('user', query);
        setTimeout(() => generateAIResponse(query), 1000);
        searchInput.value = '';
    } else {
        // Show error if search is empty
        searchInput.focus();
        searchInput.placeholder = "Please enter what you need help with...";
        setTimeout(() => {
            searchInput.placeholder = "What do you need help with today?";
        }, 2000);
    }
}

function detectCategory(query) {
    const keywords = {
        'Legal': ['law', 'legal', 'contract', 'court', 'attorney', 'sue', 'lawyer', 'rights', 'lawsuit'],
        'Medical': ['health', 'doctor', 'medical', 'symptom', 'disease', 'treatment', 'pain', 'medicine', 'sick'],
        'Finance': ['money', 'investment', 'tax', 'finance', 'budget', 'loan', 'bank', 'credit', 'debt'],
        'Technology': ['tech', 'computer', 'software', 'programming', 'IT', 'website', 'app', 'digital', 'code'],
        'Real Estate': ['house', 'property', 'real estate', 'mortgage', 'rent', 'buy', 'sell', 'home'],
        'Business': ['business', 'marketing', 'startup', 'company', 'strategy', 'sales', 'entrepreneur'],
        'Design': ['design', 'creative', 'art', 'logo', 'brand', 'visual', 'graphics', 'ui', 'ux'],
        'Education': ['education', 'learn', 'study', 'school', 'course', 'degree', 'career', 'job'],
        'Engineering': ['engineering', 'technical', 'build', 'structure', 'system', 'mechanical', 'civil'],
        'Automotive': ['car', 'auto', 'vehicle', 'repair', 'engine', 'driving', 'mechanic']
    };
    
    const lowerQuery = query.toLowerCase();
    let bestMatch = { category: categories[0], score: 0 };
    
    for (const [category, words] of Object.entries(keywords)) {
        const score = words.filter(word => lowerQuery.includes(word)).length;
        if (score > bestMatch.score) {
            bestMatch = { category: categories.find(cat => cat.title === category) || categories[0], score };
        }
    }
    
    return bestMatch.category;
}

// Enhanced modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    modal.style.animation = 'fadeIn 0.3s ease-out';
    modal.setAttribute('aria-hidden', 'false');
    
    // Trap focus inside modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length) {
        focusableElements[0].focus();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }, 300);
}

// Form handlers
function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate signup process
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading"></div> Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('authModal');
        alert('🎉 Account created successfully! Welcome to AskAExpert!');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    
    // Simulate login process
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading"></div> Signing In...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeModal('loginModal');
        alert('✅ Welcome back! You are now logged in.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
    }, 1500);
}

// Mobile menu toggle
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        
        // Update aria-expanded state
        const isExpanded = menu.classList.contains('active');
        toggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const menu = document.querySelector('.nav-links');
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    document.querySelector('.mobile-menu-toggle').classList.remove('active');
                }
            }
        });
    });
}

// Close modals when clicking outside
function setupModalClose() {
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                const modalId = modal.id;
                closeModal(modalId);
            }
        });
    }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    initThreeJS();
    populateCategories();
    populateFeatures();
    populatePricing();
    setupMobileMenu();
    setupSmoothScrolling();
    setupModalClose();
    
    // Add some entrance animations
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        hero.style.transition = 'all 1s ease-out';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 500);
});