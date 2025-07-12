document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  // Inicializar: deshabilitar los cursos con requisitos
  cursos.forEach((curso) => {
    const prereqs = curso.dataset.prereqs;
    if (prereqs) {
      curso.classList.add("disabled");
      curso.disabled = true;
    }
  });

  // Al hacer clic en un curso
  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      if (curso.classList.contains("disabled")) return;

      curso.classList.toggle("aprobado");

      const cursoId = curso.dataset.id;

      // Recorre todos los cursos y revisa si pueden desbloquearse
      cursos.forEach((c) => {
        const prereqs = c.dataset.prereqs?.split(",");
        if (prereqs && prereqs.includes(cursoId)) {
          const todosAprobados = prereqs.every((id) =>
            document.querySelector([data-id="${id}"])?.classList.contains("aprobado")
          );
          if (todosAprobados) {
            c.classList.remove("disabled");
            c.disabled = false;
          }
        }
      });
    });
  });
});
