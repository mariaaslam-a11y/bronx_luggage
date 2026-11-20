/* =========================================================
   Bronx Luggage — Shop page (categories + filters)
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var PRICES = [
    { id: "any",  label: "Any price",         min: 0,    max: Infinity },
    { id: "u75k",  label: "Under PKR 75,000",           min: 0,       max: 75000 },
    { id: "75k",   label: "PKR 75,000 – 300,000",       min: 75000,   max: 300000 },
    { id: "300k",  label: "PKR 300,000 – 800,000",      min: 300000,  max: 800000 },
    { id: "800k",  label: "PKR 800,000 – 1,500,000",    min: 800000,  max: 1500000 },
    { id: "1500k", label: "PKR 1,500,000 and above",    min: 1500000, max: Infinity }
  ];
  var SIZES = ["Small", "Medium", "Large"];
  var LEADS = {
    all: "Luggage, bags, backpacks and more from five of the world’s most celebrated houses.",
    luggage: "Carry-ons, check-ins and spinners engineered to glide through every terminal.",
    bags: "Duffles, totes and shoulder bags — from weekend getaways to evenings out.",
    backpacks: "Hands-free style for the city, the campus and the long haul.",
    briefcases: "Structured, polished and ready for the boardroom.",
    accessories: "The finishing touches: pouches, wallets, organisers and tags."
  };

  var params = new URLSearchParams(window.location.search);
  var state = {
    cat: "all",
    gender: "all",
    brands: [],
    sizes: [],
    colors: [],
    price: "any",
    q: "",
    sort: "featured"
  };

  // read filters from the address (e.g. shop.html?cat=bags&brand=gucci)
  var catParam = params.get("cat");
  if (catParam && BL.categories.some(function (c) { return c.id === catParam; })) state.cat = catParam;
  var genderParam = params.get("gender");
  if (genderParam === "men" || genderParam === "women") state.gender = genderParam;
  (params.get("brand") || "").split(",").forEach(function (b) {
    if (b && BL.brands.some(function (x) { return x.id === b; })) state.brands.push(b);
  });
  state.q = (params.get("q") || "").trim();

  /* ---------- build the filter controls ---------- */
  var tabs = '<button type="button" class="cat-tab" data-cat="all" role="tab">All <span>' + BL.products.length + '</span></button>';
  BL.categories.forEach(function (c) {
    var n = BL.products.filter(function (p) { return p.category === c.id; }).length;
    tabs += '<button type="button" class="cat-tab" data-cat="' + c.id + '" role="tab"><img src="' + BL.art.uri(c.art, c.color) + '" alt="">' + c.name + ' <span>' + n + '</span></button>';
  });
  $("#catTabs").html(tabs);

  $("#fBrands").html(BL.brands.map(function (b) {
    return '<label class="check-item"><input type="checkbox" class="form-check-input" name="brand" value="' + b.id + '">' +
      '<span>' + BL.escape(b.name) + '</span><small data-brand-count="' + b.id + '"></small></label>';
  }).join(""));

  $("#fSizes").html(SIZES.map(function (s) {
    return '<button type="button" class="toggle" data-size="' + s + '" aria-pressed="false">' + s + '</button>';
  }).join(""));

  var usedColors = [];
  BL.products.forEach(function (p) { if (usedColors.indexOf(p.color) < 0) usedColors.push(p.color); });
  usedColors.sort(function (a, b) { return Object.keys(BL.colors).indexOf(a) - Object.keys(BL.colors).indexOf(b); });
  $("#fColors").html(usedColors.map(function (c) {
    return '<button type="button" class="swatch" data-color="' + c + '" style="--sw:' + BL.colors[c] + '" aria-pressed="false" title="' + c + '" aria-label="' + c + '"></button>';
  }).join(""));

  $("#fPrices").html(PRICES.map(function (p, i) {
    return '<label class="check-item"><input type="radio" class="form-check-input" name="price" value="' + p.id + '"' + (i === 0 ? " checked" : "") + '>' +
      '<span>' + p.label + '</span></label>';
  }).join(""));

  /* ---------- sync controls with state ---------- */
  function syncControls() {
    $(".cat-tab").each(function () {
      var on = $(this).data("cat") === state.cat;
      $(this).toggleClass("active", on).attr("aria-selected", on);
    });
    $('#fGender input[value="' + state.gender + '"]').prop("checked", true);
    $('#fBrands input').each(function () { this.checked = state.brands.indexOf(this.value) >= 0; });
    $("#fSizes .toggle").each(function () {
      var on = state.sizes.indexOf($(this).data("size")) >= 0;
      $(this).toggleClass("active", on).attr("aria-pressed", on);
    });
    $("#fColors .swatch").each(function () {
      var on = state.colors.indexOf($(this).data("color")) >= 0;
      $(this).toggleClass("active", on).attr("aria-pressed", on);
    });
    $('#fPrices input[value="' + state.price + '"]').prop("checked", true);
    $("#fSearch").val(state.q);
    $("#sortSelect").val(state.sort);
    $("#colorHint").text(state.colors.length ? "(" + state.colors.join(", ") + ")" : "");
  }

  /* ---------- filtering ---------- */
  function matches(p, ignore) {
    if (state.cat !== "all" && p.category !== state.cat) return false;
    if (state.gender !== "all" && p.gender !== state.gender && p.gender !== "unisex") return false;
    if (ignore !== "brand" && state.brands.length && state.brands.indexOf(p.brand) < 0) return false;
    if (state.sizes.length && state.sizes.indexOf(p.size) < 0) return false;
    if (state.colors.length && state.colors.indexOf(p.color) < 0) return false;
    var range = PRICES.filter(function (r) { return r.id === state.price; })[0] || PRICES[0];
    if (p.price < range.min || p.price >= range.max) return false;
    if (state.q) {
      var hay = (p.name + " " + BL.brandById(p.brand).name + " " + p.type + " " + p.color + " " + BL.categoryName(p.category)).toLowerCase();
      var terms = state.q.toLowerCase().split(/\s+/);
      for (var i = 0; i < terms.length; i++) if (hay.indexOf(terms[i]) < 0) return false;
    }
    return true;
  }

  function activeCount() {
    return state.brands.length + state.sizes.length + state.colors.length +
      (state.price !== "any" ? 1 : 0) + (state.gender !== "all" ? 1 : 0) + (state.q ? 1 : 0);
  }

  function pills() {
    var html = [];
    function pill(type, value, label) {
      html.push('<button type="button" class="af-pill" data-type="' + type + '" data-value="' + BL.escape(value) + '">' +
        BL.escape(label) + ' <i class="bi bi-x"></i></button>');
    }
    if (state.q) pill("q", state.q, "“" + state.q + "”");
    if (state.gender !== "all") pill("gender", state.gender, state.gender === "men" ? "Men" : "Women");
    state.brands.forEach(function (b) { pill("brand", b, BL.brandById(b).name); });
    state.sizes.forEach(function (s) { pill("size", s, s); });
    state.colors.forEach(function (c) { pill("color", c, c); });
    if (state.price !== "any") pill("price", state.price, PRICES.filter(function (r) { return r.id === state.price; })[0].label);
    if (html.length > 1) html.push('<button type="button" class="af-clear" id="afClear">Clear all</button>');
    $("#activeFilters").html(html.join("")).toggleClass("has-items", html.length > 0);
  }

  function updateUrl() {
    var q = new URLSearchParams();
    if (state.cat !== "all") q.set("cat", state.cat);
    if (state.brands.length) q.set("brand", state.brands.join(","));
    if (state.gender !== "all") q.set("gender", state.gender);
    if (state.q) q.set("q", state.q);
    var search = q.toString();
    try { history.replaceState(null, "", window.location.pathname + (search ? "?" + search : "")); } catch (e) { /* not allowed for some local files */ }
  }

  var grid = document.getElementById("productGrid");
  var first = true;

  function render() {
    syncControls();

    // page heading follows the chosen category
    var title = state.cat === "all" ? "All products" : BL.categoryName(state.cat);
    if (state.brands.length === 1) title = BL.brandById(state.brands[0]).name + (state.cat === "all" ? "" : " " + title);
    $("#shopTitle").text(title);
    $("#shopLead").text(LEADS[state.cat]);
    document.title = title + " — Bronx Luggage";

    // brand counts respect every other active filter
    BL.brands.forEach(function (b) {
      var n = BL.products.filter(function (p) { return p.brand === b.id && matches(p, "brand"); }).length;
      $('[data-brand-count="' + b.id + '"]').text(n);
    });

    var list = BL.sortProducts(BL.products.filter(function (p) { return matches(p); }), state.sort);
    $("#resultsCount").html("<strong>" + list.length + "</strong> " + (list.length === 1 ? "product" : "products"));
    var n = activeCount();
    $("#filterCount").text(n ? n : "");
    pills();
    updateUrl();

    if (first) {
      first = false;
      BL.renderProducts(grid, list, "Try a different size, colour or price range.");
    } else {
      $(grid).stop(true).fadeTo(140, 0, function () {
        BL.renderProducts(grid, list, "Try a different size, colour or price range.");
        $(grid).fadeTo(260, 1);
      });
    }
  }

  function toggleIn(arr, value) {
    var i = arr.indexOf(value);
    if (i >= 0) arr.splice(i, 1); else arr.push(value);
  }

  /* ---------- events ---------- */
  $("#catTabs").on("click", ".cat-tab", function () {
    state.cat = $(this).data("cat");
    render();
    this.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  });
  $("#fGender").on("change", "input", function () { state.gender = this.value; render(); });
  $("#fBrands").on("change", "input", function () { toggleIn(state.brands, this.value); render(); });
  $("#fSizes").on("click", ".toggle", function () { toggleIn(state.sizes, $(this).data("size")); render(); });
  $("#fColors").on("click", ".swatch", function () { toggleIn(state.colors, $(this).data("color")); render(); });
  $("#fPrices").on("change", "input", function () { state.price = this.value; render(); });
  $("#sortSelect").on("change", function () { state.sort = this.value; render(); });

  var searchTimer;
  $("#fSearch").on("input", function () {
    var value = this.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { state.q = value.trim(); render(); }, 250);
  });
  $("#filterForm").on("submit", function (e) { e.preventDefault(); });

  function clearAll() {
    state.gender = "all"; state.brands = []; state.sizes = []; state.colors = []; state.price = "any"; state.q = "";
    render();
  }
  $("#clearFilters").on("click", clearAll);
  $("#activeFilters").on("click", "#afClear", clearAll);
  $("#activeFilters").on("click", ".af-pill", function () {
    var type = $(this).data("type"), value = String($(this).data("value"));
    if (type === "q") state.q = "";
    else if (type === "gender") state.gender = "all";
    else if (type === "price") state.price = "any";
    else if (type === "brand") toggleIn(state.brands, value);
    else if (type === "size") toggleIn(state.sizes, value);
    else if (type === "color") toggleIn(state.colors, value);
    render();
  });

  render();

  // bring the active category tab into view on small screens
  var activeTab = document.querySelector(".cat-tab.active");
  if (activeTab && activeTab.parentNode.scrollWidth > activeTab.parentNode.clientWidth) {
    activeTab.parentNode.scrollLeft = activeTab.offsetLeft - 16;
  }
};
