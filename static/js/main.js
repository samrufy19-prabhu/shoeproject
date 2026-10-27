/**
 * StepUp E-Commerce Main JavaScript
 * Handles carousels, animations, AJAX cart interactions, and tab switching
 */

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  if (mobileToggle && navbarNav) {
    mobileToggle.addEventListener('click', function () {
      navbarNav.classList.toggle('show');
    });
  }

  // ==========================================
  // Hero Carousel with Auto-play & Indicators
  // ==========================================
  const heroSlides = document.querySelectorAll('.carousel-slide');
  const heroDots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentHeroIndex = 0;
  let heroInterval = null;

  function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    if (index >= heroSlides.length) index = 0;
    if (index < 0) index = heroSlides.length - 1;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentHeroIndex = index;
  }

  function startHeroTimer() {
    stopHeroTimer();
    heroInterval = setInterval(() => {
      showHeroSlide(currentHeroIndex + 1);
    }, 4500);
  }

  function stopHeroTimer() {
    if (heroInterval) clearInterval(heroInterval);
  }

  if (heroSlides.length > 0) {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showHeroSlide(currentHeroIndex - 1);
        startHeroTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showHeroSlide(currentHeroIndex + 1);
        startHeroTimer();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showHeroSlide(idx);
        startHeroTimer();
      });
    });

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopHeroTimer);
      carouselContainer.addEventListener('mouseleave', startHeroTimer);
    }

    startHeroTimer();
  }

  // ==========================================
  // Offer Section Animation (Figma Prototype)
  // ==========================================
  const offerTabBtns = document.querySelectorAll('.offer-tab-btn');
  const offerCards = document.querySelectorAll('.offer-display-card');
  let currentOfferIndex = 0;
  let offerInterval = null;

  function setOfferTab(index) {
    if (offerCards.length === 0) return;
    if (index >= offerCards.length) index = 0;
    if (index < 0) index = offerCards.length - 1;

    offerTabBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    offerCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    currentOfferIndex = index;
  }

  if (offerTabBtns.length > 0) {
    offerTabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function () {
        setOfferTab(idx);
        restartOfferTimer();
      });
    });

    function restartOfferTimer() {
      if (offerInterval) clearInterval(offerInterval);
      offerInterval = setInterval(() => {
        setOfferTab(currentOfferIndex + 1);
      }, 5500);
    }

    const offerSection = document.querySelector('.offer-showcase-section');
    if (offerSection) {
      offerSection.addEventListener('mouseenter', () => clearInterval(offerInterval));
      offerSection.addEventListener('mouseleave', restartOfferTimer);
    }

    restartOfferTimer();
  }

  // ==========================================
  // Product Detail Gallery & Size Selection
  // ==========================================
  const mainGalleryImg = document.querySelector('.gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      if (mainGalleryImg) {
        mainGalleryImg.src = this.src;
      }
    });
  });

  const sizeBtns = document.querySelectorAll('.size-btn');
  const sizeInput = document.querySelector('#selected-size-input');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      sizeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (sizeInput) {
        sizeInput.value = this.dataset.size;
      }
    });
  });

  // Quantity Counter
  const qtyDecrease = document.querySelector('#qty-decrease');
  const qtyIncrease = document.querySelector('#qty-increase');
  const qtyInput = document.querySelector('#qty-input');

  if (qtyDecrease && qtyIncrease && qtyInput) {
    qtyDecrease.addEventListener('click', function (e) {
      e.preventDefault();
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyIncrease.addEventListener('click', function (e) {
      e.preventDefault();
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }

  // ==========================================
  // AJAX Add to Cart
  // ==========================================
  function showToast(message, type = 'success') {
    let toast = document.createElement('div');
    toast.className = `alert-toast alert-${type}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '280px';
    toast.innerHTML = `<span>${message}</span> <button style="background:none;border:none;cursor:pointer;font-weight:bold;margin-left:12px;" onclick="this.parentElement.remove()">✕</button>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }

  function updateCartBadge(count) {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.classList.add('bump');
      setTimeout(() => badge.classList.remove('bump'), 400);
    }
  }

  // Quick Add from Product Cards
  document.querySelectorAll('.btn-quick-cart').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      const csrfToken = getCookie('csrftoken');

      fetch(`/cart/add/${productId}/`, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'ajax=1&quantity=1&size=8'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          updateCartBadge(data.cart_total_items);
          showToast(data.message, 'success');
        }
      })
      .catch(err => {
        console.error(err);
      });
    });
  });

  // Helper: Get CSRF Cookie
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});
