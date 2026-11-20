/* =========================================================
   Bronx Luggage — About page
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var dev = BL.developer, store = BL.storeInfo;
  var tel = function (info) { return "tel:" + (info.phoneLink || info.phone.replace(/[^\d+]/g, "")); };

  // team members
  $("#teamGrid").html(dev.members.map(function (name, i) {
    return '<div class="team-card reveal">' +
      '<div class="team-avatar" style="--hue:' + (20 + i * 9) + '">' + BL.escape(name.charAt(0)) + '</div>' +
      '<h3>' + BL.escape(name) + '</h3>' +
      '<p>Designer &amp; Developer</p>' +
    '</div>';
  }).join(""));

  // developer organisation
  $("#devName").text(dev.name);
  $("#devEmail").attr("href", "mailto:" + dev.email).text(dev.email);
  $("#devPhone").attr("href", tel(dev)).text(dev.phone);
  $("#devAddress").text(dev.address);

  // store
  $("#storeEmail").attr("href", "mailto:" + store.email).text(store.email);
  $("#storePhone").attr("href", tel(store)).text(store.phone);
  $("#storeAddress").text(store.address);
};
