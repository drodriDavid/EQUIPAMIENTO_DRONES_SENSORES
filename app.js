/* =====================================================================
   App de catálogo — render, filtros, buscador, ficha técnica
   ===================================================================== */

/* ---- Paletas de fondo por tipo de ilustración ---- */
const ART_BG = {
  quad:         "linear-gradient(135deg,#15356b,#0c1838)",
  industrial:   "linear-gradient(135deg,#1b2b66,#0c1430)",
  camera:       "linear-gradient(135deg,#3a2766,#140c2c)",
  thermal:      "linear-gradient(135deg,#6b2330,#2a0f16)",
  lidar:        "linear-gradient(135deg,#0d4f57,#06222a)",
  multispectral:"linear-gradient(135deg,#1d5a3a,#0a2418)",
  hyperspectral:"linear-gradient(135deg,#54307a,#1a0e33)",
};

/* ---- Ilustraciones SVG vectoriales por tipo ---- */
function illustration(art){
  const S = (inner) =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="#dfe8ff" stroke-width="2.4"
       stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  switch(art){
    case "quad": return S(`
      <g opacity=".9">
        <line x1="34" y1="34" x2="86" y2="86"/><line x1="86" y1="34" x2="34" y2="86"/>
        <circle cx="30" cy="30" r="13" stroke="#7cc4ff"/><circle cx="90" cy="30" r="13" stroke="#7cc4ff"/>
        <circle cx="30" cy="90" r="13" stroke="#7cc4ff"/><circle cx="90" cy="90" r="13" stroke="#7cc4ff"/>
        <line x1="20" y1="30" x2="40" y2="30"/><line x1="30" y1="20" x2="30" y2="40"/>
        <line x1="80" y1="30" x2="100" y2="30"/><line x1="90" y1="20" x2="90" y2="40"/>
        <line x1="20" y1="90" x2="40" y2="90"/><line x1="30" y1="80" x2="30" y2="100"/>
        <line x1="80" y1="90" x2="100" y2="90"/><line x1="90" y1="80" x2="90" y2="100"/>
        <rect x="48" y="48" width="24" height="20" rx="5" fill="#0b1733" stroke="#a9c6ff"/>
        <circle cx="60" cy="72" r="6" fill="#0b1733" stroke="#22d3ee"/>
      </g>`);
    case "industrial": return S(`
      <g>
        <line x1="28" y1="40" x2="92" y2="40"/>
        <circle cx="22" cy="34" r="12" stroke="#7cc4ff"/><circle cx="98" cy="34" r="12" stroke="#7cc4ff"/>
        <line x1="12" y1="34" x2="32" y2="34"/><line x1="88" y1="34" x2="108" y2="34"/>
        <rect x="40" y="40" width="40" height="26" rx="7" fill="#0b1733" stroke="#a9c6ff"/>
        <line x1="34" y1="40" x2="30" y2="58"/><line x1="86" y1="40" x2="90" y2="58"/>
        <rect x="50" y="66" width="20" height="12" rx="3" fill="#0b1733" stroke="#22d3ee"/>
        <circle cx="60" cy="86" r="7" fill="#0b1733" stroke="#22d3ee"/>
        <line x1="44" y1="92" x2="76" y2="92" stroke="#22d3ee"/>
      </g>`);
    case "camera": return S(`
      <g>
        <rect x="24" y="38" width="72" height="48" rx="10" fill="#0b1733" stroke="#c3b3ff"/>
        <path d="M44 38l6-9h20l6 9"/>
        <circle cx="60" cy="62" r="17" stroke="#c3b3ff"/>
        <circle cx="60" cy="62" r="9" stroke="#a78bfa"/>
        <circle cx="84" cy="48" r="2.6" fill="#a78bfa" stroke="none"/>
      </g>`);
    case "thermal": return S(`
      <g>
        <rect x="24" y="40" width="72" height="44" rx="10" fill="#0b1733" stroke="#ffb4a0"/>
        <circle cx="50" cy="62" r="13" stroke="#ff9d80"/>
        <circle cx="50" cy="62" r="6" stroke="#ffd0a0"/>
        <path d="M74 50v24M82 50v24" stroke="#ff9d80"/>
        <path d="M70 56q4-6 8 0t8 0" stroke="#ffd0a0"/>
      </g>`);
    case "lidar": return S(`
      <g>
        <ellipse cx="60" cy="34" rx="20" ry="9" fill="#0b1733" stroke="#5fe0d6"/>
        <path d="M40 34v10a20 9 0 0 0 40 0V34"/>
        <path d="M60 53 38 92M60 53 52 92M60 53 68 92M60 53 82 92" stroke="#5fe0d6" opacity=".85"/>
        <path d="M34 92h52" stroke="#2bb3aa"/>
        <circle cx="46" cy="88" r="2" fill="#5fe0d6" stroke="none"/>
        <circle cx="60" cy="90" r="2" fill="#5fe0d6" stroke="none"/>
        <circle cx="74" cy="88" r="2" fill="#5fe0d6" stroke="none"/>
      </g>`);
    case "multispectral": return S(`
      <g>
        <rect x="26" y="32" width="68" height="56" rx="10" fill="#0b1733" stroke="#86e7b0"/>
        <circle cx="44" cy="50" r="7" stroke="#9ff0c2"/><circle cx="60" cy="50" r="7" stroke="#86e7b0"/>
        <circle cx="76" cy="50" r="7" stroke="#6fd99c"/>
        <circle cx="52" cy="70" r="7" stroke="#9ff0c2"/><circle cx="68" cy="70" r="7" stroke="#6fd99c"/>
      </g>`);
    case "hyperspectral": return S(`
      <g>
        <rect x="26" y="40" width="68" height="40" rx="9" fill="#0b1733" stroke="#cdb0ff"/>
        <circle cx="44" cy="60" r="12" stroke="#cdb0ff"/><circle cx="44" cy="60" r="5" stroke="#a78bfa"/>
        <path d="M66 46l24 0M66 53l24 0M66 60l24 0M66 67l24 0M66 74l24 0"
              stroke="#a78bfa"/>
        <path d="M66 46l24 0" stroke="#f472b6"/><path d="M66 74l24 0" stroke="#60a5fa"/>
      </g>`);
    default: return S(`<rect x="34" y="34" width="52" height="52" rx="10" stroke="#a9c6ff"/>`);
  }
}

const TYPE_LABEL = { drone:"Dron", sensor:"Sensor" };

/* ---- Estado ---- */
let activeFilter = "all";
let query = "";

const catalogEl = document.getElementById("catalog");
const softSection = document.getElementById("software-section");

/* ---- Stats ---- */
(function renderStats(){
  const drones = EQUIPAMIENTO.filter(e=>e.type==="drone").length;
  const sensores = EQUIPAMIENTO.filter(e=>e.type==="sensor").length;
  const ops = EQUIPAMIENTO.filter(e=>e.status.level==="ok").length;
  const data = [
    [drones,"Drones"], [sensores,"Sensores"],
    [SOFTWARE.length,"Software"], [ops,"Operativos"],
  ];
  document.getElementById("stats").innerHTML = data.map(([n,l])=>
    `<div class="stat"><div class="n">${n}</div><div class="l">${l}</div></div>`).join("");
})();

/* ---- Tarjeta ---- */
function card(e){
  const chips = (e.features||[]).slice(0,4)
    .map(f=>`<span class="chip">${f}</span>`).join("");
  return `
    <div class="card" data-id="${e.id}">
      <div class="thumb" style="background:${ART_BG[e.art]||ART_BG.quad}">
        <span class="badge-type">${TYPE_LABEL[e.type]||e.type}</span>
        <span class="badge-status"><span class="dot ${e.status.level}"></span>${e.status.label}</span>
        ${illustration(e.art)}
      </div>
      <div class="card-body">
        <span class="brand">${e.brand}</span>
        <h3>${e.name}</h3>
        <div class="tag">${e.tagline}</div>
        <div class="chips">${chips}</div>
      </div>
    </div>`;
}

/* ---- Render principal ---- */
function render(){
  const q = query.trim().toLowerCase();
  const showSoftware = (activeFilter==="all" || activeFilter==="software");
  const showEquip = (activeFilter!=="software");

  let items = EQUIPAMIENTO.filter(e=>{
    if(activeFilter==="drone" && e.type!=="drone") return false;
    if(activeFilter==="sensor" && e.type!=="sensor") return false;
    if(!q) return true;
    const hay = [e.name,e.brand,e.tagline,e.description,(e.features||[]).join(" "),
      e.specs.map(s=>s.join(" ")).join(" ")].join(" ").toLowerCase();
    return hay.includes(q);
  });

  let html = "";
  if(showEquip){
    const drones = items.filter(e=>e.type==="drone");
    const sensores = items.filter(e=>e.type==="sensor");
    if(drones.length){
      html += `<div class="section-title">✈️ Drones / Aeronaves <span class="pill">${drones.length}</span></div>`;
      html += `<div class="grid">${drones.map(card).join("")}</div>`;
    }
    if(sensores.length){
      html += `<div class="section-title">🛰️ Sensores / Cargas útiles <span class="pill">${sensores.length}</span></div>`;
      html += `<div class="grid">${sensores.map(card).join("")}</div>`;
    }
    if(!drones.length && !sensores.length && activeFilter!=="software"){
      html += `<div class="empty">Sin resultados para “${query}”. Prueba con otro término.</div>`;
    }
  }
  catalogEl.innerHTML = html;

  /* Software */
  const softMatch = SOFTWARE.filter(([n,d])=> !q || (n+" "+d).toLowerCase().includes(q));
  if(showSoftware && softMatch.length){
    softSection.style.display = "block";
    document.getElementById("soft-count").textContent = softMatch.length;
    document.getElementById("soft-grid").innerHTML = softMatch.map(([n,d])=>
      `<div class="soft"><b>${n}</b><span>${d}</span></div>`).join("");
  } else {
    softSection.style.display = "none";
  }

  document.querySelectorAll(".card").forEach(c=>
    c.addEventListener("click", ()=>openModal(c.dataset.id)));
}

/* ---- Modal / ficha técnica ---- */
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

function openModal(id){
  const e = EQUIPAMIENTO.find(x=>x.id===id);
  if(!e) return;
  const rows = e.specs.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join("");
  const chips = (e.features||[]).map(f=>`<span class="chip">${f}</span>`).join("");
  modal.innerHTML = `
    <div class="modal-hero" style="background:${ART_BG[e.art]||ART_BG.quad}">
      <button class="modal-close" id="closeBtn" aria-label="Cerrar">×</button>
      ${illustration(e.art)}
    </div>
    <div class="modal-body">
      <span class="brand">${e.brand} · ${TYPE_LABEL[e.type]||e.type}</span>
      <h2>${e.name}</h2>
      <div class="tag">${e.tagline}</div>
      <div class="status-row">
        <span class="status-tag"><span class="dot ${e.status.level}"></span>${e.status.label}</span>
        ${e.serial?`<span class="status-tag">N.º serie: ${e.serial}</span>`:""}
      </div>
      <p class="desc">${e.description}</p>
      <div class="chips" style="margin-bottom:18px">${chips}</div>
      <p class="specs-title">Características técnicas</p>
      <table class="specs">${rows}</table>
      ${e.poliza?`<div class="meta-line"><b>Seguro / inventario:</b> ${e.poliza}</div>`:""}
      <a class="doc-btn" href="${e.doc}" target="_blank" rel="noopener">
        📄 Documentación técnica del fabricante
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"
          stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
      </a>
    </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("closeBtn").addEventListener("click", closeModal);
}
function closeModal(){
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}
overlay.addEventListener("click", e=>{ if(e.target===overlay) closeModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal(); });

/* ---- Eventos de filtro / búsqueda ---- */
document.getElementById("tabs").addEventListener("click", e=>{
  const btn = e.target.closest(".tab"); if(!btn) return;
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.f;
  render();
});
document.getElementById("search").addEventListener("input", e=>{
  query = e.target.value; render();
});

render();
