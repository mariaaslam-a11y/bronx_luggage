/* =========================================================
   Bronx Luggage — FAQ page (search + categories)
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var state = { cat: "All", q: "" };
  var cats = ["All"];
  BL.faqs.forEach(function (f) { if (cats.indexOf(f.cat) < 0) cats.push(f.cat); });

  $("#faqCats").html(cats.map(function (c) {
    var n = c === "All" ? BL.faqs.length : BL.faqs.filter(function (f) { return f.cat === c; }).length;
    return '<button type="button" class="chip' + (c === "All" ? " active" : "") + '" data-cat="' + c + '">' + c + ' <span>' + n + '</span></button>';
  }).join(""));

  // build every question once; filtering just hides items
  $("#faqList").html(BL.faqs.map(function (f, i) {
    return '<div class="accordion-item faq-item reveal" data-cat="' + f.cat + '">' +
      '<h2 class="accordion-header" id="fh' + i + '">' +
        '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fc' + i + '" aria-expanded="false" aria-controls="fc' + i + '">' +
          '<span class="faq-cat">' + f.cat + '</span>' + BL.escape(f.q) +
        '</button>' +
      '</h2>' +
      '<div id="fc' + i + '" class="accordion-collapse collapse" aria-labelledby="fh' + i + '" data-bs-parent="#faqList">' +
        '<div class="accordion-body">' + BL.escape(f.a) + '</div>' +
      '</div>' +
    '</div>';
  }).join(""));

  function apply() {
    var q = state.q.toLowerCase();
    var shown = 0;
    $("#faqList .faq-item").each(function (i) {
      var f = BL.faqs[i];
      var ok = (state.cat === "All" || f.cat === state.cat) &&
               (!q || (f.q + " " + f.a).toLowerCase().indexOf(q) >= 0);
      if (ok) { shown++; $(this).stop(true, true).fadeIn(220).addClass("is-visible"); }
      else $(this).stop(true, true).fadeOut(160);
    });
    $("#faqEmpty").prop("hidden", shown > 0);
  }

  $("#faqCats").on("click", ".chip", function () {
    $("#faqCats .chip").removeClass("active");
    $(this).addClass("active");
    state.cat = $(this).data("cat");
    apply();
  });

  var timer;
  $("#faqSearch").on("input", function () {
    var value = this.value;
    clearTimeout(timer);
    timer = setTimeout(function () { state.q = value.trim(); apply(); }, 200);
  });
};
