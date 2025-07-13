document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  cursos.forEach((curso) => {
    curso.addEventListener("click", () => {
      if (curso.classList.contains("bloqueado")) return;

      curso.classList.toggle("aprobado");

      const id = curso.dataset.id;

      cursos.forEach((otroCurso) => {
        if (!otroCurso.dataset.prereqs) return;

        const prerequisitos = otroCurso.dataset.prereqs.split(",");

        const todosCumplidos = prerequisitos.every(reqId => {
          const cursoReq = document.querySelector([data-id="${reqId}¨]);
          return cursoReq && cursoReq.classList.contains("aprobado");
        });

        if (todosCumplidos) {
          otroCurso.classList.remove("bloqueado");
        } else {
          otroCurso.classList.add("bloqueado");
        }
      });
    });
  });
});
