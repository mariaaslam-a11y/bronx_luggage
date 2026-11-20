/* =========================================================
   Bronx Luggage — Gallery page (filter + lightbox)
   ========================================================= */
BL.pageInit = function () {
  "use strict";

  var grid = document.getElementById("galleryGrid");
  var visible = [];   // items currently shown, in order
  var index = 0;      // item open in the lightbox

  function src(item) {
    return item.image ? item.image : BL.art.uri(item.art, item.color);
  }

  function render(filter) {
    visible = BL.gallery.filter(function (g) { return filter === "all" || g.category === filter; });
    grid.innerHTML = visible.map(function (g, i) {
      return '<figure class="g-item reveal' + (g.tall ? " tall" : "") + '" style="--g-bg:' + g.bg + '">' +
        '<button type="button" class="g-open" data-index="' + i + '" aria-label="Open image: ' + BL.escape(g.title) + '">' +
          '<img src="' + src(g) + '" alt="' + BL.escape(g.title) + '" loading="lazy">' +
          '<figcaption><span>' + BL.escape(g.title) + '</span><i class="bi bi-arrows-angle-expand"></i></figcaption>' +
        '</button>' +
      '</figure>';
    }).join("");
    BL.reveal(grid);
  }

  $("#galleryFilters").on("click", ".chip", function () {
    var filter = $(this).data("filter");
    $("#galleryFilters .chip").removeClass("active");
    $(this).addClass("active");
    $(grid).stop(true).fadeTo(150, 0, function () {
      render(filter);
      $(grid).fadeTo(260, 1);
    });
  });

  /* ---------- lightbox ---------- */
  var lbEl = document.getElementById("lightbox");
  var lightbox = bootstrap.Modal.getOrCreateInstance(lbEl);

  function show(i) {
    index = (i + visible.length) % visible.length;
    var item = visible[index];
    var $img = $("#lbImg");
    $img.stop(true).fadeTo(120, 0, function () {
      $img.attr({ src: src(item), alt: item.title });
      $("#lbStage").css("--g-bg", item.bg);
      $("#lbTitle").text(item.title);
      $("#lbCount").text((index + 1) + " / " + visible.length);
      $img.fadeTo(220, 1);
    });
  }

  $(grid).on("click", ".g-open", function () {
    show(+$(this).data("index"));
    lightbox.show();
  });
  $("#lbPrev").on("click", function () { show(index - 1); });
  $("#lbNext").on("click", function () { show(index + 1); });

  $(document).on("keydown", function (e) {
    if (!lbEl.classList.contains("show")) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // swipe on touch screens
  var startX = null;
  lbEl.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lbEl.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx > 0 ? index - 1 : index + 1);
    startX = null;
  });

  render("all");
};
