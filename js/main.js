/* =========================================================
   Bronx Luggage — Core site behaviour
   Loader, navigation, visitor counter, live ticker,
   scroll animations, page transitions and toasts.
   ========================================================= */
window.BL = window.BL || {};

(function (BL, $) {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- safe browser storage ---------- */
  BL.store = {
    get: function (key, fallback, session) {
      try {
        var raw = (session ? sessionStorage : localStorage).getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value, session) {
      try { (session ? sessionStorage : localStorage).setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
    }
  };

  /* ---------- toast notifications ---------- */
  BL.toast = function (message, icon) {
    var $t = $('<div class="bl-toast" role="status"><i class="bi ' + (icon || "bi-check-circle-fill") + '"></i><span></span></div>');
    $t.find("span").text(message);
    $("#toastWrap").append($t);
    requestAnimationFrame(function () { $t.addClass("show"); });
    setTimeout(function () {
      $t.removeClass("show");
      setTimeout(function () { $t.remove(); }, 400);
    }, 3200);
  };

  /* ---------- loading portal ---------- */
  function initLoader() {
    var loader = document.getElementById("loader");
    var firstVisit = !BL.store.get("bl_seen_loader", false, true);
    var minTime = firstVisit && !reduceMotion ? 2200 : 250;
    var start = Date.now();
    var done = false;

    if (!firstVisit) loader.classList.add("quick");
    BL.store.set("bl_seen_loader", true, true);

    function hide() {
      if (done) return;
      done = true;
      var wait = Math.max(0, minTime - (Date.now() - start));
      setTimeout(function () {
        loader.classList.add("is-done");
        document.body.classList.add("is-ready");
        setTimeout(function () { loader.style.display = "none"; }, 900);
        $(document).trigger("bl:ready");
      }, wait);
    }

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);
    setTimeout(hide, 4500); // never block the site on a slow network
  }

  /* ---------- navigation ---------- */
  function initNav() {
    var page = document.body.getAttribute("data-page") || "home";
    var morePages = ["faq", "sitemap"];

    // highlight the current page ("changes colour after clicking")
    $('[data-page="' + page + '"]').addClass("active");
    if (morePages.indexOf(page) >= 0) $('.nav-link-bl[data-page="more"]').addClass("active");

    // dropdown menus fade in / out
    var desktop = window.matchMedia("(min-width: 992px)");
    $(".has-dd").each(function () {
      var $li = $(this), $menu = $li.children(".dd-menu"), timer;
      function open() { clearTimeout(timer); $(".has-dd").not($li).removeClass("open").children(".dd-menu").stop(true, true).fadeOut(120); $li.addClass("open"); $menu.stop(true, true).fadeIn(220); }
      function close() { timer = setTimeout(function () { $li.removeClass("open"); $menu.stop(true, true).fadeOut(180); }, 120); }
      $li.on("mouseenter", function () { if (desktop.matches) open(); });
      $li.on("mouseleave", function () { if (desktop.matches) close(); });
      $li.children("button").on("click", function (e) {
        e.preventDefault();
        if ($li.hasClass("open")) close(); else open();
      });
      $li.on("keydown", function (e) { if (e.key === "Escape") close(); });
      $li.on("focusin", open).on("focusout", function (e) { if (!$li[0].contains(e.relatedTarget)) close(); });
    });

    // mobile menu fade in / out
    var $menu = $("#mobileMenu"), $toggle = $("#menuToggle");
    function setMenu(open) {
      $toggle.toggleClass("is-open", open).attr({ "aria-expanded": open, "aria-label": open ? "Close menu" : "Open menu" });
      $("body").toggleClass("menu-open", open);
      if (open) $menu.stop(true, true).fadeIn(260).addClass("is-open");
      else $menu.stop(true, true).fadeOut(220).removeClass("is-open");
    }
    $toggle.on("click", function () { setMenu(!$menu.hasClass("is-open")); });
    $(document).on("keydown", function (e) { if (e.key === "Escape" && $menu.hasClass("is-open")) setMenu(false); });
    if (desktop.addEventListener) {
      desktop.addEventListener("change", function () { if (desktop.matches) setMenu(false); });
    }

    // header shadow after scrolling
    var header = document.getElementById("site-header");
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 8);
      document.getElementById("toTop").classList.toggle("show", window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    $("#toTop").on("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  /* ---------- visitor counter ---------- */
  function initVisitors() {
    var BASE = 24816; // visits recorded before this website launched
    var count = BL.store.get("bl_visits", 0);
    if (!BL.store.get("bl_counted", false, true)) {
      count += 1;
      BL.store.set("bl_visits", count);
      BL.store.set("bl_counted", true, true);
    }
    var total = BASE + count;
    var el = document.getElementById("visitorCount");
    $(document).one("bl:ready", function () { animateNumber(el, total, 1400); });
  }

  function animateNumber(el, target, duration) {
    if (!el) return;
    if (reduceMotion) { el.textContent = target.toLocaleString("en-US"); return; }
    var start = performance.now();
    var from = Math.max(0, target - Math.min(target, 400));
    (function step(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (target - from) * eased).toLocaleString("en-US");
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------- live ticker: date, time, location ---------- */
  function initTicker() {
    function setAll(selector, text) {
      var nodes = document.querySelectorAll(selector);
      for (var i = 0; i < nodes.length; i++) nodes[i].textContent = text;
    }
    function tick() {
      var now = new Date();
      setAll(".t-date", now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      setAll(".t-time", now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }
    tick();
    setInterval(tick, 1000);

    var cached = BL.store.get("bl_location", null, true);
    if (cached) { setAll(".t-loc", cached); return; }

    if (!("geolocation" in navigator)) {
      setAll(".t-loc", "Location not supported by this browser");
      return;
    }

    // ask for location once the loader is gone so the prompt isn't hidden
    $(document).one("bl:ready", function () {
      navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude, lng = pos.coords.longitude;
        var coords = "Lat " + lat.toFixed(4) + "°, Long " + lng.toFixed(4) + "°";
        setAll(".t-loc", coords);
        BL.store.set("bl_location", coords, true);

        // turn coordinates into a city name (free service, no key needed)
        fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + lat + "&longitude=" + lng + "&localityLanguage=en")
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (d) {
            if (!d) return;
            var place = [d.city || d.locality, d.principalSubdivision, d.countryName].filter(Boolean).join(", ");
            if (place) {
              var text = place + " (" + coords + ")";
              setAll(".t-loc", text);
              BL.store.set("bl_location", text, true);
            }
          })
          .catch(function () { /* keep showing coordinates */ });
      }, function (err) {
        setAll(".t-loc", err.code === 1 ? "Location permission denied — allow it to see your location" : "Location unavailable right now");
      }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
    });
  }

  /* ---------- scroll reveal (Apple-style) ---------- */
  var observer = null;
  BL.reveal = function (root) {
    var els = (root || document).querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("is-visible"); });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          // stagger siblings that appear together
          var siblings = el.parentNode ? Array.prototype.filter.call(el.parentNode.children, function (c) {
            return c.classList.contains("reveal") && !c.classList.contains("is-visible");
          }) : [];
          var index = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = Math.min(index * 70, 420) + "ms";
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    Array.prototype.forEach.call(els, function (el) { observer.observe(el); });
  };

  /* ---------- number count-up on scroll ---------- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.textContent = Number(el.getAttribute("data-count")).toLocaleString("en-US"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target, Number(entry.target.getAttribute("data-count")), 1600);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ---------- gentle parallax ---------- */
  function initParallax() {
    var els = document.querySelectorAll("[data-parallax]");
    if (!els.length || reduceMotion) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      Array.prototype.forEach.call(els, function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- smooth page transitions ---------- */
  function initTransitions() {
    $(document).on("click", "a[href]", function (e) {
      var a = this;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download") || a.getAttribute("href").charAt(0) === "#") return;
      if (a.protocol !== location.protocol || a.host !== location.host) return;
      if (!/\.html$/i.test(a.pathname)) return;
      // same page with only a different #hash: let the browser scroll
      if (a.pathname === location.pathname && a.search === location.search && a.hash) return;

      e.preventDefault();
      var href = a.href;
      document.body.classList.add("is-leaving");
      setTimeout(function () { window.location.href = href; }, reduceMotion ? 0 : 280);
    });

    // returning with the back button restores a faded page — undo that
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("is-leaving");
    });
  }

  /* ---------- newsletter ---------- */
  function initNewsletter() {
    $("#newsForm").on("submit", function (e) {
      e.preventDefault();
      var $input = $("#newsEmail"), email = $.trim($input.val());
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      $input.toggleClass("is-invalid", !ok);
      if (!ok) { $("#newsMsg").text("Please enter a valid email address.").addClass("error"); return; }
      var list = BL.store.get("bl_newsletter", []);
      if (list.indexOf(email) < 0) list.push(email);
      BL.store.set("bl_newsletter", list);
      $("#newsMsg").text("You’re subscribed. Welcome aboard!").removeClass("error");
      $input.val("");
      BL.toast("Subscribed with " + email);
    });
  }

  /* ---------- start ---------- */
  initLoader();

  $(function () {
    initNav();
    initVisitors();
    initTicker();
    initTransitions();
    initNewsletter();
    BL.art.hydrate(document);

    if (typeof BL.pageInit === "function") {
      try { BL.pageInit(); } catch (err) { if (window.console) console.error("Page script error:", err); }
    }

    BL.reveal(document);
    initCounters();
    initParallax();

    // scroll to #anchor targets after the layout settles
    if (location.hash && location.hash.length > 1) {
      $(document).one("bl:ready", function () {
        var target = document.getElementById(location.hash.slice(1));
        if (target) setTimeout(function () { target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }, 150);
      });
    }
  });
})(window.BL, window.jQuery);
