/* =========================================================
   Bronx Luggage — Products
   Product cards, quick-view modal, user ratings and the
   shared collection page (Men / Women).
   ========================================================= */
window.BL = window.BL || {};

(function (BL, $) {
  "use strict";

  /* ---------- small helpers ---------- */
  BL.escape = function (str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };

  BL.money = function (n) {
    return "PKR " + Number(n).toLocaleString("en-US");
  };

  BL.brandById = function (id) {
    for (var i = 0; i < BL.brands.length; i++) if (BL.brands[i].id === id) return BL.brands[i];
    return { id: id, name: id };
  };

  BL.productById = function (id) {
    for (var i = 0; i < BL.products.length; i++) if (BL.products[i].id === id) return BL.products[i];
    return null;
  };

  BL.categoryName = function (id) {
    for (var i = 0; i < BL.categories.length; i++) if (BL.categories[i].id === id) return BL.categories[i].name;
    return id;
  };

  BL.productImage = function (p) {
    return p.image ? p.image : BL.art.uri(p.art, p.color);
  };

  /** Brand logo image (images/brands/...) with a styled-text fallback. */
  BL.brandLogo = function (b, cls) {
    return b.logo
      ? '<img class="brand-logo-img ' + (cls || "") + '" src="' + b.logo + '" alt="' + BL.escape(b.name) + '">'
      : '<span class="wordmark wm-' + b.id + ' ' + (cls || "") + '">' + BL.escape(b.name) + '</span>';
  };

  /* ---------- ratings (saved in this browser) ---------- */
  var RATING_KEY = "bl_ratings";

  function userRatings() {
    return BL.store.get(RATING_KEY, {}) || {};
  }

  BL.userRating = function (id) {
    return userRatings()[id] || 0;
  };

  BL.setUserRating = function (id, value) {
    var all = userRatings();
    all[id] = value;
    BL.store.set(RATING_KEY, all);
  };

  /** Average of the store rating and this visitor's own rating. */
  BL.ratingInfo = function (p) {
    var mine = BL.userRating(p.id);
    var count = p.reviews + (mine ? 1 : 0);
    var avg = (p.rating * p.reviews + mine) / count;
    return { avg: Math.round(avg * 10) / 10, count: count, mine: mine };
  };

  function starsHTML(value) {
    var html = "";
    for (var i = 1; i <= 5; i++) {
      var cls = value >= i ? "bi-star-fill" : (value >= i - 0.5 ? "bi-star-half" : "bi-star");
      html += '<i class="bi ' + cls + '"></i>';
    }
    return html;
  }
  BL.starsHTML = starsHTML;

  /* ---------- product card ---------- */
  BL.productCard = function (p) {
    var brand = BL.brandById(p.brand);
    var r = BL.ratingInfo(p);
    var spec = p.specs.Dimensions + (p.specs.Weight ? " · " + p.specs.Weight : "");
    return '' +
      '<article class="product-card reveal" data-id="' + p.id + '" tabindex="0" role="button" aria-label="View ' + BL.escape(brand.name + " " + p.name) + '">' +
        '<div class="pc-media" style="--tint:' + BL.art.shade(BL.colors[p.color] || "#888", 0.86) + '">' +
          (p.isNew ? '<span class="pc-badge">New</span>' : "") +
          '<img src="' + BL.productImage(p) + '" alt="' + BL.escape(brand.name + " " + p.name) + '" loading="lazy" data-art-fallback="' + p.art + '|' + p.color + '">' +
          '<span class="pc-quick"><i class="bi bi-eye"></i> Quick view</span>' +
        '</div>' +
        '<div class="pc-body">' +
          '<p class="pc-brand">' + BL.escape(brand.name) + '</p>' +
          '<h3 class="pc-name">' + BL.escape(p.name) + '</h3>' +
          '<p class="pc-meta">' + BL.escape(p.type) + ' · ' + p.size + ' · ' +
            '<span class="pc-swatch" style="background:' + (BL.colors[p.color] || "#888") + '"></span>' + p.color + '</p>' +
          '<p class="pc-spec"><i class="bi bi-rulers"></i>' + BL.escape(spec) + '</p>' +
          '<div class="pc-foot">' +
            '<span class="pc-price">' + BL.money(p.price) + '</span>' +
            '<span class="pc-rating" title="' + r.avg + ' out of 5"><i class="bi bi-star-fill"></i>' + r.avg.toFixed(1) +
              ' <small>(' + r.count + ')</small></span>' +
          '</div>' +
        '</div>' +
      '</article>';
  };

  BL.renderProducts = function (el, list, emptyText) {
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<div class="empty-state"><i class="bi bi-search"></i><h3>No products found</h3><p>' +
        (emptyText || "Try removing a filter or two.") + '</p></div>';
      return;
    }
    el.innerHTML = list.map(BL.productCard).join("");
    BL.reveal(el);
  };

  BL.sortProducts = function (list, mode) {
    var out = list.slice();
    switch (mode) {
      case "price-asc":  out.sort(function (a, b) { return a.price - b.price; }); break;
      case "price-desc": out.sort(function (a, b) { return b.price - a.price; }); break;
      case "rating":     out.sort(function (a, b) { return BL.ratingInfo(b).avg - BL.ratingInfo(a).avg; }); break;
      case "name":       out.sort(function (a, b) { return a.name.localeCompare(b.name); }); break;
      case "new":        out.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); }); break;
      default:           out.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    }
    return out;
  };

  /* ---------- quick-view modal ---------- */
  var current = null;

  function paintRating(p) {
    var r = BL.ratingInfo(p);
    $("#pmAvg").html('<span class="stars">' + starsHTML(r.avg) + '</span><strong>' + r.avg.toFixed(1) +
      '</strong><span>from ' + r.count + ' ratings</span>');
    var stars = "";
    for (var i = 1; i <= 5; i++) {
      stars += '<button type="button" class="star-btn' + (i <= r.mine ? " on" : "") + '" data-value="' + i +
        '" role="radio" aria-checked="' + (i === r.mine) + '" aria-label="' + i + ' star' + (i > 1 ? "s" : "") + '">' +
        '<i class="bi bi-star-fill"></i></button>';
    }
    $("#pmStars").html(stars);
  }

  BL.openProduct = function (id) {
    var p = BL.productById(id);
    if (!p) return;
    current = p;
    var brand = BL.brandById(p.brand);
    $("#pmImg").removeAttr("data-fallback").attr({ src: BL.productImage(p), alt: brand.name + " " + p.name, "data-art-fallback": p.art + "|" + p.color });
    $(".pm-media").css("--tint", BL.art.shade(BL.colors[p.color] || "#888", 0.86));
    $("#pmBrand").text(brand.name);
    $("#pmName").text(p.name);
    $("#pmType").text(p.type + " · " + BL.categoryName(p.category));
    $("#pmPrice").html(BL.money(p.price) + '<small>Inclusive of all taxes</small>');
    $("#pmDesc").text(p.description);
    $("#pmTags").html(
      '<span><i class="bi bi-arrows-angle-expand"></i>' + p.size + '</span>' +
      '<span><i class="pc-swatch" style="background:' + (BL.colors[p.color] || "#888") + '"></i>' + p.color + '</span>' +
      '<span><i class="bi bi-person"></i>' + (p.gender === "unisex" ? "Unisex" : p.gender === "men" ? "Men" : "Women") + '</span>' +
      (p.isNew ? '<span class="tag-new">New arrival</span>' : "")
    );
    $("#pmSpecs").html(Object.keys(p.specs).map(function (k) {
      return "<tr><th>" + BL.escape(k) + "</th><td>" + BL.escape(p.specs[k]) + "</td></tr>";
    }).join("") + "<tr><th>Price</th><td>" + BL.money(p.price) + "</td></tr>");
    $("#pmEnquire").attr("href", "contact.html?product=" + encodeURIComponent(brand.name + " " + p.name) + "#feedback");
    $("#pmBrandLink").attr("href", "brands.html#" + brand.id).text("About " + brand.name);
    $("#pmRateMsg").text("");
    paintRating(p);
    bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).show();
  };

  function refreshCards(id) {
    var p = BL.productById(id);
    var r = BL.ratingInfo(p);
    $('.product-card[data-id="' + id + '"] .pc-rating').html(
      '<i class="bi bi-star-fill"></i>' + r.avg.toFixed(1) + ' <small>(' + r.count + ')</small>');
  }

  $(function () {
    // open a product from any card
    $(document).on("click", ".product-card", function () {
      BL.openProduct($(this).data("id"));
    });
    $(document).on("keydown", ".product-card", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); BL.openProduct($(this).data("id")); }
    });

    // star rating inside the modal
    $(document).on("mouseenter", "#pmStars .star-btn", function () {
      var v = +$(this).data("value");
      $("#pmStars .star-btn").each(function () { $(this).toggleClass("hover", +$(this).data("value") <= v); });
    });
    $(document).on("mouseleave", "#pmStars", function () {
      $("#pmStars .star-btn").removeClass("hover");
    });
    $(document).on("click", "#pmStars .star-btn", function () {
      if (!current) return;
      var v = +$(this).data("value");
      BL.setUserRating(current.id, v);
      paintRating(current);
      refreshCards(current.id);
      $("#pmRateMsg").text("Thanks! You rated this " + v + " out of 5.");
      BL.toast("Your " + v + "-star rating was saved.");
    });
  });

  /* ---------- collection page (Men / Women) ---------- */
  BL.collectionPage = function (gender) {
    var state = { cat: "all", sort: "featured" };
    var pool = BL.products.filter(function (p) { return p.gender === gender || p.gender === "unisex"; });
    var grid = document.getElementById("collectionGrid");
    var count = document.getElementById("collectionCount");

    // category chips with counts
    var chips = '<button type="button" class="chip active" data-cat="all">All <span>' + pool.length + '</span></button>';
    BL.categories.forEach(function (c) {
      var n = pool.filter(function (p) { return p.category === c.id; }).length;
      if (n) chips += '<button type="button" class="chip" data-cat="' + c.id + '">' + c.name + ' <span>' + n + '</span></button>';
    });
    $("#collectionChips").html(chips);

    function render() {
      var list = pool.filter(function (p) { return state.cat === "all" || p.category === state.cat; });
      list = BL.sortProducts(list, state.sort);
      count.textContent = list.length + (list.length === 1 ? " product" : " products");
      $(grid).stop(true).fadeTo(150, 0, function () {
        BL.renderProducts(grid, list);
        $(grid).fadeTo(250, 1);
      });
    }

    $("#collectionChips").on("click", ".chip", function () {
      $("#collectionChips .chip").removeClass("active");
      $(this).addClass("active");
      state.cat = $(this).data("cat");
      render();
    });
    $("#collectionSort").on("change", function () {
      state.sort = this.value;
      render();
    });

    // brands that appear in this collection
    var brandIds = [];
    pool.forEach(function (p) { if (brandIds.indexOf(p.brand) < 0) brandIds.push(p.brand); });

    // hero stats (animated by the count-up in main.js)
    var catIds = [];
    pool.forEach(function (p) { if (catIds.indexOf(p.category) < 0) catIds.push(p.category); });
    $("#statProducts").attr("data-count", pool.length);
    $("#statBrands").attr("data-count", brandIds.length);
    $("#statCats").attr("data-count", catIds.length);
    $("#collectionBrands").html(brandIds.map(function (id) {
      var b = BL.brandById(id);
      return '<a class="brand-pill reveal" href="shop.html?brand=' + b.id + '&gender=' + gender + '">' +
        BL.brandLogo(b) + '</a>';
    }).join(""));

    render();
  };
})(window.BL, window.jQuery);
