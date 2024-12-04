import { obtenerRegistro, eliminar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputCategoria = document.querySelector("#nombre");
const formularioEliminar = document.querySelector(".form-eliminar");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");

const urlParams = new URLSearchParams(queryParams);
const idCategoria = urlParams.get("id");

async function cargarCategoria() {
  const { data: categoria, error } = await obtenerRegistro(
    "categoria",
    "idcategoria",
    idCategoria
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = categoria[0].idcategoria;
  inputCategoria.value = categoria[0].nombre.trim();
}

cargarCategoria();

formularioEliminar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnDelete.disabled = true;
  const { error } = await eliminar("categoria", "idcategoria", idCategoria);
  btnDelete.value = "Eliminando...";
  if (error) {
    mensajeEliminar.textContent = "Error al eliminar el registro";

    if (error.code === "23503") {
      mensajeEliminar.textContent =
        "Error al eliminar el registro, tiene registros asociados";
    }

    console.log(error);
    btnDelete.value = "Eliminar";
    btnDelete.disabled = false;
    return;
  }
  mensajeEliminar.classList.remove("red");
  mensajeEliminar.textContent = "Registro eliminado correctamente";
  setTimeout(() => {
    window.location.href = "categoria.html";
  }, 4000);
});