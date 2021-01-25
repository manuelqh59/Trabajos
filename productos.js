// nos aseguramos que la pagina se ejecuta cuando este lista no solo el DOM
window.onload = function (){

    //Array de productos
    const productos = [
        {
            id: 1,
            img: 'imagenes/aceiteOliva.jpg',
            nombre: 'Cuac',
            descripcion: 'Aceite de Oliva - 500ml',
            precio: 3.99
        },
        {
            id: 2,
            img: 'imagenes/vino.jpg',
            nombre: 'Malasaña vino',
            descripcion: 'Vino de madrid - 1l',
            precio: 8.99
        },
        {
            id: 3,
            img: 'imagenes/agua.jpg',
            nombre: 'Agua',
            descripcion: 'Agua importancion - 500ml',
            precio: 7
        },
        {
            id: 4,
            img:'imagenes/soja.webp',
            nombre: 'Soja',
            descripcion: 'Soja para sushi - 500ml',
            precio: 4
        },
        {
            id: 5,
            img:'imagenes/alga.jpg',
            nombre: 'Alga japonesa',
            descripcion: 'Alga para sushi - 500g',
            precio: 5.99
        },
        {
            id: 6,
            img: 'imagenes/hongos.jpg',
            nombre: 'Hongos',
            descripcion: 'Hongos japonenes - 1kg',
            precio: 10.99
        },
        {
            id: 7,
            img: 'imagenes/picante.jpg',
            nombre: 'Picante',
            descripcion: 'Picante japones - 500ml',
            precio: 9.99
        },
        {
            id: 8,
            img:'imagenes/vinagre.jpg',
            nombre: 'Vinagre',
            descripcion: 'Vinagre especial para sushi - 500ml',
            precio: 15.99
        },
        {
            id: 9,
            img:'imagenes/ciruela.jpg',
            nombre: 'Ciruela',
            descripcion: 'Ciruela para sushi - 500g',
            precio: 5.99
        },
    ];

    //Selecionamos la parte de HTML con la etiqueta
    var $botonMenu = document.querySelector('#botonMenu');
    var $item = document.querySelector('#item');
    var $total = document.querySelector('#total');
    var $carrito = document.querySelector('#carrito');
    var $vaciar = document.querySelector('#vaciar');
    //Creamos un array para los productos del carrito
    var carrito = [];
    //Creamos la variable total para despues poder calcular el total
    var total = 0;


    //Hacemos una funcion para mostrar los productos
    function mostrarItems() {
        //Recorremos como si fuera un forEach
        for (let mostrar of productos){
            //Creamos el articulo y le asignamos una etiqueta class
            let divPrincipal = document.createElement('article');
            divPrincipal.classList.add('producto');
            //Creamos el titulo
            let titulo = document.createElement('h3');
            titulo.classList.add('producto-titulo');
            titulo.textContent = mostrar['nombre'];
            //Creamos la descripcion
            let descripcionProducto = document.createElement('p');
            descripcionProducto.classList.add('producto-descripcion');
            descripcionProducto.textContent = mostrar['descripcion'];
            //La imagen
            let imagen = document.createElement('img');
            imagen.classList.add('producto-imagen');
            imagen.setAttribute('src', mostrar['img']);
            //El precio
            let dinero = document.createElement('p');
            dinero.classList.add('producto-precio');
            dinero.textContent = mostrar['precio'] + '€';
            //El boton
            let boton = document.createElement('button');
            boton.classList.add('boton');
            boton.textContent = 'Comprar';
            boton.setAttribute('añadir', mostrar['id']);
            //Al cual le añadimos un evento el cual al hacer click ejecute otra funcion
            boton.addEventListener('click', añadirCarrito);
            //Por ultimo los insertamos
            divPrincipal.appendChild(imagen);
            divPrincipal.appendChild(titulo);
            divPrincipal.appendChild(descripcionProducto);
            divPrincipal.appendChild(dinero);
            divPrincipal.appendChild(boton);
            $item.appendChild(divPrincipal);
        }
    }

    //Creamos la funcion para añadir productos al carrito
    function añadirCarrito () {
        //Con el metodo push agregamos al array el producto a traves del atributo
        carrito.push(this.getAttribute('añadir'))
        //Llamamos a la funcion para calcular el total
        calcularTotal();
        //Actualizamos el carrito de la compra
        actualizarCarrito();
    }

    //Creamos la funcion para borrar los productos del carrito
    function borrarProducto(){
        //Obtenemos el producto del cual pulsamos el boton
        let id = this.getAttribute('item');
        //filtramos los producctos y los borramos
        carrito = carrito.filter(function (idCarrito){
            //si el producto es distino de tipo y no es igual devuelve verdadero
            return idCarrito !== id;
        });
        //Actualizamos  el carrito de la compra
        actualizarCarrito();
        //Volvemos a calcular el total
        calcularTotal();
    }

    //Creamos la funcion para calcular el total
    function calcularTotal(){
        //Ponemos el precio a 0
        total = 0;
        //Ahora recorremos el array del carrito de compra
        for (let producto of carrito){
            //Mientras, de cada prodcto cogemos el precio
            let productoComprado = productos.filter(function(productoDeProductos){
                return productoDeProductos['id'] == producto;
            });
            //Sumamos el precio al total que actuaria de contador
            total = total + productoComprado[0]['precio'];
        }
        //Solo lo queremos con dos decimales y actualizamos el precio en el HTML
        let decimales = total.toFixed(2);
        //Actualizamos en el html
        $total.textContent = decimales;
    }

    //Creamos la funcion para vaciar el carrito de la compra
    function vaciarCarrito(){
        //Borramos los productos que haya guardados
        carrito = [];
        // Actualizamos 
        actualizarCarrito();
        //Llamamos a la funcion para que ponga el total a 0
        calcularTotal();
    }

    //Creamos una funcion para actualizar el carrito de compra
    function actualizarCarrito(){
        //Primero vaciamos el carrito
        $carrito.textContent = '';
        //Eliminamos duplicados
        /* Utilizamos Set para añadirle mas metodos y funcionalidades
        al array */
        //Tambien usamos el operador de propagacion para no escribir todos los datos
        let duplicados = [...new Set(carrito)];
        //Recorremos el array 
        duplicados.forEach(function (item){
            //Filtramos los productos por id
            let producto = productos.filter(function(productoDeProductos){
                return productoDeProductos['id'] == item;
        });
        //Contamos las veces que se repite el producto
        let unidades = carrito.reduce(function(total, itemId){
            //Si son estrictamente iguales entonces item es igual al total +1 sino es igual al total
            return itemId === item ? total += 1 : total;
            
        },0);

        //Creamos una lista dentro del carrito
        let carro = document.createElement('li');
        carro.classList.add('producto-comprado');

        //Creamos el campo de imagen para asignar la imagen del producto
        let imagenCarrito = document.createElement('img');
        imagenCarrito.classList.add('imagenCarrito');
        imagenCarrito.src = producto[0]['img'];

        //Creamos el texto dentro del carrito
        let texto = document.createElement('p');
        texto.classList.add('textoCarrito');
        
        //Mostramos por pantalla
        texto.textContent = `${unidades} x ${producto[0]['nombre']} - ${producto[0]['precio']}€`;

        //Por ultimo pasamos al boton de borrar
        let botonBorrar = document.createElement('button');
        botonBorrar.classList.add('botonBorrar');
        botonBorrar.textContent = 'Eliminar';
        botonBorrar.setAttribute('item',item);
        botonBorrar.addEventListener('click', borrarProducto);

        carro.appendChild(imagenCarrito);
        carro.appendChild(texto);
        carro.appendChild(botonBorrar);
        $carrito.appendChild(carro);

        
    });
    }

    //Añadimos un evento de click el cual vacie el carrito 
    $vaciar.addEventListener('click', vaciarCarrito);
    
    //Creamos la funcion ocultar para que por defecto aparezca oculto
    function ocultar(){
        document.getElementById('oculto').style.display = 'none';
    }

    //Ahora creamos una funcion que dependiendo de su estado, muestre u oculte el carrito
    function mostrarOcultar(){
        var elemento = document.getElementById('oculto');

        if (elemento.style.display == "none") {
            elemento.style.display = "block"
        } else {
            elemento.style.display = "none"
        };
    };

    //Llamamos a la funcion para que el carrito este oculto por defecto
    ocultar();

    //Creamos el evento el cual al hacer click en el icono del carrito lo muestre
    $botonMenu.addEventListener('click', mostrarOcultar);
    
    mostrarItems();

}
