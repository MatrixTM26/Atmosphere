(function () {
  var sidebar = document.getElementById('DocSidebar');
  var overlay = document.getElementById('DocOverlay');
  var menuBtn = document.getElementById('HeaderMenuBtn');
  var closeBtn = document.getElementById('SidebarCloseBtn');

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  var navLinks = document.querySelectorAll('.Nav-Link[data-section]');
  var sections = document.querySelectorAll('.Doc-Section[id]');
  var breadcrumbPage = document.getElementById('BreadcrumbPage');

  var sectionLabels = {
    'overview': 'Overview',
    'install': 'Installation',
    'quickstart': 'Quick Start',
    'self-scan': 'Self Scan',
    'ip-lookup': 'IP Lookup',
    'batch-lookup': 'Batch Lookup',
    'dns-tools': 'DNS Tools',
    'ssl-check': 'SSL Certificate',
    'whois': 'Whois Lookup',
    'header-inspect': 'Header Inspector',
    'network-tools': 'Network Tools',
    'api': 'API Reference',
    'build': 'Build & Deploy',
    'license': 'License'
  };

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      if (link.dataset.section === id) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
    if (breadcrumbPage && sectionLabels[id]) {
      breadcrumbPage.textContent = sectionLabels[id];
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = [];
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        visible.push(entry.target.id);
      }
    });
    if (visible.length > 0) {
      setActiveNav(visible[0]);
    }
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(function (section) {
    observer.observe(section);
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.dataset.section;
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveNav(targetId);
        if (window.innerWidth <= 900) {
          closeSidebar();
        }
      }
    });
  });

  window.copyCode = function (btn) {
    var block = btn.closest('.Code-Block');
    var code = block.querySelector('code');
    var text = code.innerText || code.textContent;
    navigator.clipboard.writeText(text).then(function () {
      var orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      btn.style.color = 'var(--lime)';
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.style.color = '';
      }, 1800);
    }).catch(function () {
      btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed';
      setTimeout(function () {
        btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
      }, 1800);
    });
  };
})();
