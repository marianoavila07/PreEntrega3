// Verificar si el localStorage no está cargado
const usuarioStorage = localStorage.getItem("usuario");
const mostrarFormulario = !usuarioStorage;

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    localStorage.setItem("usuario", usuario);
    alert(`Bienvenid@ ${usuario}`);
    location.reload(); // Recargar la página
}

// Mostrar el formulario si el localStorage no está cargado
if (mostrarFormulario) {
    // Crear el section con la clase container
    const section = document.createElement("section");
    section.classList.add("container");

    // Crear el formulario de inicio de sesión
    const form = document.createElement("form");
    form.id = "loginForm";
    form.classList.add("mt-4");

    // Crear la etiqueta y el campo de entrada para el usuario
    const usuarioLabel = document.createElement("label");
    usuarioLabel.textContent = "Usuario:";
    usuarioLabel.setAttribute("for", "usuario");

    const usuarioInput = document.createElement("input");
    usuarioInput.type = "text";
    usuarioInput.id = "usuario";
    usuarioInput.name = "usuario";
    usuarioInput.required = true;
    usuarioInput.classList.add("form-control");

    // Crear el botón de inicio de sesión
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Iniciar sesión";
    submitButton.classList.add("btn", "btn-primary");

    // Agregar los elementos al formulario
    form.appendChild(usuarioLabel);
    form.appendChild(usuarioInput);
    form.appendChild(submitButton);

    // Agregar el formulario al section
    section.appendChild(form);

    // Agregar el section al documento
    document.body.appendChild(section);

    // Agregar el evento de envío del formulario
    form.addEventListener("submit", handleSubmit);
}

// Definir la lista de productos
const productos = [
    { id: 1, nombre: "camisa", precio: 2000, imagen: "img/camisa-negra.png" },
    { id: 2, nombre: "zapato", precio: 1750, imagen: "img/zapato.png" },
    { id: 3, nombre: "pantalon", precio: 2315, imagen: "img/jeans.png" },
    { id: 4, nombre: "media", precio: 1000, imagen: "img/medias.png" },
    { id: 5, nombre: "gorra", precio: 1220, imagen: "img/gorra.png" },
];

// Recorrer la lista de productos
productos.forEach((item) => {
    // Crear un elemento div para cada producto
    let div = document.createElement("div");
    div.classList.add("container");
    div.innerHTML = `
      <div class="card perso">
        <img src="${item.imagen}" class="card-img-top perso img-fluid" alt="producto ${item.nombre}">
        <div class="card-body">
          <p class="card-title">Id: ${item.id}</p>
          <p class="card-title">Nombre: ${item.nombre}</p>
          <p class="card-title">Precio: $${item.precio}</p>
          <button id="agregar" class="btn btn-primary">Agregar</button>
        </div>
      </div>
    `;
    // Agregar el elemento div al documento
    document.body.append(div);
});

// Obtener todos los botones de agregar
const botonesAgregar = document.querySelectorAll('#agregar');

// Agregar un evento de clic a cada botón de agregar
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', agregarProducto);
});

// Función para agregar un producto
function agregarProducto(event) {
    // Obtener el producto seleccionado
    const productoId = event.target.parentElement.querySelector('.card-title:nth-child(1)').textContent.split(' ')[1];
    const producto = productos.find((item) => item.id === parseInt(productoId));

    // Obtener los productos previamente guardados en el Local Storage
    let productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Verificar si el producto ya está agregado
    const productoExistente = productosGuardados.find((item) => item.id === producto.id);
    if (productoExistente) {
        alert('El producto ya ha sido agregado anteriormente.');
        return;
    }

    // Agregar el nuevo producto a la lista
    productosGuardados.push(producto);

    // Guardar la lista actualizada en el Local Storage
    localStorage.setItem('productos', JSON.stringify(productosGuardados));

    // Mostrar los productos agregados
    mostrarProductosAgregados();
}

// Función para mostrar los productos agregados
function mostrarProductosAgregados() {
    // Obtener el contenedor donde se mostrarán los productos agregados
    const contenedorProductos = document.getElementById('contenedor-productos');

    // Obtener los productos guardados en el Local Storage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Limpiar el contenedor antes de mostrar los productos
    contenedorProductos.innerHTML = '';

    // Recorrer la lista de productos guardados y crear un elemento para cada uno
    productosGuardados.forEach((producto) => {
        const divProducto = document.createElement('div');
        divProducto.innerHTML = `
      <div class="card perso2">
        <img src="${producto.imagen}" class="card-img-top perso2 img-fluid" alt="producto ${producto.nombre}">
        <div class="card-body">
          <p class="card-title">Id: ${producto.id}</p>
          <p class="card-title">Nombre: ${producto.nombre}</p>
          <p class="card-title">Precio: $${producto.precio}</p>
        </div>
      </div>
    `;
        contenedorProductos.appendChild(divProducto);
    });
}

// Llamar a la función para mostrar los productos agregados al cargar la página
mostrarProductosAgregados();