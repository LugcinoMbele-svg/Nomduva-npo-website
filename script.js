document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navbar Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Formspree AJAX Submission Handler
    const handleFormSubmit = (formId, submitBtnId, successMessage) => {
        const form = document.getElementById(formId);
        const submitBtn = document.getElementById(submitBtnId);

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalBtnText = submitBtn.textContent;
            
            // Disable button & show sending state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert(successMessage);
                    form.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form.");
                    }
                }
            } catch (error) {
                alert("Network error. Please check your connection and try again.");
            } finally {
                submitBtn.disabled = true;
                submitBtn.textContent = originalBtnText;
            }
        });
    };

    // Initialize Form Handlers
    handleFormSubmit(
        'contactForm', 
        'contactSubmitBtn', 
        'Thank you for reaching out to NCEP! We have received your message and will respond shortly.'
    );

    handleFormSubmit(
        'ikhayaForm', 
        'ikhayaSubmitBtn', 
        'Application received! Thank you for registering for the iKhaya Golden Mic initiative.'
    );
});
        
