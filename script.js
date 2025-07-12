const cursos = [
  { id: "EDU101", nombre: "Introducción a la Educación", requisitos: [] },
  { id: "MAT101", nombre: "Álgebra Básica", requisitos: [] },
  { id: "MAT102", nombre: "Fundamentos de la Matemática", requisitos: [] },
  { id: "EDU201", nombre: "Didáctica de la Matemática I", requisitos: ["EDU101"] },
  { id: "MAT201", nombre: "Álgebra Lineal", requisitos: ["MAT101"] },
  { id: "MAT202", nombre: "Cálculo Diferencial", requisitos: ["MAT102"] },
  { id: "EDU301", nombre: "Didáctica de la Matemática II", requisitos: ["EDU201"] },
  { id: "MAT301", nombre: "Cálculo Integral", requisitos: ["MAT202"] },
  { id: "MAT302", nombre: "Geometría Euclidiana", requisitos: ["MAT101"] },
  { id: "MAT401", nombre: "Estadística I", requisitos: ["MAT102"] },
  { id: "EDU401", nombre: "Didáctica de la Estadística", requisitos: ["MAT401", "EDU301"] },
];

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";
  
  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso");
    div.dataset.id = curso.id;
    div.textContent = curso.nombre;

    const requisitosCumplidos = curso.requisitos.every(req => aprobados.has(req));
    if (!requisitosCumplidos && curso.requisitos.length > 0) {
      div.classList.add("bloqueado");
    }

    if (aprobados.has(curso.id)) {
      div.classList.add("tachado");
    }

div.addEventListener("click", () => {
      if (div.classList.contains("bloqueado")) return;

      if (aprobados.has(curso.id)) {
        aprobados.delete(curso.id);
      } else {
        aprobados.add(curso.id);
      }

      crearMalla(); // Recargar visual
    });

    contenedor.appendChild(div);
  });
}

crearMalla();