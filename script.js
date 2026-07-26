/**
 * Nomduva Community Empowerment Project (NCEP)
 * Interactive Site Features & Form Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Navigation Toggle
    // ==========================================
    const navContainer = document.querySelector('.nav-container');
    const mainNav = document.querySelector('.main-nav');

    if (navContainer && mainNav) {
        // Create mobile toggle button dynamically if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
            toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
            
            // Inline styling for toggle button
            toggleBtn.style.background = 'transparent';
            toggleBtn.style.border = 'none';
            toggleBtn.style.color = '#ffffff';
            toggleBtn.style.fontSize = '1.8rem';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.display = 'none'; // Shown via CSS media queries

            navContainer.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                mainNav.classList.toggle('nav-open');
                if (mainNav.classList.contains('nav-open')) {
                    toggleBtn.innerHTML = '&#10005;'; // Close 'X' icon
                } else {
                    toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
                }
            });
        }
    }

    // ==========================================
    // 2. Smooth Scrolling for Internal Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    if (mainNav && mainNav.classList.contains('nav-open')) {
                        mainNav.classList.remove('nav-open');
                        const toggleBtn = document.querySelector('.mobile-menu-toggle');
                        if (toggleBtn) toggleBtn.innerHTML = '&#9776;';
                    }
                }
            }
        });
    });

    // ==========================================
    // 3. Dynamic Form Submission Feedback
    // ==========================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Preparing Email...';
                submitBtn.style.opacity = '0.8';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                }, 3000);
            }
        });
    });

    // ==========================================
    // 4. Highlight Active Navigation Link
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

});
           
// ==============================================
// Social Media & Link Sharing Functions
// ==============================================
function shareProject(event, platform, projectTitle) {
    event.preventDefault();
    const pageUrl = window.location.href;
    const shareText = `Check out this project by Nomduva NCEP: ${projectTitle}`;
    let shareUrl = '';

    switch (platform) {
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyProjectLink(event) {
    event.preventDefault();
    const pageUrl = window.location.href;

    navigator.clipboard.writeText(pageUrl).then(() => {
        alert('Project link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
                                                                }
        
