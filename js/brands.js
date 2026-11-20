/* =========================================================
   Bronx Luggage — Brands page
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var logo = BL.brandLogo;

  // quick jump bar
  $("#brandNav").html(BL.brands.map(function (b) {
    return '<button type="button" class="brand-nav-btn" data-target="' + b.id + '">' + logo(b) + '</button>';
  }).join(""));

  // one section per brand
  $("#brandSections").html(BL.brands.map(function (b, i) {
    var items = BL.products.filter(function (p) { return p.brand === b.id; });
    var hero = items.filter(function (p) { return p.featured; })[0] || items[0];
    var minPrice = Math.min.apply(null, items.map(function (p) { return p.price; }));
    var cats = [];
    items.forEach(function (p) { if (cats.indexOf(BL.categoryName(p.category)) < 0) cats.push(BL.categoryName(p.category)); });

    return '' +
      '<section class="brand-section' + (i % 2 ? " flip" : "") + '" id="' + b.id + '" style="--brand:' + b.accent + '" aria-labelledby="h-' + b.id + '">' +
        '<div class="container-xl">' +
          '<div class="row align-items-center g-5">' +
            '<div class="col-lg-6 brand-copy">' +
              '<div class="brand-logo reveal">' + logo(b, "brand-logo-mark") + '</div>' +
              '<h2 class="brand-tagline reveal" id="h-' + b.id + '">' + BL.escape(b.tagline) + '</h2>' +
              '<p class="brand-story reveal">' + BL.escape(b.story) + '</p>' +
              '<dl class="brand-facts reveal">' +
                '<div><dt>Founded</dt><dd>' + b.founded + '</dd></div>' +
                '<div><dt>Origin</dt><dd>' + BL.escape(b.origin) + '</dd></div>' +
                '<div><dt>Founder</dt><dd>' + BL.escape(b.founder) + '</dd></div>' +
                '<div><dt>From</dt><dd>' + BL.money(minPrice) + '</dd></div>' +
              '</dl>' +
              '<p class="brand-signature reveal"><i class="bi bi-gem"></i> ' + BL.escape(b.signature) + '</p>' +
              '<p class="brand-cats reveal">' + items.length + ' products in ' + cats.join(", ") + '</p>' +
              '<div class="d-flex flex-wrap gap-2 reveal">' +
                '<a class="btn btn-bl" href="shop.html?brand=' + b.id + '">Shop ' + BL.escape(b.name) + '</a>' +
                (hero ? '<button type="button" class="btn btn-bl-outline js-open" data-id="' + hero.id + '">View signature piece</button>' : "") +
              '</div>' +
            '</div>' +
            '<div class="col-lg-6">' +
              '<div class="brand-visual reveal-scale reveal">' +
                (hero ? '<img src="' + BL.productImage(hero) + '" alt="' + BL.escape(b.name + " " + hero.name) + '" data-parallax="0.05">' : "") +
                '<span class="brand-year">' + b.founded + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="brand-products product-grid">' + items.slice(0, 4).map(BL.productCard).join("") + '</div>' +
        '</div>' +
      '</section>';
  }).join(""));

  $("#brandSections").on("click", ".js-open", function () { BL.openProduct($(this).data("id")); });

  $("#brandNav").on("click", ".brand-nav-btn", function () {
    var target = document.getElementById($(this).data("target"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // highlight the brand currently on screen
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(".brand-nav-btn").removeClass("active");
          $('.brand-nav-btn[data-target="' + entry.target.id + '"]').addClass("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".brand-section").forEach(function (s) { io.observe(s); });
  }
};
