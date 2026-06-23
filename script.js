document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  }

  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const tabs = document.querySelectorAll('.tab-btn');
  const categories = document.querySelectorAll('.carta-category');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      categories.forEach(c => c.classList.remove('active'));
      document.getElementById('cat-' + cat).classList.add('active');
    });
  });

  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const form = document.getElementById('reservasForm');
  const formMessage = document.getElementById('formMessage');

  function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('error');
      return false;
    }
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        field.classList.add('error');
        return false;
      }
    }
    if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^[+]?[\d\s()-]{6,20}$/;
      if (!phoneRegex.test(field.value.trim())) {
        field.classList.add('error');
        return false;
      }
    }
    field.classList.remove('error');
    return true;
  }

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMessage.className = 'form-message';
    formMessage.style.display = 'none';

    let isValid = true;
    const fields = form.querySelectorAll('input[required], select[required]');
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      formMessage.textContent = 'Por favor, completa todos los campos correctamente.';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: document.getElementById('guests').value,
      comments: document.getElementById('comments').value.trim()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const SUPABASE_URL = 'https://your-project.supabase.co';
      const SUPABASE_KEY = 'your-anon-key';

      const { createClient } = window.supabase || {};
      let supabase;

      if (createClient && SUPABASE_URL.includes('your-project')) {
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      }

      if (supabase) {
        const { data, error } = await supabase
          .from('reservas')
          .insert([formData]);

        if (error) throw error;
      } else {
        console.log('Reserva (modo demo):', formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      formMessage.textContent = '¡Reserva enviada con éxito! Te confirmaremos lo antes posible.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      form.reset();

    } catch (error) {
      console.error('Error:', error);
      formMessage.textContent = 'Hubo un error al enviar la reserva. Por favor, inténtalo de nuevo.';
      formMessage.className = 'form-message error';
      formMessage.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Reservar mesa';
    }
  });

  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.setAttribute('min', today);
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  document.querySelectorAll('[data-aos-delay]').forEach(el => {
    const delay = el.getAttribute('data-aos-delay');
    el.style.transitionDelay = delay + 'ms';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

});
