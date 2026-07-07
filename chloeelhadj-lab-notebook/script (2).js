document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('nav.links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.textContent = navLinks.classList.contains('open') ? 'Close' : 'Menu';
    });
  }

  // Tabs (data-tabs container, [data-tab] buttons, [data-panel] panels)
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-panel]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const target = group.querySelector(`[data-panel="${btn.dataset.tab}"]`);
        if (target) target.classList.add('active');
      });
    });
  });

  // Interactive workflow diagram: BEFORE / AFTER state toggle
  document.querySelectorAll('[data-diagram]').forEach((diagram) => {
    const buttons = diagram.querySelectorAll('.state-btn');
    const note = diagram.querySelector('.step-note');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const state = btn.dataset.state;
        const after = state === 'after';

        diagram.querySelectorAll('[data-highlight="true"]').forEach((step) => {
          step.setAttribute('fill', after ? 'rgba(63,99,87,0.14)' : 'none');
          step.setAttribute('stroke', after ? '#3F6357' : '#14181C');
        });
        diagram.querySelectorAll('[data-label-before]').forEach((label) => {
          label.textContent = after ? label.dataset.labelAfter : label.dataset.labelBefore;
          label.setAttribute('fill', after ? '#3F6357' : '#14181C');
        });
        if (note) note.textContent = after ? (diagram.dataset.afterNote || '') : (diagram.dataset.beforeNote || '');
      });
    });
  });
});
