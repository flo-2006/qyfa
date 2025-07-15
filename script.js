const malla = document.getElementById("malla");

const mallaDatos = {
  "1° Año": {
    "1° Semestre": [
      { id: "qg1", nombre: "Química General 1", abre: ["qg2", "qo"] },
      { id: "bc", nombre: "Biología Celular", abre: ["fi"] },
      { id: "intro", nombre: "Introducción", abre: [] },
      { id: "mat", nombre: "Matemáticas", abre: ["calc", "fis", "bioest"] },
      { id: "integ", nombre: "Integrado", abre: ["fund"] },
      { id: "antro", nombre: "Antropología", abre: ["etica"] }
    ],
    "2° Semestre": [
      { id: "qg2", nombre: "Química General 2", abre: ["qa", "fq"] },
      { id: "bioest", nombre: "Bioestadística", abre: [] },
      { id: "fis", nombre: "Física", abre: [] },
      { id: "calc", nombre: "Cálculo", abre: [] },
      { id: "fund", nombre: "Fundamentos", abre: [] },
      { id: "etica", nombre: "Ética", abre: ["persoc"] }
    ]
  },
  "2° Año": {
    "1° Semestre": [
      { id: "qa", nombre: "Química Analítica Cuali/Cuantitativa", abre: ["aqi"] },
      { id: "qo", nombre: "Química Orgánica", abre: ["bqg", "qoa"] },
      { id: "fi", nombre: "Fisiología Integrada", abre: ["fp"] },
      { id: "fq", nombre: "Fisicoquímica", abre: ["tf1"] },
      { id: "salpop", nombre: "Salud Poblacional", abre: ["epid"] },
      { id: "gestper", nombre: "Gestión Personal", abre: [] }
    ],
    "2° Semestre": [
      { id: "aqi", nombre: "Análisis Químico Instrumental", abre: [] },
      { id: "bqg", nombre: "Bioquímica General", abre: ["microb"] },
      { id: "fp", nombre: "Fisiopatología", abre: ["farma1"] },
      { id: "qoa", nombre: "Química Orgánica Avanzada", abre: ["qf1"] },
      { id: "epid", nombre: "Epidemiología", abre: [] }
    ]
  },
  "3° Año": {
    "1° Semestre": [
      { id: "saludig", nombre: "Salud Digital", abre: [] },
      { id: "microb", nombre: "Microbiología", abre: [] },
      { id: "farma1", nombre: "Farmacología 1", abre: ["farma2"] },
      { id: "tf1", nombre: "Tecnología Farmacéutica 1", abre: ["tf2"] },
      { id: "qf1", nombre: "Química Farmacéutica 1", abre: ["qf2"] },
      { id: "persoc", nombre: "Persona y Sociedad", abre: [] }
    ],
    "2° Semestre": [
      { id: "bioet", nombre: "Bioética", abre: [] },
      { id: "farma2", nombre: "Farmacología 2", abre: ["farmcli1", "toxi"] },
      { id: "tf2", nombre: "Tecnología Farmacéutica 2", abre: ["legis"] },
      { id: "qf2", nombre: "Química Farmacéutica 2", abre: ["farmacog"] },
      { id: "elect1", nombre: "Electivo 1", abre: [] }
    ]
  },
  "4° Año": {
    "1° Semestre": [
      { id: "metod", nombre: "Metodología de Investigación", abre: [] },
      { id: "cc", nombre: "Control y Calidad", abre: ["biofarma"] },
      { id: "farmcli1", nombre: "Farmacia Clínica 1", abre: ["farmcli2"] },
      { id: "legis", nombre: "Legislación Farmacéutica", abre: [] },
      { id: "farmacog", nombre: "Farmacognosia y Fitoterapia", abre: [] },
      { id: "elect2", nombre: "Electivo 2", abre: [] }
    ],
    "2° Semestre": [
      { id: "biofarma", nombre: "Biofarmacia", abre: [] },
      { id: "farmcli2", nombre: "Farmacia Clínica 2", abre: [] },
      { id: "toxi", nombre: "Toxicología", abre: [] },
      { id: "farmasis", nombre: "Farmacia Asistencial", abre: [] }
    ]
  },
  "5° Año": {
    "1° Semestre": [
      { id: "gestmkt", nombre: "Gestión y Marketing", abre: [] },
      { id: "farmacov", nombre: "Farmacovigilancia y Tecnovigilancia", abre: [] },
      { id: "electeleg", nombre: "Electivo Elección", abre: [] },
      { id: "elect3", nombre: "Electivo 3", abre: [] }
    ],
    "2° Semestre": [
      { id: "internado", nombre: "Internado", abre: [] }
    ]
  }
};

const prerequisitos = {};
for (const anio in mallaDatos) {
  for (const semestre in mallaDatos[anio]) {
    mallaDatos[anio][semestre].forEach(ramo => {
      ramo.abre.forEach(dep => {
        if (!prerequisitos[dep]) prerequisitos[dep] = [];
        prerequisitos[dep].push(ramo.id);
      });
      if (!prerequisitos[ramo.id]) prerequisitos[ramo.id] = [];
    });
  }
}

const estado = {};

function puedeActivarse(id) {
  return prerequisitos[id].every(pre => estado[pre] === "aprobado");
}

function crearRamo(ramo, contenedor) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo);

  if (puedeActivarse(ramo.id)) {
    estado[ramo.id] = "activo";
  } else {
    estado[ramo.id] = "bloqueado";
    div.classList.add("bloqueado");
  }

  contenedor.appendChild(div);
}

function aprobarRamo(ramo) {
  if (estado[ramo.id] !== "activo") return;

  const div = document.getElementById(ramo.id);
  div.classList.add("aprobado");
  div.onclick = null;
  estado[ramo.id] = "aprobado";

  for (const ramoId in estado) {
    if (estado[ramoId] === "bloqueado" && puedeActivarse(ramoId)) {
      estado[ramoId] = "activo";
      document.getElementById(ramoId).classList.remove("bloqueado");
    }
  }
}

for (const anio in mallaDatos) {
  const contenedorAnio = document.createElement("div");
  contenedorAnio.className = "anio";

  const tituloAnio = document.createElement("h2");
  tituloAnio.textContent = anio;
  contenedorAnio.appendChild(tituloAnio);

  for (const semestre in mallaDatos[anio]) {
    const contenedorSemestre = document.createElement("div");
    contenedorSemestre.className = "semestre";

    const tituloSemestre = document.createElement("h3");
    tituloSemestre.textContent = semestre;
    contenedorSemestre.appendChild(tituloSemestre);

    mallaDatos[anio][semestre].forEach(ramo => crearRamo(ramo, contenedorSemestre));

    contenedorAnio.appendChild(contenedorSemestre);
  }

  malla.appendChild(contenedorAnio);
}
