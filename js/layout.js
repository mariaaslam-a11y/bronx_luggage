/* =========================================================
   Bronx Luggage — Shared layout
   Injects the loader, header, mobile menu, footer, ticker and
   product modal into every page so they are defined once.
   ========================================================= */
window.BL = window.BL || {};

(function (BL) {
  "use strict";

  var logoMark =
    '<svg class="logo-svg" viewBox="0 0 40 40" aria-hidden="true">' +
      '<rect x="12" y="3" width="16" height="8" rx="4" fill="none" stroke="currentColor" stroke-width="2.6"/>' +
      '<rect x="4" y="9" width="32" height="28" rx="8" fill="currentColor"/>' +
      '<text x="20" y="30" text-anchor="middle" class="logo-svg-letter">B</text>' +
    '</svg>';
  BL.logoMark = logoMark;

  var shopLinks = [
    ["shop.html?cat=luggage", "Luggage", "bi-suitcase2"],
    ["shop.html?cat=bags", "Bags", "bi-handbag"],
    ["shop.html?cat=backpacks", "Backpacks", "bi-backpack2"],
    ["shop.html?cat=briefcases", "Briefcases", "bi-briefcase"],
    ["shop.html?cat=accessories", "Accessories", "bi-wallet2"]
  ];

  function brandLinks() {
    return BL.brands.map(function (b) {
      return '<li><a href="shop.html?brand=' + b.id + '">' + b.name + '</a></li>';
    }).join("");
  }

  var loaderHTML =
    '<div class="loader-inner">' +
      '<div class="loader-mark">' + logoMark + '</div>' +
      '<div class="loader-word"><span>B</span><span>R</span><span>O</span><span>N</span><span>X</span></div>' +
      '<div class="loader-sub">LUGGAGE</div>' +
      '<div class="loader-bar"><span></span></div>' +
      '<div class="loader-caption">Preparing your journey…</div>' +
    '</div>';

  var headerHTML =
    '<div class="header-inner container-xl">' +
      '<a class="brand" href="index.html" aria-label="Bronx Luggage — Home">' +
        '<span class="brand-mark">' + logoMark + '</span>' +
        '<span class="brand-word"><strong>BRONX</strong><small>LUGGAGE</small></span>' +
      '</a>' +
      '<nav class="main-nav d-none d-lg-block" aria-label="Main navigation">' +
        '<ul class="nav-list">' +
          '<li><a class="nav-link-bl" href="index.html" data-page="home">Home</a></li>' +
          '<li class="has-dd"><a class="nav-link-bl" href="shop.html" data-page="shop">Shop <i class="bi bi-chevron-down"></i></a>' +
            '<div class="dd-menu dd-wide"><div class="dd-grid">' +
              '<div><p class="dd-title">Categories</p><ul>' +
                shopLinks.map(function (l) { return '<li><a href="' + l[0] + '"><i class="bi ' + l[2] + '"></i>' + l[1] + '</a></li>'; }).join("") +
                '<li><a href="shop.html" class="dd-all">Shop all <i class="bi bi-arrow-right"></i></a></li>' +
              '</ul></div>' +
              '<div><p class="dd-title">Brands</p><ul>' + brandLinks() + '</ul></div>' +
            '</div></div>' +
          '</li>' +
          '<li><a class="nav-link-bl" href="men.html" data-page="men">Men</a></li>' +
          '<li><a class="nav-link-bl" href="women.html" data-page="women">Women</a></li>' +
          '<li><a class="nav-link-bl" href="brands.html" data-page="brands">Brands</a></li>' +
          '<li><a class="nav-link-bl" href="gallery.html" data-page="gallery">Gallery</a></li>' +
          '<li><a class="nav-link-bl" href="about.html" data-page="about">About Us</a></li>' +
          '<li><a class="nav-link-bl" href="contact.html" data-page="contact">Contact Us</a></li>' +
          '<li class="has-dd"><button type="button" class="nav-link-bl" data-page="more">More <i class="bi bi-chevron-down"></i></button>' +
            '<div class="dd-menu dd-right"><ul>' +
              '<li><a href="faq.html" data-page="faq"><i class="bi bi-question-circle"></i>FAQs</a></li>' +
              '<li><a href="sitemap.html" data-page="sitemap"><i class="bi bi-diagram-3"></i>Site Map</a></li>' +
              '<li><a href="contact.html#feedback"><i class="bi bi-chat-heart"></i>Give Feedback</a></li>' +
            '</ul></div>' +
          '</li>' +
        '</ul>' +
      '</nav>' +
      '<div class="header-right">' +
        '<div class="visitor" title="Total website visitors">' +
          '<span class="visitor-mark">' + logoMark + '</span>' +
          '<span class="visitor-text"><small>Visitors</small><strong id="visitorCount">—</strong></span>' +
        '</div>' +
        '<button type="button" class="menu-toggle d-lg-none" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">' +
          '<span></span><span></span>' +
        '</button>' +
      '</div>' +
    '</div>';

  var mobileHTML =
    '<nav class="mobile-nav container" aria-label="Mobile navigation">' +
      '<ul>' +
        '<li><a href="index.html" data-page="home">Home</a></li>' +
        '<li><a href="shop.html" data-page="shop">Shop</a></li>' +
        '<li><a href="men.html" data-page="men">Men</a></li>' +
        '<li><a href="women.html" data-page="women">Women</a></li>' +
        '<li><a href="brands.html" data-page="brands">Brands</a></li>' +
        '<li><a href="gallery.html" data-page="gallery">Gallery</a></li>' +
        '<li><a href="about.html" data-page="about">About Us</a></li>' +
        '<li><a href="contact.html" data-page="contact">Contact Us</a></li>' +
        '<li><a href="faq.html" data-page="faq">FAQs</a></li>' +
        '<li><a href="sitemap.html" data-page="sitemap">Site Map</a></li>' +
      '</ul>' +
      '<div class="mobile-cats">' +
        shopLinks.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + '</a>'; }).join("") +
      '</div>' +
    '</nav>';

  var year = new Date().getFullYear();
  var footerHTML =
    '<div class="footer-news">' +
      '<div class="container-xl">' +
        '<div class="row align-items-center g-4">' +
          '<div class="col-lg-6"><h2 class="footer-news-title">Stay on the journey.</h2>' +
            '<p class="footer-news-text">New arrivals, travel guides and private offers — straight to your inbox.</p></div>' +
          '<div class="col-lg-6">' +
            '<form class="news-form" id="newsForm" novalidate>' +
              '<label for="newsEmail" class="visually-hidden">Email address</label>' +
              '<input type="email" id="newsEmail" class="form-control" placeholder="Your email address" required>' +
              '<button class="btn btn-bl" type="submit">Subscribe</button>' +
            '</form>' +
            '<p class="news-msg" id="newsMsg" role="status"></p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-main container-xl">' +
      '<div class="row g-5">' +
        '<div class="col-lg-4">' +
          '<a class="brand brand-footer" href="index.html"><span class="brand-mark">' + logoMark + '</span>' +
          '<span class="brand-word"><strong>BRONX</strong><small>LUGGAGE</small></span></a>' +
          '<p class="footer-about">Luxury and everyday luggage from the world’s finest houses — Gucci, Chanel, Louis Vuitton, Tommy Hilfiger and Prada — at the Festival Marketplace.</p>' +
          '<div class="socials">' +
            '<a href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>' +
            '<a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>' +
            '<a href="https://www.x.com" target="_blank" rel="noopener" aria-label="X"><i class="bi bi-twitter-x"></i></a>' +
            '<a href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>' +
          '</div>' +
        '</div>' +
        '<div class="col-6 col-md-3 col-lg-2"><h3 class="footer-h">Shop</h3><ul class="footer-links">' +
          shopLinks.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join("") +
        '</ul></div>' +
        '<div class="col-6 col-md-3 col-lg-2"><h3 class="footer-h">Collections</h3><ul class="footer-links">' +
          '<li><a href="men.html">Men</a></li><li><a href="women.html">Women</a></li>' +
          '<li><a href="brands.html">Brands</a></li><li><a href="gallery.html">Gallery</a></li>' +
          '<li><a href="shop.html">All products</a></li>' +
        '</ul></div>' +
        '<div class="col-6 col-md-3 col-lg-2"><h3 class="footer-h">Company</h3><ul class="footer-links">' +
          '<li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact Us</a></li>' +
          '<li><a href="faq.html">FAQs</a></li><li><a href="sitemap.html">Site Map</a></li>' +
          '<li><a href="contact.html#feedback">Feedback</a></li>' +
        '</ul></div>' +
        '<div class="col-6 col-md-3 col-lg-2"><h3 class="footer-h">Visit</h3><ul class="footer-links footer-visit">' +
          '<li>' + BL.storeInfo.address + '</li>' +
          BL.storeInfo.hours.map(function (h) { return '<li>' + h + '</li>'; }).join("") +
          '<li><a href="tel:' + BL.storeInfo.phoneLink + '">' + BL.storeInfo.phone + '</a></li>' +
          '<li><a href="mailto:' + BL.storeInfo.email + '">' + BL.storeInfo.email + '</a></li>' +
        '</ul></div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<div class="container-xl">' +
        '<p class="credits">Created, Designed &amp; Powered by: <strong>Shahmeer, Fasih, Muddasir, Moiz &amp; Ali</strong></p>' +
        '<p class="copyright">&copy; ' + year + ' Bronx Luggage. All rights reserved.</p>' +
      '</div>' +
    '</div>';

  function tickerItems() {
    return '<span class="t-item"><i class="bi bi-calendar3"></i><span class="t-date">—</span></span>' +
      '<span class="t-item"><i class="bi bi-clock"></i><span class="t-time">—</span></span>' +
      '<span class="t-item"><i class="bi bi-geo-alt"></i><span class="t-loc">Detecting your location…</span></span>' +
      '<span class="t-item"><i class="bi bi-truck"></i>Free delivery on orders over PKR 50,000</span>' +
      '<span class="t-item"><i class="bi bi-shop"></i>Visit us at the Festival Marketplace</span>' +
      '<span class="t-item"><i class="bi bi-stars"></i>New in: Louis Vuitton Horizon 55 &amp; Prada Re-Nylon</span>';
  }

  var tickerHTML =
    '<div class="ticker-label"><span class="live-dot"></span>LIVE</div>' +
    '<div class="ticker-track"><div class="ticker-content">' +
      '<div class="ticker-group">' + tickerItems() + '</div>' +
      '<div class="ticker-group" aria-hidden="true">' + tickerItems() + '</div>' +
    '</div></div>';

  var modalHTML =
    '<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="pmName" aria-hidden="true">' +
      '<div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">' +
        '<div class="modal-content product-modal">' +
          '<button type="button" class="btn-close pm-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
          '<div class="modal-body p-0"><div class="row g-0">' +
            '<div class="col-lg-6"><div class="pm-media"><img id="pmImg" alt=""></div></div>' +
            '<div class="col-lg-6"><div class="pm-info">' +
              '<p class="pm-brand" id="pmBrand"></p>' +
              '<h2 class="pm-name" id="pmName"></h2>' +
              '<p class="pm-type" id="pmType"></p>' +
              '<div class="pm-price" id="pmPrice"></div>' +
              '<div class="pm-rating">' +
                '<div class="pm-avg" id="pmAvg"></div>' +
                '<div class="pm-rate"><span>Rate this product:</span>' +
                  '<div class="star-input" id="pmStars" role="radiogroup" aria-label="Your rating"></div>' +
                '</div>' +
                '<p class="pm-rate-msg" id="pmRateMsg" role="status"></p>' +
              '</div>' +
              '<p class="pm-desc" id="pmDesc"></p>' +
              '<div class="pm-tags" id="pmTags"></div>' +
              '<h3 class="pm-spec-title">Specifications</h3>' +
              '<table class="pm-specs"><tbody id="pmSpecs"></tbody></table>' +
              '<div class="pm-actions">' +
                '<a href="contact.html" class="btn btn-bl" id="pmEnquire"><i class="bi bi-bag-check"></i> Reserve in store</a>' +
                '<a href="brands.html" class="btn btn-bl-outline" id="pmBrandLink">About the brand</a>' +
              '</div>' +
            '</div></div>' +
          '</div></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  function mount(id, html, tag, cls) {
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag || "div");
      el.id = id;
      document.body.appendChild(el);
    }
    if (cls) el.className = cls;
    el.innerHTML = html;
    return el;
  }

  mount("loader", loaderHTML, "div", "loader");
  mount("site-header", headerHTML, "header", "site-header");
  mount("mobileMenu", mobileHTML, "div", "mobile-menu");
  mount("site-footer", footerHTML, "footer", "site-footer");
  mount("ticker", tickerHTML, "div", "ticker");
  document.body.insertAdjacentHTML("beforeend", modalHTML +
    '<div class="toast-wrap" id="toastWrap" aria-live="polite"></div>' +
    '<button type="button" class="to-top" id="toTop" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>');

  // header must sit before main; mobile menu right after it
  var header = document.getElementById("site-header");
  var main = document.getElementById("main");
  if (main && header.nextElementSibling !== main) main.parentNode.insertBefore(header, main);
  header.parentNode.insertBefore(document.getElementById("mobileMenu"), header.nextSibling);
})(window.BL);
