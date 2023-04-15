let formulario = document.querySelector("form");
let contenedorTareas = document.getElementById("contenedorTareas");
let spanTareasPendientes = document.getElementById("tareasPendientes");
let btnBorrarTodo = document.getElementById('btnBorrarTodo');

formulario.addEventListener("submit", agregarTarea);
btnBorrarTodo.addEventListener('click', borrarTodo)

function agregarTarea(e) {
  e.preventDefault();
  let tarea = document.getElementById("inputTarea").value.trim();

  if (tarea === "") {
    formulario.reset();
    return;
  }

  let nuevaTarea = document.createElement("li");
  nuevaTarea.className = "rounded d-flex justify-content-between";
  
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input m-0"
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      textoTarea.classList.add("completada");
    } else {
      textoTarea.classList.remove("completada");
    }
    tareasPendientes(); // Llama a la función tareasPendientes al cambiar el checkbox
  });
  
  nuevaTarea.appendChild(checkbox);
  
  let textoTarea = document.createElement("span");
  textoTarea.textContent = tarea;
  textoTarea.className = "flex-grow-1 ms-3"
  nuevaTarea.appendChild(textoTarea);
  
  let botonBorrar = document.createElement("button");
  botonBorrar.className = "btn p-0";
  botonBorrar.innerHTML = '<i class="bi bi-trash fs-5 px-0"></i>';
  botonBorrar.addEventListener("click", function () {
    nuevaTarea.remove();
    tareasPendientes--; // Disminuye tareasPendientes al borrar una tarea
    tareasPendientes();
  });
  
  nuevaTarea.appendChild(botonBorrar);

  contenedorTareas.appendChild(nuevaTarea);
  tareasPendientes();
}

function borrarTarea(boton) {
  let tarea = boton.parentNode;
  tarea.remove();
  tareasPendientes();
}

function tareasPendientes() {
  let tareasPendientes = contenedorTareas.querySelectorAll("input[type='checkbox']:not(:checked)").length;
  spanTareasPendientes.innerHTML = tareasPendientes;
}

function borrarTodo() {
  while (contenedorTareas.firstChild) {
    contenedorTareas.removeChild(contenedorTareas.firstChild);
  }
  tareasPendientes();
}