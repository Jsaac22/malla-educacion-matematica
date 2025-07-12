document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      // Si está bloqueado, no se puede hacer nada
      if (curso.classList.contains("bloqueado")) return;

      // Marcar como aprobado visualmente
      curso.classList.toggle("aprobado");

      // Revisar si al aprobar este curso, se pueden desbloquear otros
      const id = curso.dataset.id;

      cursos.forEach((otroCurso) => {
        // Si ya está aprobado, saltarse
        if (otroCurso.classList.contains("aprobado")) return;

        // Obtener requisitos
        const prereqs = otroCurso.dataset.prereqs;
        if (!prereqs) return;

        const requisitos = prereqs.split(",");

        // Verificar si TODOS los requisitos están aprobados
        const cumplidos = requisitos.every((req) => {
          const cursoRequisito = document.querySelector([data-id="${req}"]);
          return cursoRequisito && cursoRequisito.classList.contains("aprobado");
        });

        // Si ya se cumplen los requisitos, desbloquear
        if (cumplidos) {
          otroCurso.classList.remove("bloqueado");
        }
      });
    });
  });
});
