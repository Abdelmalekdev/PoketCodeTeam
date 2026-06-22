
AOS.init();

//burger menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// Sticky Navbar
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const up_button = document.getElementById('up-button');
    const nav_a = document.querySelectorAll('.nav-a');
    if (!navbar) return;

    const stickyClasses = ["fixed", "bg-white/90", "shadow-md"];
    const initialClasses = ["absolute", "bg-transparent"];

    // Ensure transition classes are always present
    navbar.classList.add('transition-all', 'duration-300');

    let ticking = false;

    function handleScroll() {
        if (window.scrollY > 50) {
            nav_a.forEach(link => {
                link.classList.add("text-[var(--primary-color)]" , "hover:bg-[var(--primary-color)]/20");
                link.classList.remove("text-white" , "hover:bg-[var(--decoration-color)]/10");
            });
            navbar.classList.add(...stickyClasses);
            navbar.classList.remove(...initialClasses);
            up_button.classList.add("opacity-100");
            up_button.classList.remove("opacity-0" , "pointer-events-none");
        } else {
            nav_a.forEach(link => {
                link.classList.remove("text-[var(--primary-color)]" , "hover:bg-[var(--primary-color)]/20");
                link.classList.add("text-white" , "hover:bg-[var(--decoration-color)]/10");
            });
            navbar.classList.remove(...stickyClasses);
            navbar.classList.add(...initialClasses);
            up_button.classList.remove("opacity-100");
            up_button.classList.add("opacity-0" , "pointer-events-none");
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    // Run once on load to set correct initial state
    handleScroll();
});

//project carousel

document.addEventListener('DOMContentLoaded', () => {
      const carousel = document.getElementById('carousel-container');
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');

      if (!carousel || !prevBtn || !nextBtn) return;

      /**
       * Calculates exact scroll distance based on a single item's width 
       * combined with the dynamic container CSS grid/flex gap.
       */
      const getScrollStep = () => {
        const firstCard = carousel.firstElementChild;
        if (!firstCard) return 0;
        
        const cardWidth = firstCard.getBoundingClientRect().width;
        // Compute actual gap computed by layout style tokens
        const computedGap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
        
        return cardWidth + computedGap;
      };

      // Navigation Action Listeners
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });

      /**
       * Optional UX Polish:
       * Toggles button availability states dynamically based on scroll extremes.
       */
      const toggleButtonStates = () => {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Use a 2px tolerance threshold to account for fractional pixel sub-pixel rounding
        prevBtn.disabled = scrollLeft <= 2;
        nextBtn.disabled = scrollLeft >= maxScroll - 2;
      };

      // Attach scroll event listening optimized for smooth execution
      carousel.addEventListener('scroll', toggleButtonStates, { passive: true });
      window.addEventListener('resize', toggleButtonStates, { passive: true });
      
      // Initialize state on render
      setTimeout(toggleButtonStates, 100);
    });