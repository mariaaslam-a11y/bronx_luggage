/* =========================================================
   Bronx Luggage — Product illustrations
   Draws clean vector artwork for each bag type in its real
   colour. Used whenever a product has no photo yet.
   ========================================================= */
window.BL = window.BL || {};

(function (BL) {
  "use strict";

  // Lighten (amt > 0) or darken (amt < 0) a hex colour
  function shade(hex, amt) {
    var c = String(hex || "#777777").replace("#", "");
    if (c.length === 3) c = c.split("").map(function (x) { return x + x; }).join("");
    var n = parseInt(c, 16);
    var r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r);
    g = Math.round((t - g) * p + g);
    b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function isLight(hex) {
    var c = String(hex).replace("#", "");
    var n = parseInt(c, 16);
    var r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 > 170;
  }

  function defs(base) {
    return '<defs>' +
      '<linearGradient id="b" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="' + shade(base, -0.28) + '"/>' +
        '<stop offset=".42" stop-color="' + base + '"/>' +
        '<stop offset=".72" stop-color="' + shade(base, 0.12) + '"/>' +
        '<stop offset="1" stop-color="' + shade(base, -0.32) + '"/>' +
      '</linearGradient>' +
      '<linearGradient id="v" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#fff" stop-opacity=".22"/>' +
        '<stop offset=".45" stop-color="#fff" stop-opacity="0"/>' +
        '<stop offset="1" stop-color="#000" stop-opacity=".22"/>' +
      '</linearGradient>' +
      '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#f1dfae"/>' +
        '<stop offset=".5" stop-color="#c8a96a"/>' +
        '<stop offset="1" stop-color="#8f6f36"/>' +
      '</linearGradient>' +
      '<radialGradient id="s" cx=".5" cy=".5" r=".5">' +
        '<stop offset="0" stop-color="#000" stop-opacity=".32"/>' +
        '<stop offset="1" stop-color="#000" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<pattern id="q" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
        '<path d="M0 0V22M0 0H22" stroke="' + shade(base, isLight(base) ? -0.25 : 0.18) + '" stroke-width="1.6" stroke-opacity=".55"/>' +
      '</pattern>' +
    '</defs>';
  }

  var shadow = '<ellipse cx="200" cy="356" rx="128" ry="13" fill="url(#s)"/>';

  var drawers = {
    suitcase: function (c) {
      var dark = shade(c, -0.45), rib = shade(c, -0.3), hi = shade(c, 0.35);
      return shadow +
        '<rect x="168" y="36" width="9" height="74" rx="3" fill="#2a2a2c"/>' +
        '<rect x="223" y="36" width="9" height="74" rx="3" fill="#2a2a2c"/>' +
        '<rect x="158" y="26" width="84" height="18" rx="9" fill="#1d1d1f"/>' +
        '<rect x="178" y="90" width="44" height="14" rx="7" fill="' + dark + '"/>' +
        '<rect x="112" y="100" width="176" height="236" rx="26" fill="url(#b)"/>' +
        '<rect x="112" y="100" width="176" height="236" rx="26" fill="url(#v)"/>' +
        '<g stroke="' + rib + '" stroke-width="3" stroke-linecap="round" opacity=".55">' +
          '<line x1="150" y1="122" x2="150" y2="314"/><line x1="200" y1="122" x2="200" y2="314"/><line x1="250" y1="122" x2="250" y2="314"/>' +
        '</g>' +
        '<g stroke="' + hi + '" stroke-width="2" stroke-linecap="round" opacity=".35">' +
          '<line x1="153" y1="122" x2="153" y2="314"/><line x1="203" y1="122" x2="203" y2="314"/><line x1="253" y1="122" x2="253" y2="314"/>' +
        '</g>' +
        '<rect x="124" y="114" width="14" height="206" rx="7" fill="#fff" opacity=".1"/>' +
        '<rect x="126" y="332" width="26" height="12" rx="4" fill="#1d1d1f"/>' +
        '<rect x="248" y="332" width="26" height="12" rx="4" fill="#1d1d1f"/>' +
        '<circle cx="139" cy="349" r="9" fill="#2a2a2c"/><circle cx="139" cy="349" r="3.5" fill="#5a5a5e"/>' +
        '<circle cx="261" cy="349" r="9" fill="#2a2a2c"/><circle cx="261" cy="349" r="3.5" fill="#5a5a5e"/>';
    },

    duffel: function (c) {
      var dark = shade(c, -0.45), mid = shade(c, -0.18);
      return shadow +
        '<path d="M150 192C150 118 250 118 250 192" fill="none" stroke="' + dark + '" stroke-width="13" stroke-linecap="round"/>' +
        '<rect x="62" y="182" width="276" height="152" rx="72" fill="url(#b)"/>' +
        '<rect x="62" y="182" width="276" height="152" rx="72" fill="url(#v)"/>' +
        '<ellipse cx="98" cy="258" rx="24" ry="64" fill="' + mid + '" opacity=".55"/>' +
        '<ellipse cx="302" cy="258" rx="24" ry="64" fill="' + mid + '" opacity=".55"/>' +
        '<path d="M112 199H288" stroke="url(#g)" stroke-width="4" stroke-dasharray="3 4"/>' +
        '<rect x="280" y="193" width="16" height="10" rx="3" fill="url(#g)"/>' +
        '<rect x="138" y="184" width="24" height="44" rx="5" fill="' + dark + '"/>' +
        '<rect x="238" y="184" width="24" height="44" rx="5" fill="' + dark + '"/>' +
        '<rect x="126" y="250" width="148" height="14" fill="' + dark + '" opacity=".28"/>' +
        '<circle cx="128" cy="336" r="6" fill="url(#g)"/><circle cx="272" cy="336" r="6" fill="url(#g)"/>';
    },

    backpack: function (c) {
      var dark = shade(c, -0.45), pocket = shade(c, -0.1), edge = shade(c, -0.32);
      return shadow +
        '<path d="M130 142C100 192 104 282 122 334" fill="none" stroke="' + dark + '" stroke-width="16" stroke-linecap="round"/>' +
        '<path d="M270 142C300 192 296 282 278 334" fill="none" stroke="' + dark + '" stroke-width="16" stroke-linecap="round"/>' +
        '<path d="M180 94C180 64 220 64 220 94" fill="none" stroke="' + dark + '" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M126 132Q126 88 200 88Q274 88 274 132L284 318Q286 344 260 344H140Q114 344 116 318Z" fill="url(#b)"/>' +
        '<path d="M126 132Q126 88 200 88Q274 88 274 132L284 318Q286 344 260 344H140Q114 344 116 318Z" fill="url(#v)"/>' +
        '<path d="M142 152Q200 112 258 152" fill="none" stroke="url(#g)" stroke-width="3.5" stroke-dasharray="3 4"/>' +
        '<rect x="146" y="226" width="108" height="94" rx="20" fill="' + pocket + '" stroke="' + edge + '" stroke-width="2"/>' +
        '<path d="M160 245H240" stroke="url(#g)" stroke-width="3.5" stroke-dasharray="3 4"/>' +
        '<rect x="234" y="240" width="14" height="10" rx="3" fill="url(#g)"/>' +
        '<path d="M186 188H214L200 206Z" fill="url(#g)"/>';
    },

    briefcase: function (c) {
      var dark = shade(c, -0.45), flap = shade(c, -0.08), line = shade(c, -0.38), stitch = shade(c, 0.3);
      return shadow +
        '<path d="M166 168V146Q166 130 182 130H218Q234 130 234 146V168" fill="none" stroke="' + dark + '" stroke-width="12"/>' +
        '<rect x="74" y="164" width="252" height="172" rx="16" fill="url(#b)"/>' +
        '<rect x="74" y="164" width="252" height="172" rx="16" fill="url(#v)"/>' +
        '<path d="M74 180Q74 164 90 164H310Q326 164 326 180V220H74Z" fill="' + flap + '" opacity=".9"/>' +
        '<line x1="74" y1="220" x2="326" y2="220" stroke="' + line + '" stroke-width="2"/>' +
        '<rect x="86" y="176" width="228" height="148" rx="10" fill="none" stroke="' + stitch + '" stroke-width="1.6" stroke-dasharray="4 4" opacity=".5"/>' +
        '<rect x="124" y="208" width="26" height="22" rx="4" fill="url(#g)"/>' +
        '<rect x="250" y="208" width="26" height="22" rx="4" fill="url(#g)"/>' +
        '<circle cx="110" cy="340" r="5" fill="url(#g)"/><circle cx="290" cy="340" r="5" fill="url(#g)"/>';
    },

    tote: function (c) {
      var dark = shade(c, -0.4), band = shade(c, -0.12);
      return shadow +
        '<path d="M164 180C164 116 236 116 236 180" fill="none" stroke="' + shade(c, -0.55) + '" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M150 182C150 100 250 100 250 182" fill="none" stroke="' + dark + '" stroke-width="11" stroke-linecap="round"/>' +
        '<path d="M104 176H296L322 328Q324 344 308 344H92Q76 344 78 328Z" fill="url(#b)"/>' +
        '<path d="M104 176H296L322 328Q324 344 308 344H92Q76 344 78 328Z" fill="url(#v)"/>' +
        '<path d="M104 176H296L299 198H101Z" fill="' + band + '"/>' +
        '<circle cx="150" cy="186" r="7" fill="none" stroke="url(#g)" stroke-width="3.5"/>' +
        '<circle cx="250" cy="186" r="7" fill="none" stroke="url(#g)" stroke-width="3.5"/>' +
        '<rect x="186" y="204" width="28" height="16" rx="4" fill="url(#g)"/>';
    },

    crossbody: function (c) {
      var flap = shade(c, -0.06);
      return shadow +
        '<path d="M122 204C118 62 282 62 278 204" fill="none" stroke="url(#g)" stroke-width="5" stroke-dasharray="9 4" stroke-linecap="round"/>' +
        '<rect x="108" y="192" width="184" height="140" rx="20" fill="url(#b)"/>' +
        '<rect x="108" y="192" width="184" height="140" rx="20" fill="url(#q)"/>' +
        '<rect x="108" y="192" width="184" height="140" rx="20" fill="url(#v)"/>' +
        '<path d="M108 212Q108 192 128 192H272Q292 192 292 212V266Q200 294 108 266Z" fill="' + flap + '"/>' +
        '<path d="M108 212Q108 192 128 192H272Q292 192 292 212V266Q200 294 108 266Z" fill="url(#q)"/>' +
        '<rect x="184" y="262" width="32" height="20" rx="5" fill="url(#g)"/>' +
        '<circle cx="122" cy="204" r="6" fill="none" stroke="url(#g)" stroke-width="3"/>' +
        '<circle cx="278" cy="204" r="6" fill="none" stroke="url(#g)" stroke-width="3"/>';
    },

    pouch: function (c) {
      var dark = shade(c, -0.4), stitch = shade(c, 0.3);
      return shadow +
        '<rect x="96" y="176" width="208" height="150" rx="30" fill="url(#b)"/>' +
        '<rect x="96" y="176" width="208" height="150" rx="30" fill="url(#v)"/>' +
        '<path d="M118 198H282" stroke="url(#g)" stroke-width="4" stroke-dasharray="3 4"/>' +
        '<rect x="262" y="191" width="22" height="13" rx="6.5" fill="url(#g)"/>' +
        '<path d="M282 198L298 236" stroke="' + dark + '" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="290" y="232" width="16" height="30" rx="5" transform="rotate(-23 298 247)" fill="' + dark + '"/>' +
        '<rect x="108" y="212" width="184" height="102" rx="20" fill="none" stroke="' + stitch + '" stroke-width="1.6" stroke-dasharray="4 4" opacity=".5"/>' +
        '<rect x="178" y="254" width="44" height="16" rx="3" fill="url(#g)" opacity=".9"/>';
    },

    tag: function (c) {
      var dark = shade(c, -0.4);
      return shadow +
        '<path d="M200 176C200 120 226 82 262 62" fill="none" stroke="' + dark + '" stroke-width="9" stroke-linecap="round"/>' +
        '<rect x="132" y="150" width="136" height="192" rx="18" fill="url(#b)"/>' +
        '<rect x="132" y="150" width="136" height="192" rx="18" fill="url(#v)"/>' +
        '<circle cx="200" cy="178" r="12" fill="url(#g)"/><circle cx="200" cy="178" r="6" fill="#1d1d1f"/>' +
        '<rect x="152" y="214" width="96" height="64" rx="8" fill="#fff" opacity=".9"/>' +
        '<rect x="164" y="230" width="60" height="5" rx="2.5" fill="#b9bcc2"/>' +
        '<rect x="164" y="244" width="72" height="5" rx="2.5" fill="#d2d2d7"/>' +
        '<rect x="164" y="258" width="44" height="5" rx="2.5" fill="#d2d2d7"/>' +
        '<path d="M188 300H212L200 318Z" fill="url(#g)"/>';
    }
  };

  /** Returns raw SVG markup for a bag type in a colour (name or hex). */
  function svg(type, color) {
    var hex = BL.colors && BL.colors[color] ? BL.colors[color] : (color || "#1d1d1f");
    var draw = drawers[type] || drawers.suitcase;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' + defs(hex) + draw(hex) + '</svg>';
  }

  /** Returns a data URI of the artwork (used if an image file is missing). */
  function dataUri(type, color) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg(type, color));
  }

  /** Path of the exported image file, e.g. images/illustrations/suitcase-black.png */
  function uri(type, color) {
    return "images/illustrations/" + type + "-" + String(color).toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".png";
  }

  /** Fills every <img data-art="..."> inside root that has no src yet. */
  function hydrate(root) {
    var imgs = (root || document).querySelectorAll("img[data-art]");
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.getAttribute("src")) return;
      var type = img.getAttribute("data-art"), color = img.getAttribute("data-color");
      img.onerror = function () { img.onerror = null; img.src = dataUri(type, color); };
      img.src = uri(type, color);
    });
  }

  // any illustration file that fails to load is redrawn from the vector source
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || img.getAttribute("data-fallback") === "done") return;
    var m = /images\/(?:illustrations|products)\/.+\.png$/.test(img.getAttribute("src") || "") && img.getAttribute("data-art-fallback");
    if (!m) return;
    var parts = m.split("|");
    img.setAttribute("data-fallback", "done");
    img.src = dataUri(parts[0], parts[1]);
  }, true);

  BL.art = { svg: svg, uri: uri, dataUri: dataUri, hydrate: hydrate, shade: shade };
})(window.BL);
