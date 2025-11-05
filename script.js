// Interactions: theme toggle, nav active highlight, skill meter animations, contact form mailto fallback
document.addEventListener('DOMContentLoaded', () => {
  // set years
  const yrs = new Date().getFullYear();
  ['year','year2','year3','year4','year5'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = yrs;
  });

  // theme toggle (keeps simple - toggles class)
  function toggleTheme(){
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    // optionally change icon text
    document.querySelectorAll('.icon-btn').forEach(b => b.textContent = document.body.classList.contains('light') ? '☀️' : '🌙');
  }
  document.getElementById('themeToggle') && document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('themeToggle2') && document.getElementById('themeToggle2').addEventListener('click', toggleTheme);
  document.getElementById('themeToggle3') && document.getElementById('themeToggle3').addEventListener('click', toggleTheme);
  document.getElementById('themeToggle4') && document.getElementById('themeToggle4').addEventListener('click', toggleTheme);
  document.getElementById('themeToggle5') && document.getElementById('themeToggle5').addEventListener('click', toggleTheme);

  // nav highlight: mark the correct active item based on URL
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if(window.location.pathname.endsWith(href) || window.location.pathname === '/' && href === 'index.html') {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Skill meters: create fill elements and animate to data-val
  document.querySelectorAll('.meter').forEach(m => {
    const val = parseInt(m.dataset.val || 50, 10);
    const fill = document.createElement('div');
    fill.className = 'fill';
    m.appendChild(fill);
    setTimeout(()=> fill.style.width = val + '%', 150 + Math.random()*400);
  });

  // Handle contact form: use mailto fallback
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || 'No name';
      const email = fd.get('email') || '';
      const message = fd.get('message') || '';
      const subject = encodeURIComponent('Portfolio message from ' + name);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:amshutha07@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Smooth internal anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

});
