// Selecciona los elementos del DOM al principio del código
let formulario = document.querySelector("form");
let contenedorTareas = document.getElementById("contenedorTareas");
let spanTareasPendientes = document.getElementById("tareasPendientes");
let btnBorrarTodo = document.getElementById('btnBorrarTodo');

// Define las funciones antes de usarlas
function agregarTarea(e) {
  e.preventDefault();
  let tarea = document.getElementById("inputTarea").value.trim();

  if (tarea === "") {
    formulario.reset();
    return;
  }

  let nuevaTarea = document.createElement("li");
  nuevaTarea.classList.add("rounded", "d-flex", "justify-content-between");
  
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-check-input", "m-0")
  checkbox.addEventListener("change", () => {
    textoTarea.classList.toggle("completada");
    tareasPendientes();
  });
  
  nuevaTarea.appendChild(checkbox);
  
  let textoTarea = document.createElement("span");
  textoTarea.textContent = tarea;
  textoTarea.classList.add("flex-grow-1", "ms-3")
  nuevaTarea.appendChild(textoTarea);
  
  let botonBorrar = document.createElement("button");
  botonBorrar.classList.add("btn", "p-0");
  botonBorrar.innerHTML = '<i class="bi bi-trash fs-5 px-0"></i>';
  botonBorrar.addEventListener("click", () => {
    nuevaTarea.remove();
    tareasPendientes();
  });
  
  nuevaTarea.appendChild(botonBorrar);

  contenedorTareas.appendChild(nuevaTarea);
  tareasPendientes();
}

function tareasPendientes() {
  let tareasPendientes = contenedorTareas.querySelectorAll("input[type='checkbox']:not(:checked)").length;
  spanTareasPendientes.textContent = tareasPendientes;
}

function borrarTodo() {
  contenedorTareas.innerHTML = "";
  tareasPendientes();
}

// Asigna los eventos al final del código
formulario.addEventListener("submit", agregarTarea);
btnBorrarTodo.addEventListener('click', borrarTodo);