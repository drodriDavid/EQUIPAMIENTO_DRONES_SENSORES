/* =====================================================================
   App de inventario — render (tarjetas / tabla), filtros, buscador, ficha
   Estilo institucional claro
   ===================================================================== */

/* ---- Color por tipo de ilustración (fondo claro + trazo) ---- */
const ART = {
  quad:          { bg:"#eef4fc", stroke:"#1556b0", accent:"#2f80d8" },
  industrial:    { bg:"#eaf1fb", stroke:"#0f3e83", accent:"#1556b0" },
  camera:        { bg:"#f1edfb", stroke:"#5b3fb0", accent:"#8266d6" },
  thermal:       { bg:"#fdeeea", stroke:"#c0502f", accent:"#e07a52" },
  lidar:         { bg:"#e6f6f6", stroke:"#0e8f8f", accent:"#23b2b2" },
  multispectral: { bg:"#e9f6ee", stroke:"#1a9d6b", accent:"#3cbb87" },
  hyperspectral: { bg:"#f3edfb", stroke:"#6a3fb0", accent:"#9466d6" },
};
/* Color de categoría (cuadradito en la tabla) */
const TYPE_META = {
  drone:  { label:"Dron",   color:"#1556b0" },
  sensor: { label:"Sensor", color:"#0e8f8f" },
};

/* Visual de un equipo: foto real (con respaldo a ilustración) o ilustración SVG */
function visual(e, cls){
  const c = ART[e.art] || ART.quad;
  if(e.img){
    return { bg:"#ffffff", inner:
      `<img class="art-img ${cls||""}" src="${e.img}" alt="${e.name}" loading="lazy"
         onerror="this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden')">` +
      `<span class="svg-fallback hidden">${illustration(e.art)}</span>` };
  }
  return { bg:c.bg, inner: illustration(e.art) };
}

/* ---- Ilustraciones SVG por tipo ---- */
function illustration(art){
  const c = ART[art] || ART.quad;
  const S = (inner) =>
    `<svg class="art" viewBox="0 0 120 120" fill="none" stroke="${c.stroke}" stroke-width="2.3"
       stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const A = c.accent, F = "#ffffff";
  switch(art){
    case "quad": return S(`
      <line x1="34" y1="34" x2="86" y2="86"/><line x1="86" y1="34" x2="34" y2="86"/>
      <circle cx="30" cy="30" r="13" stroke="${A}"/><circle cx="90" cy="30" r="13" stroke="${A}"/>
      <circle cx="30" cy="90" r="13" stroke="${A}"/><circle cx="90" cy="90" r="13" stroke="${A}"/>
      <line x1="20" y1="30" x2="40" y2="30"/><line x1="30" y1="20" x2="30" y2="40"/>
      <line x1="80" y1="30" x2="100" y2="30"/><line x1="90" y1="20" x2="90" y2="40"/>
      <line x1="20" y1="90" x2="40" y2="90"/><line x1="30" y1="80" x2="30" y2="100"/>
      <line x1="80" y1="90" x2="100" y2="90"/><line x1="90" y1="80" x2="90" y2="100"/>
      <rect x="48" y="48" width="24" height="20" rx="5" fill="${F}"/>
      <circle cx="60" cy="72" r="6" fill="${F}" stroke="${A}"/>`);
    case "industrial": return S(`
      <line x1="28" y1="40" x2="92" y2="40"/>
      <circle cx="22" cy="34" r="12" stroke="${A}"/><circle cx="98" cy="34" r="12" stroke="${A}"/>
      <line x1="12" y1="34" x2="32" y2="34"/><line x1="88" y1="34" x2="108" y2="34"/>
      <rect x="40" y="40" width="40" height="26" rx="7" fill="${F}"/>
      <line x1="34" y1="40" x2="30" y2="58"/><line x1="86" y1="40" x2="90" y2="58"/>
      <rect x="50" y="66" width="20" height="12" rx="3" fill="${F}" stroke="${A}"/>
      <circle cx="60" cy="86" r="7" fill="${F}" stroke="${A}"/>
      <line x1="44" y1="92" x2="76" y2="92" stroke="${A}"/>`);
    case "camera": return S(`
      <rect x="24" y="38" width="72" height="48" rx="10" fill="${F}"/>
      <path d="M44 38l6-9h20l6 9"/>
      <circle cx="60" cy="62" r="17"/><circle cx="60" cy="62" r="9" stroke="${A}"/>
      <circle cx="84" cy="48" r="2.6" fill="${A}" stroke="none"/>`);
    case "thermal": return S(`
      <rect x="24" y="40" width="72" height="44" rx="10" fill="${F}"/>
      <circle cx="50" cy="62" r="13"/><circle cx="50" cy="62" r="6" stroke="${A}"/>
      <path d="M74 50v24M82 50v24" stroke="${A}"/>
      <path d="M70 56q4-6 8 0t8 0" stroke="${A}"/>`);
    case "lidar": return S(`
      <ellipse cx="60" cy="34" rx="20" ry="9" fill="${F}"/>
      <path d="M40 34v10a20 9 0 0 0 40 0V34"/>
      <path d="M60 53 38 92M60 53 52 92M60 53 68 92M60 53 82 92" stroke="${A}"/>
      <path d="M34 92h52" stroke="${A}"/>
      <circle cx="46" cy="88" r="2" fill="${A}" stroke="none"/>
      <circle cx="60" cy="90" r="2" fill="${A}" stroke="none"/>
      <circle cx="74" cy="88" r="2" fill="${A}" stroke="none"/>`);
    case "multispectral": return S(`
      <rect x="26" y="32" width="68" height="56" rx="10" fill="${F}"/>
      <circle cx="44" cy="50" r="7"/><circle cx="60" cy="50" r="7" stroke="${A}"/>
      <circle cx="76" cy="50" r="7"/>
      <circle cx="52" cy="70" r="7" stroke="${A}"/><circle cx="68" cy="70" r="7"/>`);
    case "hyperspectral": return S(`
      <rect x="26" y="40" width="68" height="40" rx="9" fill="${F}"/>
      <circle cx="44" cy="60" r="12"/><circle cx="44" cy="60" r="5" stroke="${A}"/>
      <path d="M66 46h24M66 53h24M66 60h24M66 67h24M66 74h24" stroke="${A}"/>`);
    default: return S(`<rect x="34" y="34" width="52" height="52" rx="10"/>`);
  }
}

/* ---- Estado ---- */
let activeFilter = "all";
let view = "grid";
let query = "";

const catalogEl = document.getElementById("catalog");
const softSection = document.getElementById("software-section");

/* ---- Stats ---- */
(function renderStats(){
  const drones = EQUIPAMIENTO.filter(e=>e.type==="drone").length;
  const sensores = EQUIPAMIENTO.filter(e=>e.type==="sensor").length;
  const ops = EQUIPAMIENTO.filter(e=>e.status.level==="ok").length;
  const data = [
    [EQUIPAMIENTO.length,"Equipos"], [drones,"Drones"], [sensores,"Sensores"],
    [SOFTWARE.length,"Software"], [ops,"Operativos"],
  ];
  document.getElementById("stats").innerHTML = data.map(([n,l])=>
    `<div class="stat"><div class="n">${n}</div><div class="l">${l}</div></div>`).join("");
})();

/* ---- Búsqueda ---- */
function matches(e,q){
  if(!q) return true;
  const hay = [e.name,e.brand,e.tagline,e.description,e.serial,(e.features||[]).join(" "),
    e.specs.map(s=>s.join(" ")).join(" ")].join(" ").toLowerCase();
  return hay.includes(q);
}

/* ---- Tarjeta ---- */
function card(e){
  const v = visual(e);
  const chips = (e.features||[]).slice(0,4).map(f=>`<span class="chip">${f}</span>`).join("");
  return `
    <div class="card" data-id="${e.id}">
      <div class="thumb ${e.img?"photo":""}" style="background:${v.bg}">
        <span class="badge-type">${TYPE_META[e.type].label}</span>
        <span class="badge-status ${e.status.level}"><span class="dot"></span>${e.status.label}</span>
        ${v.inner}
      </div>
      <div class="card-body">
        <span class="brand">${e.brand}</span>
        <h3>${e.name}</h3>
        <div class="tag">${e.tagline}</div>
        <div class="chips">${chips}</div>
      </div>
    </div>`;
}

/* ---- Fila de tabla ---- */
function row(e){
  const tm = TYPE_META[e.type];
  const v = visual(e);
  const keyFeat = (e.features||[]).slice(0,3).map(f=>`<span class="chip">${f}</span>`).join(" ");
  return `
    <tr data-id="${e.id}">
      <td><div class="t-cell">
        <span class="t-thumb ${e.img?"photo":""}" style="background:${v.bg}">${v.inner}</span>
        <span><span class="t-name">${e.name}</span><br><span class="t-brand">${e.brand}</span></span>
      </div></td>
      <td class="hide-sm"><span class="t-type"><span class="sq" style="background:${tm.color}"></span>${tm.label}</span></td>
      <td class="hide-sm"><div class="chips">${keyFeat}</div></td>
      <td class="hide-sm"><span class="t-serial">${e.serial || "—"}</span></td>
      <td><span class="st ${e.status.level}"><span class="dot"></span>${e.status.label}</span></td>
      <td><span class="t-view">Ver ›</span></td>
    </tr>`;
}

/* ---- Render principal ---- */
function render(){
  const q = query.trim().toLowerCase();
  const showSoftware = (activeFilter==="all" || activeFilter==="software");

  let items = EQUIPAMIENTO.filter(e=>{
    if(activeFilter==="drone" && e.type!=="drone") return false;
    if(activeFilter==="sensor" && e.type!=="sensor") return false;
    if(activeFilter==="software") return false;
    return matches(e,q);
  });

  let html = "";
  if(activeFilter!=="software"){
    const drones = items.filter(e=>e.type==="drone");
    const sensores = items.filter(e=>e.type==="sensor");

    if(view==="table"){
      if(items.length){
        html += renderTable(items);
      } else {
        html += `<div class="empty">Sin resultados para “${query}”.</div>`;
      }
    } else {
      if(drones.length){
        html += `<div class="section-title">Drones / Aeronaves <span class="pill">${drones.length}</span></div>`;
        html += `<div class="grid">${drones.map(card).join("")}</div>`;
      }
      if(sensores.length){
        html += `<div class="section-title">Sensores / Cargas útiles <span class="pill">${sensores.length}</span></div>`;
        html += `<div class="grid">${sensores.map(card).join("")}</div>`;
      }
      if(!items.length){
        html += `<div class="empty">Sin resultados para “${query}”.</div>`;
      }
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

  document.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openModal(c.dataset.id)));
  document.querySelectorAll("tr[data-id]").forEach(r=>r.addEventListener("click",()=>openModal(r.dataset.id)));
}

function renderTable(items){
  return `
    <div class="table-wrap">
      <table class="inv">
        <thead><tr>
          <th>Equipo</th>
          <th class="hide-sm">Tipo</th>
          <th class="hide-sm">Características clave</th>
          <th class="hide-sm">Nº de serie</th>
          <th>Estado</th>
          <th></th>
        </tr></thead>
        <tbody>${items.map(row).join("")}</tbody>
      </table>
    </div>`;
}

/* ---- Modal / ficha técnica ---- */
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");

function openModal(id){
  const e = EQUIPAMIENTO.find(x=>x.id===id);
  if(!e) return;
  const vis = visual(e, "big");
  const rows = e.specs.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join("");
  const chips = (e.features||[]).map(f=>`<span class="chip">${f}</span>`).join("");
  modal.innerHTML = `
    <div class="modal-hero ${e.img?"photo":""}" style="background:${vis.bg}">
      <button class="modal-close" id="closeBtn" aria-label="Cerrar">×</button>
      ${vis.inner}
    </div>
    <div class="modal-body">
      <span class="brand">${e.brand} · ${TYPE_META[e.type].label}</span>
      <h2>${e.name}</h2>
      <div class="tag">${e.tagline}</div>
      <div class="status-row">
        <span class="status-tag ${e.status.level}"><span class="dot"></span>${e.status.label}</span>
        ${e.serial?`<span class="status-tag">N.º serie: ${e.serial}</span>`:""}
      </div>
      <p class="desc">${e.description}</p>
      <div class="chips" style="margin-bottom:18px">${chips}</div>
      <p class="specs-title">Características técnicas</p>
      <table class="specs">${rows}</table>
      ${e.poliza?`<div class="meta-line"><b>Seguro / inventario:</b> ${e.poliza}</div>`:""}
      <a class="doc-btn" href="${e.doc}" target="_blank" rel="noopener">
        Documentación técnica del fabricante
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"
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

/* ---- Eventos ---- */
document.getElementById("tabs").addEventListener("click", e=>{
  const btn = e.target.closest(".tab"); if(!btn) return;
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.f;
  render();
});
document.getElementById("viewToggle").addEventListener("click", e=>{
  const btn = e.target.closest("button"); if(!btn) return;
  document.querySelectorAll("#viewToggle button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  view = btn.dataset.v;
  render();
});
document.getElementById("search").addEventListener("input", e=>{
  query = e.target.value; render();
});

render();
