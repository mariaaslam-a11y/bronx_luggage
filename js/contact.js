/* =========================================================
   Bronx Luggage — Contact page (details + feedback form)
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var FEEDBACK_KEY = "bl_feedback";
  var store = BL.storeInfo, dev = BL.developer;
  var tel = function (info) { return "tel:" + (info.phoneLink || info.phone.replace(/[^\d+]/g, "")); };

  /* ---------- contact details ---------- */
  $("#cEmail").attr("href", "mailto:" + store.email).text(store.email);
  $("#cPhone").attr("href", tel(store)).text(store.phone);
  $("#cAddress").text(store.address);
  $("#cHours").html(store.hours.map(BL.escape).join("<br>"));

  $("#dName").text(dev.name);
  $("#dEmail").attr("href", "mailto:" + dev.email).text(dev.email);
  $("#dPhone").attr("href", tel(dev)).text(dev.phone);
  $("#dAddress").text(dev.address);

  /* ---------- form helpers ---------- */
  $("#productList").html(BL.products.map(function (p) {
    return '<option value="' + BL.escape(BL.brandById(p.brand).name + " " + p.name) + '"></option>';
  }).join(""));

  // product pre-filled from a "Reserve in store" button
  var product = new URLSearchParams(window.location.search).get("product");
  if (product) {
    $("#fbProduct").val(product.slice(0, 100));
    $("#fbSubject").val("Reserve a product");
  }

  var rating = 0;
  var labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  var stars = "";
  for (var i = 1; i <= 5; i++) {
    stars += '<button type="button" class="rate-btn" data-value="' + i + '" role="radio" aria-checked="false" aria-label="' + i + ' star' + (i > 1 ? "s" : "") + ' — ' + labels[i] + '"><i class="bi bi-star-fill"></i></button>';
  }
  $("#fbRating").html(stars + '<span class="rate-label" id="rateLabel">Tap a star</span>');

  function paintStars(value, hover) {
    $("#fbRating .rate-btn").each(function () {
      var v = +$(this).data("value");
      $(this).toggleClass("on", v <= value).attr("aria-checked", !hover && v === rating);
    });
    $("#rateLabel").text(value ? labels[value] : "Tap a star");
  }
  $("#fbRating").on("mouseenter", ".rate-btn", function () { paintStars(+$(this).data("value"), true); });
  $("#fbRating").on("mouseleave", function () { paintStars(rating); });
  $("#fbRating").on("click", ".rate-btn", function () {
    rating = +$(this).data("value");
    paintStars(rating);
    $("#fbRatingError").prop("hidden", true);
  });

  $("#fbMessage").on("input", function () {
    $("#fbCount").text(this.value.length + " / 600");
  });

  /* ---------- recent feedback list ---------- */
  function renderFeedback() {
    var list = BL.store.get(FEEDBACK_KEY, []) || [];
    $("#feedbackCount").text(list.length ? "(" + list.length + ")" : "");
    if (!list.length) {
      $("#feedbackList").html('<p class="feedback-empty"><i class="bi bi-chat-square-heart"></i> No feedback yet — be the first to share your thoughts.</p>');
      return;
    }
    $("#feedbackList").html(list.slice(-4).reverse().map(function (f) {
      var date = new Date(f.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return '<article class="fb-item">' +
        '<div class="fb-head"><span class="fb-avatar">' + BL.escape(f.name.charAt(0).toUpperCase()) + '</span>' +
        '<div><strong>' + BL.escape(f.name) + '</strong><small>' + BL.escape(f.subject) + ' · ' + date + '</small></div>' +
        '<span class="stars">' + BL.starsHTML(f.rating) + '</span></div>' +
        '<p>' + BL.escape(f.message) + '</p>' +
      '</article>';
    }).join(""));
  }
  renderFeedback();

  /* ---------- validation & submit ---------- */
  var form = document.getElementById("feedbackForm");

  $(form).on("submit", function (e) {
    e.preventDefault();
    var email = $.trim($("#fbEmail").val());
    // stricter email check than the browser default
    $("#fbEmail")[0].setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "invalid");
    // ignore spaces-only messages
    $("#fbMessage")[0].setCustomValidity($.trim($("#fbMessage").val()).length >= 10 ? "" : "short");
    $("#fbName")[0].setCustomValidity($.trim($("#fbName").val()).length >= 2 ? "" : "short");

    var valid = form.checkValidity() && rating > 0;
    form.classList.add("was-validated");
    $("#fbRatingError").prop("hidden", rating > 0);

    if (!valid) {
      var firstBad = form.querySelector(":invalid");
      if (firstBad) firstBad.focus();
      else document.getElementById("fbRating").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    var entry = {
      name: $.trim($("#fbName").val()),
      email: email,
      phone: $.trim($("#fbPhone").val()),
      subject: $("#fbSubject").val(),
      product: $.trim($("#fbProduct").val()),
      rating: rating,
      message: $.trim($("#fbMessage").val()),
      date: new Date().toISOString()
    };
    var list = BL.store.get(FEEDBACK_KEY, []) || [];
    list.push(entry);
    BL.store.set(FEEDBACK_KEY, list.slice(-50));

    $(form).fadeOut(250, function () {
      $("#formSuccess").prop("hidden", false).hide().fadeIn(350);
    });
    renderFeedback();
    BL.toast("Thanks " + entry.name.split(" ")[0] + "! Your feedback was sent.");
  });

  $("#sendAnother").on("click", function () {
    form.reset();
    form.classList.remove("was-validated");
    rating = 0;
    paintStars(0);
    $("#fbCount").text("0 / 600");
    $("#formSuccess").fadeOut(200, function () {
      $(this).prop("hidden", true);
      $(form).fadeIn(300);
    });
  });
};
