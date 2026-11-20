/* =========================================================
   Bronx Luggage — Home (landing) page
   Hero carousel, pinned product showcase, zoom-through video,
   shop-the-look hotspots, horizontal edit, scroll effects,
   custom cursor and magnetic buttons.
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktop = window.matchMedia("(min-width: 992px)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var clamp = function (v, lo, hi) { return Math.min(hi === undefined ? 1 : hi, Math.max(lo || 0, v)); };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var headerH = function () { return document.getElementById("site-header").offsetHeight; };

  /** 0 → 1 while a tall section scrolls past its sticky child. */
  function pinProgress(section, sticky) {
    var distance = section.offsetHeight - sticky.offsetHeight;
    if (distance <= 0) return 0;
    return clamp((headerH() - section.getBoundingClientRect().top) / distance);
  }

  /* =======================================================
     1. HERO — campaign carousel (auto-advances every 1.5 s)
     ======================================================= */
  var INTERVAL = 1500;
  var heroEl = document.getElementById("heroCarousel");
  var hero = document.getElementById("hero");
  var items = heroEl.querySelectorAll(".carousel-item");
  // one entry per slide: its <video>, or null for photo slides
  var videos = Array.prototype.map.call(items, function (item) { return item.querySelector("video"); });
  var dots = document.querySelectorAll("#heroProgress button");
  var carousel = bootstrap.Carousel.getOrCreateInstance(heroEl, {
    interval: INTERVAL, ride: false, pause: false, touch: true, keyboard: true, wrap: true
  });
  var playing = !reduceMotion;
  var started = false;   // true once the loader has lifted
  hero.style.setProperty("--hero-interval", INTERVAL / 1000 + "s");

  function play(video) {
    if (!video || !playing) return;
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* autoplay blocked: poster frame stays visible */ });
  }
  function stop(video) {
    if (video) video.pause();
  }
  function currentSlide() {
    return Array.prototype.indexOf.call(items, heroEl.querySelector(".carousel-item.active"));
  }

  function setScene(index) {
    Array.prototype.forEach.call(dots, function (d, i) {
      d.classList.toggle("done", i < index);
      d.classList.remove("active");
      if (i === index) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
    // restart the progress line of the current scene
    void dots[index].offsetWidth;
    dots[index].classList.add("active");

    var caption = document.getElementById("heroCaption");
    caption.textContent = items[index].getAttribute("data-caption");
    caption.classList.remove("swap");
    void caption.offsetWidth;
    caption.classList.add("swap");
    document.getElementById("heroNum").textContent = ("0" + (index + 1)).slice(-2);
  }

  heroEl.addEventListener("slide.bs.carousel", function (e) {
    play(videos[e.to]);
    setScene(e.to);
  });
  heroEl.addEventListener("slid.bs.carousel", function (e) {
    // keep only the visible scene decoding to save battery
    videos.forEach(function (v, i) { if (i !== e.to) stop(v); });
    // Bootstrap restarts cycling after a slide that began before a pause; honour the pause
    if (!playing || hero.classList.contains("is-offscreen")) { carousel.pause(); stop(videos[e.to]); }
  });

  function setPlaying(on) {
    playing = on;
    hero.classList.toggle("is-paused", !on);
    var btn = document.getElementById("heroToggle");
    btn.setAttribute("aria-label", on ? "Pause slideshow" : "Play slideshow");
    btn.innerHTML = '<i class="bi ' + (on ? "bi-pause-fill" : "bi-play-fill") + '"></i>';
    if (on) { play(videos[currentSlide()]); carousel.cycle(); }
    else { carousel.pause(); stop(videos[currentSlide()]); }
  }
  $("#heroToggle").on("click", function () { setPlaying(!playing); });

  // pause the slideshow when the hero is scrolled out of view, resume when it returns
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
      if (!playing || !started) return;
      if (entries[0].isIntersecting) { play(videos[currentSlide()]); carousel.cycle(); }
      else { carousel.pause(); stop(videos[currentSlide()]); }
    }, { threshold: 0.2 }).observe(hero);
  }

  setScene(0);
  if (reduceMotion) {
    setPlaying(false);
  } else {
    hero.classList.add("is-paused");      // hold the first progress bar until the loader lifts
    play(videos[0]);
    $(document).one("bl:ready", function () {
      started = true;
      hero.classList.remove("is-paused");
      setScene(0);
      carousel.cycle();
    });
  }

  /* =======================================================
     2. BRAND MARQUEE
     ======================================================= */
  var marks = BL.brands.map(function (b) {
    return '<a href="shop.html?brand=' + b.id + '" aria-label="Shop ' + BL.escape(b.name) + '">' + BL.brandLogo(b) + '</a>';
  }).join("");
  // two copies of the list (twice each) make the loop seamless
  $("#brandMarquee").html(marks + marks + marks + marks);
  $("#brandMarquee a").slice(BL.brands.length * 2).attr({ "aria-hidden": "true", tabindex: "-1" });

  /* =======================================================
     3. PINNED PRODUCT SHOWCASE
     ======================================================= */
  var showcase = document.getElementById("showcase");
  var scSticky = document.getElementById("showcaseSticky");
  var scArt = document.getElementById("scArt");
  var scSteps = showcase.querySelectorAll(".sc-step");
  var scIndex = showcase.querySelectorAll(".sc-index span");
  var scImgs = [document.getElementById("scImgA"), document.getElementById("scImgB")];
  // one spinner per colour, each a real product in the store
  var scProducts = ["bl-004", "bl-009", "bl-006", "bl-008", "bl-005", "bl-002", "bl-003", "bl-001"].map(BL.productById);
  // pose of the suitcase at each of the four steps
  var poses = [
    { s: 0.82, r: -9, y: 26 },
    { s: 1.06, r: 0, y: 0 },
    { s: 0.98, r: 7, y: -8 },
    { s: 0.92, r: 0, y: 0 }
  ];
  var scState = { step: -1, color: -1, manual: -1, front: 0 };

  $("#scSwatches").html(scProducts.map(function (p, i) {
    return '<button type="button" class="sc-swatch" role="radio" aria-checked="false" data-i="' + i + '" style="--sw:' + BL.colors[p.color] + '" aria-label="' + p.color + '" title="' + p.color + '"></button>';
  }).join(""));

  function setColor(i) {
    if (i === scState.color) return;
    scState.color = i;
    var p = scProducts[i];
    // cross-fade between two stacked images
    var next = scImgs[1 - scState.front];
    next.src = BL.productImage(p);
    next.alt = BL.brandById(p.brand).name + " " + p.name + " in " + p.color;
    next.removeAttribute("aria-hidden");
    scImgs[scState.front].classList.remove("is-current");
    scImgs[scState.front].setAttribute("aria-hidden", "true");
    next.classList.add("is-current");
    scState.front = 1 - scState.front;

    $("#scSwatches .sc-swatch").each(function (j) {
      this.classList.toggle("is-active", j === i);
      this.setAttribute("aria-checked", j === i);
    });
    $("#scShown").html("Shown in <strong>" + p.color + "</strong> — " + BL.escape(BL.brandById(p.brand).name + " " + p.name) +
      "<br><strong>" + BL.money(p.price) + "</strong>");
    if (scState.step === 3) scSticky.style.setProperty("--sc-bg", BL.art.shade(BL.colors[p.color], 0.86));
  }

  function setStep(step) {
    if (step === scState.step) return;
    scState.step = step;
    scSticky.setAttribute("data-step", step);
    Array.prototype.forEach.call(scSteps, function (el, i) {
      el.classList.toggle("is-active", i === step);
      el.classList.toggle("is-past", i < step);
    });
    Array.prototype.forEach.call(scIndex, function (el, i) { el.classList.toggle("is-active", i === step); });
    scSticky.classList.toggle("is-dark", step === 2);
    var bgs = ["#f5f5f7", "#f6f1ea", "#0b0b0c", BL.art.shade(BL.colors[scProducts[Math.max(scState.color, 0)].color], 0.86)];
    scSticky.style.setProperty("--sc-bg", bgs[step]);
    if (step !== 3) { scState.manual = -1; setColor(0); }
  }

  function updateShowcase() {
    var p = pinProgress(showcase, scSticky);
    var step = Math.min(3, Math.floor(p * 4));
    setStep(step);

    // smoothly blend between the poses
    var t = clamp(p * 3.4, 0, 3);
    var i = Math.min(2, Math.floor(t));
    var f = ease(t - i);
    var a = poses[i], b = poses[i + 1];
    var s = a.s + (b.s - a.s) * f, r = a.r + (b.r - a.r) * f, y = a.y + (b.y - a.y) * f;
    scArt.style.transform = "translate3d(0," + y.toFixed(1) + "px,0) rotate(" + r.toFixed(2) + "deg) scale(" + s.toFixed(3) + ")";

    // final step: scrolling flips through the colours (unless one was picked)
    if (step === 3) {
      var sub = clamp(p * 4 - 3);
      setColor(scState.manual >= 0 ? scState.manual : Math.min(scProducts.length - 1, Math.floor(sub * scProducts.length)));
    }
  }

  $("#scSwatches").on("click", ".sc-swatch", function () {
    scState.manual = +this.getAttribute("data-i");
    setColor(scState.manual);
  });
  $("#scView").on("click", function () { BL.openProduct(scProducts[Math.max(scState.color, 0)].id); });
  setColor(0);

  /* =======================================================
     4. CATEGORY TILES
     ======================================================= */
  $("#catGrid").html(BL.categories.map(function (c) {
    var n = BL.products.filter(function (p) { return p.category === c.id; }).length;
    return '<a class="cat-tile reveal" href="shop.html?cat=' + c.id + '">' +
      '<div><span class="cat-count">' + n + ' products</span><h3>' + c.name + '</h3><p>' + c.blurb + '</p></div>' +
      '<span class="cat-go"><i class="bi bi-arrow-up-right"></i></span>' +
      '<img src="' + BL.art.uri(c.art, c.color) + '" alt="" loading="lazy" data-art-fallback="' + c.art + '|' + c.color + '">' +
    '</a>';
  }).join(""));

  /* =======================================================
     5. ZOOM-THROUGH VIDEO
     ======================================================= */
  var zoom = document.getElementById("zoom");
  var zoomSticky = zoom.querySelector(".zoom-sticky");
  var zoomMask = document.getElementById("zoomMask");
  var zoomVideo = document.getElementById("zoomVideo");
  var zoomCaption = document.getElementById("zoomCaption");
  var zoomPlaying = false;

  function updateZoom() {
    var rect = zoom.getBoundingClientRect();
    var near = rect.top < window.innerHeight && rect.bottom > 0;
    if (near && !zoomPlaying) { zoomPlaying = true; var pr = zoomVideo.play(); if (pr && pr.catch) pr.catch(function () {}); }
    if (!near && zoomPlaying) { zoomPlaying = false; zoomVideo.pause(); }
    if (!near) return;

    var p = pinProgress(zoom, zoomSticky);
    var grow = Math.pow(clamp((p - 0.1) / 0.55), 2.4);
    zoomMask.style.transform = "scale(" + (1 + grow * 16).toFixed(3) + ")";
    zoomMask.style.opacity = (1 - clamp((p - 0.45) / 0.22)).toFixed(3);
    zoomCaption.classList.toggle("is-visible", p > 0.66);
  }

  /* =======================================================
     6. SHOP THE LOOK
     ======================================================= */
  var lookIds = ["bl-004", "bl-013", "bl-033"];
  var lookTotal = 0;
  $("#lookList").html(lookIds.map(function (id) {
    var p = BL.productById(id);
    lookTotal += p.price;
    return '<li class="look-item" data-id="' + id + '" tabindex="0" role="button" aria-label="View ' + BL.escape(BL.brandById(p.brand).name + " " + p.name) + '">' +
      '<img src="' + BL.productImage(p) + '" alt="" loading="lazy">' +
      '<div><small>' + BL.escape(BL.brandById(p.brand).name) + '</small><strong>' + BL.escape(p.name) + '</strong></div>' +
      '<span class="price">' + BL.money(p.price) + '</span>' +
    '</li>';
  }).join(""));
  $("#lookTotal").text(BL.money(lookTotal));

  var $tip = $("#hotspotTip");
  function highlight(id, show, spot) {
    $(".hotspot").removeClass("is-active");
    $(".look-item").removeClass("is-active");
    if (!show) { $tip.removeClass("is-visible"); return; }
    var p = BL.productById(id);
    var $spot = spot ? $(spot) : $('.hotspot[data-id="' + id + '"]');
    $spot.addClass("is-active");
    $('.look-item[data-id="' + id + '"]').addClass("is-active");
    $tip.html("<small>" + BL.escape(BL.brandById(p.brand).name) + "</small><strong>" + BL.escape(p.name) + "</strong>" + BL.money(p.price))
      .css({ left: $spot[0].style.left, top: $spot[0].style.top })
      .addClass("is-visible");
  }
  $("#lookPhoto").on("mouseenter focus", ".hotspot", function () { highlight($(this).data("id"), true, this); })
                 .on("mouseleave blur", ".hotspot", function () { highlight(null, false); })
                 .on("click", ".hotspot", function () { BL.openProduct($(this).data("id")); });
  $("#lookList").on("mouseenter focus", ".look-item", function () { highlight($(this).data("id"), true); })
                .on("mouseleave blur", ".look-item", function () { highlight(null, false); })
                .on("click", ".look-item", function () { BL.openProduct($(this).data("id")); })
                .on("keydown", ".look-item", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); BL.openProduct($(this).data("id")); } });

  /* =======================================================
     7. THE 2026 EDIT — vertical scroll moves the strip sideways
     ======================================================= */
  var edit = document.getElementById("edit");
  var editSticky = document.getElementById("editSticky");
  var editTrack = document.getElementById("editTrack");
  var featured = BL.products.filter(function (p) { return p.featured; }).slice(0, 8);
  function photo(src, kicker, title, href) {
    return '<a class="edit-photo" href="' + href + '"><img src="' + src + '" alt="' + BL.escape(title) + '" loading="lazy">' +
      '<figcaption><small>' + kicker + '</small><strong>' + title + '</strong></figcaption></a>';
  }
  function cards(list) {
    return list.map(function (p) { return '<div class="edit-card-product">' + BL.productCard(p) + '</div>'; }).join("");
  }
  editTrack.innerHTML =
    '<div class="edit-intro"><p>The pieces our travellers reach for first — handpicked from five legendary houses.</p>' +
      '<a href="shop.html" class="link-arrow">Shop everything <i class="bi bi-arrow-right"></i></a></div>' +
    photo("images/hero/hero-2-effortless-arrivals.jpg", "Women", "Effortless arrivals", "women.html") +
    cards(featured.slice(0, 3)) +
    photo("images/hero/hero-6-menswear-leather.jpg", "Men", "Crafted for him", "men.html") +
    cards(featured.slice(3, 6)) +
    photo("images/hero/hero-5-statement-bag.jpg", "Bags", "The statement bag", "shop.html?cat=bags") +
    cards(featured.slice(6, 8)) +
    '<div class="edit-end"><h3>There’s more to discover.</h3><a href="shop.html" class="btn btn-bl-light magnetic">Shop all 34 pieces</a></div>';

  var editDistance = 0;
  function layoutEdit() {
    if (desktop.matches && !reduceMotion) {
      editDistance = Math.max(0, editTrack.scrollWidth - window.innerWidth);
      edit.style.height = (editSticky.offsetHeight + editDistance) + "px";
    } else {
      editDistance = 0;
      edit.style.height = "";
      editTrack.style.transform = "";
    }
  }
  function updateEdit() {
    if (!editDistance) return;
    var p = pinProgress(edit, editSticky);
    editTrack.style.transform = "translate3d(" + (-p * editDistance).toFixed(1) + "px,0,0)";
    document.getElementById("editMeter").style.transform = "scaleX(" + p.toFixed(3) + ")";
  }

  /* =======================================================
     8. STATEMENT — words light up while scrolling
     ======================================================= */
  var statement = document.getElementById("statementText");
  var goldWords = ["remarkable", "authentic,", "handed", "down."];
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map(function (w) {
    return '<span class="w' + (goldWords.indexOf(w) >= 0 ? " gold" : "") + '">' + BL.escape(w) + '</span>';
  }).join(" ");
  var words = statement.querySelectorAll(".w");
  function updateStatement() {
    var rect = statement.getBoundingClientRect();
    var vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    // 0 when the text enters at the bottom, 1 when it reaches the upper third
    var lit = Math.round(clamp((vh * 0.9 - rect.top) / (rect.height + vh * 0.45)) * words.length);
    for (var i = 0; i < words.length; i++) words[i].classList.toggle("lit", i < lit);
  }

  /* =======================================================
     SCROLL LOOP + progress bar
     ======================================================= */
  var bar = document.querySelector("#scrollProgress span");
  var header = document.getElementById("site-header");
  var ticking = false;
  function onFrame() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? clamp(window.scrollY / max) : 0).toFixed(4) + ")";
    if (!reduceMotion) {
      updateShowcase();
      updateZoom();
      updateEdit();
      updateStatement();
    }
    // switch the header to dark glass while a dark section sits under it (after the sections update)
    var under = document.elementFromPoint(window.innerWidth / 2, headerH() + 4);
    header.classList.toggle("is-dark", !!(under && under.closest(".zoom, .statement, .showcase-sticky.is-dark, .footer-news")));
  }
  function requestFrame() {
    if (!ticking) { ticking = true; requestAnimationFrame(onFrame); }
  }

  if (reduceMotion) {
    Array.prototype.forEach.call(words, function (w) { w.classList.add("lit"); });
    setStep(0);
  }
  layoutEdit();
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", function () { layoutEdit(); requestFrame(); });
  $(window).on("load", function () { layoutEdit(); requestFrame(); });
  onFrame();

  /* =======================================================
     CUSTOM CURSOR + MAGNETIC BUTTONS (mouse only)
     ======================================================= */
  if (finePointer && !reduceMotion) {
    var ring = document.getElementById("cursorRing");
    var label = document.getElementById("cursorLabel");
    var mx = -100, my = -100, rx = -100, ry = -100, moving = false;

    function follow() {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) requestAnimationFrame(follow);
      else moving = false;
    }
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      ring.classList.add("is-visible");
      if (!moving) { moving = true; requestAnimationFrame(follow); }
    }, { passive: true });
    document.addEventListener("mouseleave", function () { ring.classList.remove("is-visible"); });
    document.addEventListener("mouseover", function (e) {
      var el = e.target;
      var text = el.closest(".product-card, .edit-photo") ? "View" : el.closest(".hotspot, .look-item") ? "Shop" : "";
      label.textContent = text;
      ring.classList.toggle("has-label", !!text);
      ring.classList.toggle("is-link", !text && !!el.closest("a, button, [role=button]"));
    });

    $(document).on("mousemove", ".magnetic", function (e) {
      var r = this.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
      var dy = (e.clientY - (r.top + r.height / 2)) * 0.38;
      this.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
    }).on("mouseleave", ".magnetic", function () {
      this.style.transform = "";
    });
  }
};
