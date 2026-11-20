/* =========================================================
   Bronx Luggage — Store data
   All products, brands, gallery items and FAQs live here.
   Every image is a real file in /images (products, gallery,
   brands, illustrations, logo, videos). To swap in a photo,
   replace the file or point "image" at a new one, e.g.
   image: "images/products/bl-001.jpg"
   ========================================================= */
window.BL = window.BL || {};

/* Store details (shown on About, Contact and the footer) */
BL.storeInfo = {
  name: "Bronx Luggage",
  address: "Festival Marketplace, Ground Floor, Main Atrium",
  email: "aptechlearning@gmail.com",
  phone: "0302-1204124",
  phoneLink: "+923021204124",
  hours: ["Mon – Sat: 10:00 AM – 9:00 PM", "Sun: 12:00 PM – 7:00 PM"]
};

/* Organisation developing this website (required on About & Contact) */
BL.developer = {
  name: "Aptech Learning, North Nazimabad",
  members: ["Shahmeer", "Fasih", "Muddasir", "Moiz", "Ali"],
  email: "aptechlearning@gmail.com",
  phone: "0302-1204124",
  phoneLink: "+923021204124",
  address: "Aptech Learning, North Nazimabad, Karachi, Pakistan"
};

BL.colors = {
  Black:  "#1d1d1f",
  Brown:  "#6b4226",
  Tan:    "#b07a4a",
  Beige:  "#d9c4a3",
  Navy:   "#1f2f4f",
  Red:    "#9e1b1b",
  Green:  "#2f5240",
  Silver: "#b9bcc2",
  Pink:   "#e3a5b1",
  White:  "#efece6",
  Grey:   "#76767b"
};

BL.categories = [
  { id: "luggage",     name: "Luggage",     art: "suitcase",  color: "Black", blurb: "Spinners, carry-ons & check-ins" },
  { id: "bags",        name: "Bags",        art: "tote",      color: "Brown", blurb: "Totes, duffels & shoulder bags" },
  { id: "backpacks",   name: "Backpacks",   art: "backpack",  color: "Navy",  blurb: "Everyday & travel backpacks" },
  { id: "briefcases",  name: "Briefcases",  art: "briefcase", color: "Black", blurb: "Work bags & document cases" },
  { id: "accessories", name: "Accessories", art: "pouch",     color: "Tan",   blurb: "Pouches, wallets & tags" }
];

BL.brands = [
  {
    id: "gucci", name: "Gucci", founded: 1921, origin: "Florence, Italy", founder: "Guccio Gucci",
    tagline: "Florentine craft, reimagined for the road.",
    story: "Born in a small Florentine leather workshop, Gucci has turned luggage into an art form for over a century. Its GG canvas, bamboo details and Horsebit hardware make every piece instantly recognisable in any airport lounge.",
    signature: "GG Supreme canvas · Horsebit hardware · Web stripe",
    accent: "#1f4d3a", logo: "images/brands/gucci-logo.png"
  },
  {
    id: "chanel", name: "Chanel", founded: 1910, origin: "Paris, France", founder: "Gabrielle “Coco” Chanel",
    tagline: "Timeless Parisian elegance in every stitch.",
    story: "Chanel brings couture discipline to travel. Quilted lambskin, interlaced chains and the CC turn-lock define pieces that are as much heirloom as luggage, made to be handed down for generations.",
    signature: "Diamond quilting · Chain straps · CC turn-lock",
    accent: "#111111", logo: "images/brands/chanel-logo.png"
  },
  {
    id: "louis-vuitton", name: "Louis Vuitton", founded: 1854, origin: "Paris, France", founder: "Louis Vuitton",
    tagline: "The original trunk-maker since 1854.",
    story: "Louis Vuitton invented the flat-topped, stackable trunk and changed travel forever. From the Keepall to the Horizon rolling luggage, the Maison still pairs Monogram canvas with engineering made for real journeys.",
    signature: "Monogram canvas · Damier pattern · Natural cowhide trim",
    accent: "#6b4226", logo: "images/brands/louis-vuitton-logo.png"
  },
  {
    id: "tommy-hilfiger", name: "Tommy Hilfiger", founded: 1985, origin: "New York, USA", founder: "Tommy Hilfiger",
    tagline: "Classic American cool, built for everyday travel.",
    story: "Tommy Hilfiger brings preppy American style to affordable, hard-wearing luggage. Lightweight shells, smart organisation and the red, white and navy flag make it the go-to choice for weekenders and students alike.",
    signature: "Red-white-navy flag · Lightweight hardside shells",
    accent: "#002855", logo: "images/brands/tommy-hilfiger-logo.png"
  },
  {
    id: "prada", name: "Prada", founded: 1913, origin: "Milan, Italy", founder: "Mario Prada",
    tagline: "Milanese modernism for the modern traveller.",
    story: "Prada began as a Milan leather-goods shop selling trunks to Europe’s elite. Today its Re-Nylon line, made from regenerated nylon, and its scratch-resistant Saffiano leather set the standard for minimal, functional luxury.",
    signature: "Saffiano leather · Re-Nylon · Enamelled triangle logo",
    accent: "#2b2b2b", logo: "images/brands/prada-logo.png"
  }
];

BL.products = [
  /* ---------------- LUGGAGE ---------------- */
  {
    id: "bl-001", name: "GG Supreme Cabin Spinner", brand: "gucci", category: "luggage", type: "Carry-On Spinner",
    gender: "unisex", art: "suitcase", color: "Beige", size: "Small", price: 966000, rating: 4.7, reviews: 86,
    featured: true, isNew: true, image: "images/products/bl-001.png",
    description: "A cabin-friendly spinner wrapped in GG Supreme canvas with leather trim. Four silent wheels and a feather-light frame glide through any terminal.",
    specs: { Dimensions: "55 × 40 × 23 cm", Weight: "3.4 kg", Material: "GG Supreme canvas, leather trim", Capacity: "38 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "5 years" }
  },
  {
    id: "bl-002", name: "Horizon 55 Rolling Luggage", brand: "louis-vuitton", category: "luggage", type: "Carry-On Spinner",
    gender: "unisex", art: "suitcase", color: "Brown", size: "Small", price: 1092000, rating: 4.9, reviews: 142,
    featured: true, isNew: false, image: "images/products/bl-002.png",
    description: "Designed with Marc Newson, the Horizon keeps its interior perfectly flat by placing the trolley outside. Monogram canvas on an ultra-light aluminium frame.",
    specs: { Dimensions: "55 × 38 × 21 cm", Weight: "3.0 kg", Material: "Monogram canvas, aluminium frame", Capacity: "36 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "5 years" }
  },
  {
    id: "bl-003", name: "Classic Stripe Hardside Spinner 28”", brand: "tommy-hilfiger", category: "luggage", type: "Check-In Spinner",
    gender: "men", art: "suitcase", color: "Navy", size: "Large", price: 109000, rating: 4.4, reviews: 312,
    featured: false, isNew: false, image: "images/products/bl-003.png",
    description: "A roomy check-in case in tough polycarbonate with the signature flag stripe. Expandable by 5 cm for the souvenirs you didn’t plan for.",
    specs: { Dimensions: "76 × 51 × 31 cm", Weight: "4.6 kg", Material: "Polycarbonate shell", Capacity: "104 L (+12 L expandable)", Wheels: "4 × 360° double spinner", Lock: "TSA combination", Warranty: "3 years" }
  },
  {
    id: "bl-004", name: "Re-Nylon Trolley", brand: "prada", category: "luggage", type: "Medium Trolley",
    gender: "men", art: "suitcase", color: "Black", size: "Medium", price: 826000, rating: 4.6, reviews: 58,
    featured: true, isNew: true, image: "images/products/bl-004.png",
    description: "Regenerated Re-Nylon over a rigid frame, finished with Saffiano leather and the enamelled triangle logo. Sustainable luxury that’s built to roll.",
    specs: { Dimensions: "67 × 44 × 26 cm", Weight: "3.9 kg", Material: "Re-Nylon, Saffiano leather", Capacity: "68 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "5 years" }
  },
  {
    id: "bl-005", name: "Quilted Rolling Trolley", brand: "chanel", category: "luggage", type: "Medium Trolley",
    gender: "women", art: "suitcase", color: "White", size: "Medium", price: 1904000, rating: 4.8, reviews: 34,
    featured: true, isNew: false, image: "images/products/bl-005.png",
    description: "Chanel’s diamond quilting rendered in a scratch-resistant shell with gold-tone hardware. Effortless Parisian elegance from check-in to arrival.",
    specs: { Dimensions: "65 × 42 × 25 cm", Weight: "4.1 kg", Material: "Quilted calfskin-effect polycarbonate", Capacity: "62 L", Wheels: "4 × 360° spinner", Lock: "Integrated CC lock", Warranty: "5 years" }
  },
  {
    id: "bl-006", name: "Lightweight Carry-On 21”", brand: "tommy-hilfiger", category: "luggage", type: "Carry-On Spinner",
    gender: "women", art: "suitcase", color: "Red", size: "Small", price: 69500, rating: 4.5, reviews: 408,
    featured: false, isNew: true, image: "images/products/bl-006.png",
    description: "Featherweight ABS shell in a bold red with a padded interior divider. Fits most airline overhead bins with room to spare.",
    specs: { Dimensions: "55 × 36 × 23 cm", Weight: "2.6 kg", Material: "ABS + polycarbonate", Capacity: "35 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "3 years" }
  },
  {
    id: "bl-007", name: "Horizon 70 Check-In", brand: "louis-vuitton", category: "luggage", type: "Check-In Spinner",
    gender: "men", art: "suitcase", color: "Black", size: "Large", price: 1288000, rating: 4.8, reviews: 77,
    featured: false, isNew: false, image: "images/products/bl-007.png",
    description: "The larger sibling of the Horizon 55 in Monogram Eclipse. Perfectly flat interior and silent wheels for long-haul journeys.",
    specs: { Dimensions: "70 × 47 × 26 cm", Weight: "4.2 kg", Material: "Monogram Eclipse canvas", Capacity: "75 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "5 years" }
  },
  {
    id: "bl-008", name: "Savoy Large Trolley", brand: "gucci", category: "luggage", type: "Check-In Spinner",
    gender: "unisex", art: "suitcase", color: "Green", size: "Large", price: 1176000, rating: 4.6, reviews: 41,
    featured: false, isNew: false, image: "images/products/bl-008.png",
    description: "A deep forest-green Savoy trolley with Web stripe detailing. Generous capacity, compression straps and a removable garment pouch.",
    specs: { Dimensions: "78 × 50 × 30 cm", Weight: "4.9 kg", Material: "Coated canvas, leather trim", Capacity: "98 L", Wheels: "4 × 360° spinner", Lock: "TSA combination", Warranty: "5 years" }
  },
  {
    id: "bl-009", name: "Aluminium Frame Spinner 25”", brand: "tommy-hilfiger", category: "luggage", type: "Medium Spinner",
    gender: "unisex", art: "suitcase", color: "Silver", size: "Medium", price: 129000, rating: 4.3, reviews: 196,
    featured: false, isNew: false, image: "images/products/bl-009.png",
    description: "Zipperless aluminium frame with twin latches for extra security. A brushed-silver finish that looks sharper with every trip.",
    specs: { Dimensions: "66 × 45 × 27 cm", Weight: "4.4 kg", Material: "Polycarbonate, aluminium frame", Capacity: "72 L", Wheels: "4 × 360° spinner", Lock: "Dual TSA latches", Warranty: "3 years" }
  },

  /* ---------------- BAGS ---------------- */
  {
    id: "bl-010", name: "Ophidia Duffle Bag", brand: "gucci", category: "bags", type: "Duffle Bag",
    gender: "men", art: "duffel", color: "Tan", size: "Large", price: 834000, rating: 4.7, reviews: 63,
    featured: true, isNew: false, image: "images/products/bl-010.png",
    description: "The weekend bag, perfected. GG canvas with Web stripe, a detachable shoulder strap and rolled leather handles.",
    specs: { Dimensions: "55 × 30 × 28 cm", Weight: "1.6 kg", Material: "GG Supreme canvas, leather", Capacity: "46 L", Closure: "Two-way zip", Strap: "Detachable, adjustable", Warranty: "2 years" }
  },
  {
    id: "bl-011", name: "Classic Flap Shoulder Bag", brand: "chanel", category: "bags", type: "Shoulder Bag",
    gender: "women", art: "crossbody", color: "Black", size: "Small", price: 2464000, rating: 4.9, reviews: 211,
    featured: true, isNew: false, image: "images/products/bl-011.png",
    description: "The icon. Quilted lambskin, interwoven chain strap and the CC turn-lock. A piece that only grows more precious with time.",
    specs: { Dimensions: "25.5 × 15.5 × 6.5 cm", Weight: "0.6 kg", Material: "Lambskin, gold-tone metal", Capacity: "2 L", Closure: "CC turn-lock", Strap: "Chain, 2 lengths", Warranty: "2 years" }
  },
  {
    id: "bl-012", name: "Keepall Bandoulière 50", brand: "louis-vuitton", category: "bags", type: "Duffle Bag",
    gender: "unisex", art: "duffel", color: "Brown", size: "Large", price: 770000, rating: 4.8, reviews: 189,
    featured: true, isNew: false, image: "images/products/bl-012.png",
    description: "Since 1930, the Keepall has been the ultimate travel companion. Supple Monogram canvas, natural cowhide trim and a removable strap.",
    specs: { Dimensions: "50 × 29 × 23 cm", Weight: "1.2 kg", Material: "Monogram canvas, cowhide", Capacity: "33 L", Closure: "Two-way zip with padlock", Strap: "Removable, adjustable", Warranty: "2 years" }
  },
  {
    id: "bl-013", name: "Galleria Saffiano Tote", brand: "prada", category: "bags", type: "Tote",
    gender: "women", art: "tote", color: "Black", size: "Medium", price: 1148000, rating: 4.7, reviews: 95,
    featured: false, isNew: false, image: "images/products/bl-013.png",
    description: "Architectural lines in scratch-resistant Saffiano leather. Three interior compartments keep your essentials perfectly organised.",
    specs: { Dimensions: "33 × 24 × 15 cm", Weight: "1.1 kg", Material: "Saffiano leather", Capacity: "11 L", Closure: "Central zip", Strap: "Detachable shoulder strap", Warranty: "2 years" }
  },
  {
    id: "bl-014", name: "Iconic Weekender Duffel", brand: "tommy-hilfiger", category: "bags", type: "Duffle Bag",
    gender: "men", art: "duffel", color: "Navy", size: "Medium", price: 50000, rating: 4.4, reviews: 274,
    featured: false, isNew: false, image: "images/products/bl-014.png",
    description: "Water-resistant twill with flag webbing and a separate shoe compartment. Built for spontaneous weekends away.",
    specs: { Dimensions: "50 × 27 × 25 cm", Weight: "0.9 kg", Material: "Water-resistant cotton twill", Capacity: "34 L", Closure: "Zip", Strap: "Padded, removable", Warranty: "1 year" }
  },
  {
    id: "bl-015", name: "Deauville Shopping Tote", brand: "chanel", category: "bags", type: "Tote",
    gender: "women", art: "tote", color: "Beige", size: "Large", price: 1372000, rating: 4.6, reviews: 72,
    featured: false, isNew: true, image: "images/products/bl-015.png",
    description: "Mixed-fibre canvas, leather handles and chain detailing. Roomy enough for a laptop, elegant enough for dinner.",
    specs: { Dimensions: "46 × 30 × 18 cm", Weight: "1.0 kg", Material: "Mixed fibres, calfskin", Capacity: "18 L", Closure: "Magnetic snap", Strap: "Dual handles + chain strap", Warranty: "2 years" }
  },
  {
    id: "bl-016", name: "Neverfull MM Tote", brand: "louis-vuitton", category: "bags", type: "Tote",
    gender: "women", art: "tote", color: "Brown", size: "Medium", price: 568000, rating: 4.8, reviews: 367,
    featured: true, isNew: false, image: "images/products/bl-016.png",
    description: "The tote that lives up to its name. Side laces cinch it into a chic silhouette, with a removable pouch for small essentials.",
    specs: { Dimensions: "31 × 28 × 14 cm", Weight: "0.6 kg", Material: "Monogram canvas, cowhide", Capacity: "13 L", Closure: "Hook clip", Strap: "Dual shoulder handles", Warranty: "2 years" }
  },
  {
    id: "bl-017", name: "Re-Edition 2005 Crossbody", brand: "prada", category: "bags", type: "Crossbody",
    gender: "women", art: "crossbody", color: "Pink", size: "Small", price: 546000, rating: 4.5, reviews: 88,
    featured: false, isNew: true, image: "images/products/bl-017.png",
    description: "A Y2K icon in soft-pink Re-Nylon with a detachable mini pouch. Light, playful and endlessly versatile.",
    specs: { Dimensions: "22 × 18 × 6 cm", Weight: "0.4 kg", Material: "Re-Nylon, Saffiano trim", Capacity: "1.5 L", Closure: "Zip", Strap: "Adjustable nylon strap", Warranty: "2 years" }
  },
  {
    id: "bl-018", name: "Signature Monogram Tote", brand: "tommy-hilfiger", category: "bags", type: "Tote",
    gender: "women", art: "tote", color: "White", size: "Medium", price: 44500, rating: 4.3, reviews: 151,
    featured: false, isNew: false, image: "images/products/bl-018.png",
    description: "Coated canvas with a tonal TH monogram and a zip-top closure. An everyday tote that keeps up with campus and commute.",
    specs: { Dimensions: "38 × 28 × 13 cm", Weight: "0.7 kg", Material: "Coated canvas", Capacity: "14 L", Closure: "Zip-top", Strap: "Dual handles", Warranty: "1 year" }
  },
  {
    id: "bl-019", name: "Jackie 1961 Shoulder Bag", brand: "gucci", category: "bags", type: "Shoulder Bag",
    gender: "women", art: "crossbody", color: "Red", size: "Small", price: 924000, rating: 4.7, reviews: 64,
    featured: false, isNew: false, image: "images/products/bl-019.png",
    description: "Named for its most famous admirer, the Jackie returns in deep red leather with its signature piston closure.",
    specs: { Dimensions: "28 × 19 × 4 cm", Weight: "0.5 kg", Material: "Calf leather", Capacity: "2 L", Closure: "Piston lock", Strap: "Adjustable leather strap", Warranty: "2 years" }
  },

  /* ---------------- BACKPACKS ---------------- */
  {
    id: "bl-020", name: "Re-Nylon Backpack", brand: "prada", category: "backpacks", type: "Travel Backpack",
    gender: "men", art: "backpack", color: "Black", size: "Medium", price: 518000, rating: 4.6, reviews: 119,
    featured: true, isNew: false, image: "images/products/bl-020.png",
    description: "The iconic Prada nylon backpack, now in regenerated Re-Nylon. Padded laptop sleeve and the enamelled triangle logo up front.",
    specs: { Dimensions: "44 × 30 × 15 cm", Weight: "0.9 kg", Material: "Re-Nylon, Saffiano leather", Capacity: "20 L", Closure: "Two-way zip", Laptop: "Up to 15”", Warranty: "2 years" }
  },
  {
    id: "bl-021", name: "GG Embossed Backpack", brand: "gucci", category: "backpacks", type: "City Backpack",
    gender: "men", art: "backpack", color: "Grey", size: "Medium", price: 686000, rating: 4.5, reviews: 47,
    featured: false, isNew: true, image: "images/products/bl-021.png",
    description: "Soft leather embossed with a tonal GG motif. A refined city backpack with ergonomic straps and a hidden back pocket.",
    specs: { Dimensions: "42 × 31 × 13 cm", Weight: "1.1 kg", Material: "GG embossed leather", Capacity: "17 L", Closure: "Zip", Laptop: "Up to 14”", Warranty: "2 years" }
  },
  {
    id: "bl-022", name: "Christopher MM Backpack", brand: "louis-vuitton", category: "backpacks", type: "Travel Backpack",
    gender: "men", art: "backpack", color: "Navy", size: "Large", price: 1050000, rating: 4.7, reviews: 52,
    featured: false, isNew: false, image: "images/products/bl-022.png",
    description: "Inspired by mountaineering packs, the Christopher pairs Damier canvas with a drawstring top and a buckled flap.",
    specs: { Dimensions: "47 × 38 × 17 cm", Weight: "1.3 kg", Material: "Damier canvas, leather", Capacity: "28 L", Closure: "Drawstring + buckled flap", Laptop: "Up to 16”", Warranty: "2 years" }
  },
  {
    id: "bl-023", name: "Urban Commuter Backpack", brand: "tommy-hilfiger", category: "backpacks", type: "Laptop Backpack",
    gender: "unisex", art: "backpack", color: "Navy", size: "Medium", price: 36000, rating: 4.5, reviews: 523,
    featured: true, isNew: false, image: "images/products/bl-023.png",
    description: "Water-repellent shell, padded laptop compartment and a USB pass-through. The smart everyday pack at an honest price.",
    specs: { Dimensions: "45 × 30 × 14 cm", Weight: "0.8 kg", Material: "Recycled polyester", Capacity: "22 L", Closure: "Zip", Laptop: "Up to 15.6”", Warranty: "1 year" }
  },
  {
    id: "bl-024", name: "Duma Mini Backpack", brand: "chanel", category: "backpacks", type: "Mini Backpack",
    gender: "women", art: "backpack", color: "Black", size: "Small", price: 1456000, rating: 4.8, reviews: 39,
    featured: false, isNew: false, image: "images/products/bl-024.png",
    description: "Quilted lambskin, chain-and-leather straps and a front CC pocket. The most glamorous way to go hands-free.",
    specs: { Dimensions: "26 × 21 × 9 cm", Weight: "0.5 kg", Material: "Lambskin, gold-tone metal", Capacity: "4 L", Closure: "Zip", Laptop: "No", Warranty: "2 years" }
  },
  {
    id: "bl-025", name: "Mini Signature Backpack", brand: "tommy-hilfiger", category: "backpacks", type: "Mini Backpack",
    gender: "women", art: "backpack", color: "Pink", size: "Small", price: 27500, rating: 4.2, reviews: 244,
    featured: false, isNew: true, image: "images/products/bl-025.png",
    description: "A compact pastel backpack with flag zip pulls and an exterior phone pocket. Big personality in a small size.",
    specs: { Dimensions: "30 × 22 × 10 cm", Weight: "0.4 kg", Material: "Nylon", Capacity: "7 L", Closure: "Zip", Laptop: "No", Warranty: "1 year" }
  },

  /* ---------------- BRIEFCASES ---------------- */
  {
    id: "bl-026", name: "Saffiano Leather Briefcase", brand: "prada", category: "briefcases", type: "Briefcase",
    gender: "men", art: "briefcase", color: "Black", size: "Medium", price: 896000, rating: 4.7, reviews: 71,
    featured: true, isNew: false, image: "images/products/bl-026.png",
    description: "Clean Saffiano leather with a structured silhouette, padded laptop pocket and detachable shoulder strap. Boardroom-ready.",
    specs: { Dimensions: "40 × 29 × 8 cm", Weight: "1.4 kg", Material: "Saffiano leather", Capacity: "9 L", Closure: "Twin clasps + zip", Laptop: "Up to 14”", Warranty: "2 years" }
  },
  {
    id: "bl-027", name: "Porte-Documents Voyage", brand: "louis-vuitton", category: "briefcases", type: "Document Case",
    gender: "men", art: "briefcase", color: "Brown", size: "Medium", price: 812000, rating: 4.8, reviews: 58,
    featured: false, isNew: false, image: "images/products/bl-027.png",
    description: "Slim, elegant and practical. Monogram canvas with a padlock closure and an interior organiser for documents and devices.",
    specs: { Dimensions: "41 × 29 × 6 cm", Weight: "1.0 kg", Material: "Monogram canvas, cowhide", Capacity: "7 L", Closure: "Zip with padlock", Laptop: "Up to 13”", Warranty: "2 years" }
  },
  {
    id: "bl-028", name: "Executive Laptop Briefcase", brand: "tommy-hilfiger", category: "briefcases", type: "Laptop Briefcase",
    gender: "men", art: "briefcase", color: "Black", size: "Medium", price: 61500, rating: 4.4, reviews: 167,
    featured: false, isNew: false, image: "images/products/bl-028.png",
    description: "Pebbled faux leather, trolley sleeve and a quick-access front pocket. The commuter’s briefcase, reimagined.",
    specs: { Dimensions: "42 × 31 × 10 cm", Weight: "1.2 kg", Material: "Pebbled PU leather", Capacity: "11 L", Closure: "Twin clasps", Laptop: "Up to 15.6”", Warranty: "1 year" }
  },
  {
    id: "bl-029", name: "Horsebit Document Case", brand: "gucci", category: "briefcases", type: "Document Case",
    gender: "women", art: "briefcase", color: "Tan", size: "Medium", price: 728000, rating: 4.6, reviews: 33,
    featured: false, isNew: true, image: "images/products/bl-029.png",
    description: "Smooth tan leather with Gucci’s gold Horsebit hardware. A polished document case for the modern professional.",
    specs: { Dimensions: "38 × 27 × 6 cm", Weight: "0.9 kg", Material: "Calf leather, gold-tone Horsebit", Capacity: "6 L", Closure: "Magnetic flap", Laptop: "Up to 13”", Warranty: "2 years" }
  },

  /* ---------------- ACCESSORIES ---------------- */
  {
    id: "bl-030", name: "Toiletry Pouch 26", brand: "louis-vuitton", category: "accessories", type: "Toiletry Pouch",
    gender: "unisex", art: "pouch", color: "Brown", size: "Small", price: 277000, rating: 4.7, reviews: 121,
    featured: false, isNew: false, image: "images/products/bl-030.png",
    description: "A classic Monogram canvas pouch with a waterproof lining. Perfect for toiletries, cosmetics or chargers.",
    specs: { Dimensions: "26 × 16 × 9 cm", Weight: "0.2 kg", Material: "Monogram canvas, waterproof lining", Capacity: "3 L", Closure: "Zip", Warranty: "1 year" }
  },
  {
    id: "bl-031", name: "Web Stripe Passport Holder", brand: "gucci", category: "accessories", type: "Passport Holder",
    gender: "unisex", art: "pouch", color: "Green", size: "Small", price: 146000, rating: 4.5, reviews: 76,
    featured: false, isNew: false, image: "images/products/bl-031.png",
    description: "Green leather passport holder with the Web stripe and RFID-blocking lining. Card slots for boarding passes and cards.",
    specs: { Dimensions: "14 × 10 × 1.5 cm", Weight: "0.1 kg", Material: "Calf leather, RFID lining", Capacity: "Passport + 4 cards", Closure: "Open", Warranty: "1 year" }
  },
  {
    id: "bl-032", name: "Travel Organiser Kit", brand: "tommy-hilfiger", category: "accessories", type: "Packing Cubes",
    gender: "unisex", art: "pouch", color: "Navy", size: "Small", price: 16500, rating: 4.6, reviews: 389,
    featured: false, isNew: false, image: "images/products/bl-032.png",
    description: "A set of three compression packing cubes and a cable pouch. Pack smarter and fit more into every case.",
    specs: { Dimensions: "S / M / L set", Weight: "0.3 kg", Material: "Ripstop nylon", Capacity: "4 pieces", Closure: "Compression zip", Warranty: "1 year" }
  },
  {
    id: "bl-033", name: "Classic Travel Wallet", brand: "chanel", category: "accessories", type: "Travel Wallet",
    gender: "women", art: "pouch", color: "Black", size: "Small", price: 322000, rating: 4.7, reviews: 54,
    featured: false, isNew: false, image: "images/products/bl-033.png",
    description: "Quilted caviar leather wallet with room for passport, currency and cards. A refined finishing touch for any journey.",
    specs: { Dimensions: "19 × 10 × 2 cm", Weight: "0.2 kg", Material: "Caviar leather", Capacity: "Passport + 8 cards", Closure: "Zip-around", Warranty: "1 year" }
  },
  {
    id: "bl-034", name: "Saffiano Luggage Tag", brand: "prada", category: "accessories", type: "Luggage Tag",
    gender: "unisex", art: "tag", color: "Red", size: "Small", price: 109000, rating: 4.4, reviews: 61,
    featured: false, isNew: true, image: "images/products/bl-034.png",
    description: "Saffiano leather luggage tag with a privacy flap and enamelled logo. Find your bag on the carousel in seconds.",
    specs: { Dimensions: "11 × 7 cm", Weight: "0.05 kg", Material: "Saffiano leather", Capacity: "ID card", Closure: "Buckle strap", Warranty: "1 year" }
  }
];

BL.gallery = [
  { title: "The Horizon collection", category: "luggage",   art: "suitcase",  color: "Brown", bg: "#efe6da", tall: true,  image: "images/gallery/gallery-01-the-horizon-collection.jpg" },
  { title: "Weekend essentials",     category: "bags",      art: "duffel",    color: "Tan",   bg: "#f3ede6", tall: false, image: "images/gallery/gallery-02-weekend-essentials.jpg" },
  { title: "City backpacks",         category: "backpacks", art: "backpack",  color: "Black", bg: "#e9eaee", tall: false, image: "images/gallery/gallery-03-city-backpacks.jpg" },
  { title: "Quilted icons",          category: "bags",      art: "crossbody", color: "Black", bg: "#f2f0ec", tall: true,  image: "images/gallery/gallery-04-quilted-icons.jpg" },
  { title: "Boardroom ready",        category: "bags",      art: "briefcase", color: "Brown", bg: "#ede5dc", tall: false, image: "images/gallery/gallery-05-boardroom-ready.jpg" },
  { title: "Bold carry-ons",         category: "luggage",   art: "suitcase",  color: "Red",   bg: "#f6e9e9", tall: false, image: "images/gallery/gallery-06-bold-carry-ons.jpg" },
  { title: "Everyday totes",         category: "bags",      art: "tote",      color: "Beige", bg: "#f5f0e8", tall: true,  image: "images/gallery/gallery-07-everyday-totes.jpg" },
  { title: "Forest green Savoy",     category: "luggage",   art: "suitcase",  color: "Green", bg: "#e6eee9", tall: false, image: "images/gallery/gallery-08-forest-green-savoy.jpg" },
  { title: "Commuter packs",         category: "backpacks", art: "backpack",  color: "Navy",  bg: "#e6eaf2", tall: false, image: "images/gallery/gallery-09-commuter-packs.jpg" },
  { title: "Travel pouches",         category: "store",     art: "pouch",     color: "Brown", bg: "#f1ebe4", tall: false, image: "images/gallery/gallery-10-travel-pouches.jpg" },
  { title: "Pastel season",          category: "backpacks", art: "backpack",  color: "Pink",  bg: "#f8ecef", tall: true,  image: "images/gallery/gallery-11-pastel-season.jpg" },
  { title: "Aluminium edition",      category: "luggage",   art: "suitcase",  color: "Silver",bg: "#eceef1", tall: false, image: "images/gallery/gallery-12-aluminium-edition.jpg" },
  { title: "Find your tag",          category: "store",     art: "tag",       color: "Red",   bg: "#f5eaea", tall: false, image: "images/gallery/gallery-13-find-your-tag.jpg" },
  { title: "Navy weekender",         category: "bags",      art: "duffel",    color: "Navy",  bg: "#e7ebf2", tall: false, image: "images/gallery/gallery-14-navy-weekender.jpg" },
  { title: "Ivory elegance",         category: "luggage",   art: "suitcase",  color: "White", bg: "#e9e6e1", tall: true,  image: "images/gallery/gallery-15-ivory-elegance.jpg" },
  { title: "The Galleria",           category: "bags",      art: "tote",      color: "Black", bg: "#ecebe9", tall: false, image: "images/gallery/gallery-16-the-galleria.jpg" }
];

BL.faqs = [
  { cat: "Orders",   q: "How do I place an order?", a: "Browse the Shop, open any product to see full specifications and pricing, then visit our store at the Festival Marketplace or contact us by phone or email to reserve it. Our team will confirm availability within 24 hours." },
  { cat: "Orders",   q: "Can I reserve a product and collect it in store?", a: "Yes. Send us the product name through the Contact page and we will hold it for up to 7 days at our Festival Marketplace store." },
  { cat: "Orders",   q: "Which payment methods do you accept?", a: "We accept all major credit and debit cards, Apple Pay, Google Pay and cash in store. Instalment plans are available on purchases above PKR 300,000." },
  { cat: "Shipping", q: "Do you offer home delivery?", a: "Yes. Delivery is free on orders over PKR 50,000 and usually takes 2–5 business days. Express next-day delivery is available in most areas." },
  { cat: "Shipping", q: "Do you ship internationally?", a: "We ship to over 40 countries. Duties and taxes are calculated at checkout so there are no surprises on arrival." },
  { cat: "Returns",  q: "What is your return policy?", a: "Unused items in their original packaging can be returned within 30 days for a full refund or exchange. Personalised items cannot be returned." },
  { cat: "Returns",  q: "How long does a refund take?", a: "Once we receive and inspect your return, refunds are processed within 3–5 business days to your original payment method." },
  { cat: "Products", q: "Are all your products authentic?", a: "Absolutely. Every Gucci, Chanel, Louis Vuitton, Tommy Hilfiger and Prada item is sourced directly from the brand or its authorised distributors and comes with proof of authenticity." },
  { cat: "Products", q: "What does the warranty cover?", a: "Warranties cover manufacturing defects in wheels, handles, zips and shells. Durations vary by brand from 1 to 5 years and are listed in each product’s specifications." },
  { cat: "Products", q: "How do I choose the right luggage size?", a: "Small (cabin) cases fit most overhead bins for trips of 1–4 days. Medium cases suit 5–9 days, and Large cases are ideal for 10+ days or family travel." },
  { cat: "Products", q: "Is your luggage TSA-approved?", a: "Most of our hardside luggage features TSA-approved locks, which security officers can open without damaging your case. Look for “TSA” in the Lock specification." },
  { cat: "Store",    q: "Where is the Bronx Luggage store?", a: "You’ll find us inside the Festival Marketplace, ground floor, next to the main atrium. Free parking is available for shoppers." },
  { cat: "Store",    q: "What are your store hours?", a: "Monday to Saturday 10:00 AM – 9:00 PM, and Sunday 12:00 PM – 7:00 PM. Hours may change on public holidays." },
  { cat: "Store",    q: "Do you offer luggage repairs?", a: "Yes. Our in-store repair desk handles wheels, handles, zips and locks for all brands, including items bought elsewhere." }
];
