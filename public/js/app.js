document.addEventListener('DOMContentLoaded', () => {
  // Initialize typed.js for main header
  const typed = new Typed('.element', {
    strings: ['Shyam Ram', 'a Developer', 'a Problem Solver'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Initialize typed.js for about section
  const aboutTyped = new Typed('.about-typed', {
    strings: ['a Full Stack Developer', 'a React Developer', 'a Backend Engineer', 'a Problem Solver'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });

  // Optimize scroll event with throttling
  let lastScroll = 0;
  const scrollThrottle = 10;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (Math.abs(currentScroll - lastScroll) < scrollThrottle) return;
    
    // Navbar animation
    if (currentScroll > 20) {
      document.querySelector('.r-nav').classList.add('stickyadd');
    } else {
      document.querySelector('.r-nav').classList.remove('stickyadd');
    }

    // Animate timeline blocks on scroll
    document.querySelectorAll('.timeline-block').forEach(block => {
      const blockTop = block.getBoundingClientRect().top;
      if (blockTop < window.innerHeight * 0.85) {
        block.classList.add('aos-animate');
      }
    });
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Progress bars animation
  const animateProgress = (bar) => {
    const value = bar.textContent;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = value + '%';
    }, 100);
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgress(entry.target);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
  });

  // Work section filtering with animation
  const filterContainer = document.querySelector('.filter-container');
  if (filterContainer) {
    const filterizr = new Filterizr('.filter-container', {
      controlsSelector: '.btn',
      gridItemsSelector: '.filtr-item',
      spinner: {
        enabled: false
      },
      layout: 'sameSize',
      setupControls: true
    });

    // Add active class to filter buttons
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelector('[data-filter].active')?.classList.remove('active');
        button.classList.add('active');
      });
    });
  }

  // Contact form animation and validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success animate-fadeInUp';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.insertBefore(successMessage, submitButton);
        
        contactForm.reset();
        setTimeout(() => successMessage.remove(), 3000);
      } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger animate-fadeInUp';
        errorMessage.textContent = 'Failed to send message. Please try again.';
        contactForm.insertBefore(errorMessage, submitButton);
        setTimeout(() => errorMessage.remove(), 3000);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
  }
});
