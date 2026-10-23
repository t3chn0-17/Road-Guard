(function () {
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.sidebar nav a'));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);
  var nav = document.querySelector('.sidebar nav');
  var current = null;
  var ticking = false;

  function setActive(id) {
    if (id === current) {
      return;
    }
    current = id;
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      if (active) {
        link.setAttribute('aria-current', 'true');
        if (nav && nav.scrollWidth > nav.clientWidth) {
          var navBox = nav.getBoundingClientRect();
          var linkBox = link.getBoundingClientRect();
          var target = nav.scrollLeft + (linkBox.left - navBox.left) - (nav.clientWidth - linkBox.width) / 2;
          nav.scrollTo({ left: target, behavior: 'smooth' });
        }
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function update() {
    ticking = false;
    var offset = window.innerHeight * 0.3;
    var found = null;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom && sections.length) {
      found = sections[sections.length - 1];
    } else {
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= offset) {
          found = section;
        }
      });
    }
    if (found) {
      setActive(found.id);
    } else if (current) {
      current = null;
      navLinks.forEach(function (link) {
        link.removeAttribute('aria-current');
      });
    }
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  function fallbackCopy(text) {
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (error) {
        ok = false;
      }
      document.body.removeChild(area);
      if (ok) {
        resolve();
      } else {
        reject();
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  Array.prototype.forEach.call(document.querySelectorAll('pre'), function (pre) {
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    wrapper.appendChild(button);

    var timer = null;
    button.addEventListener('click', function () {
      var code = pre.querySelector('code');
      copyText((code || pre).textContent).then(
        function () {
          button.textContent = 'Copied';
          button.classList.add('is-done');
        },
        function () {
          button.textContent = 'Press Ctrl+C';
        }
      ).then(function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          button.textContent = 'Copy';
          button.classList.remove('is-done');
        }, 1800);
      });
    });
  });
})();
