const carrito = document.getElementById('carrito');
const footer = document.getElementById('footer');
const templateProducto = document.getElementById('templateProducto');
const templateFooter = document.getElementById('templateFooter');
//const fragment = document.createDocumentFragment();
const fragment = new DocumentFragment();

document.addEventListener('click', e => {

    //console.log(e.target.matches('.card .btn-outline-primary'));
    if (e.target.matches('.card .btn-outline-primary'))
    {
        agregarAlCarrito(e); 
    }

    //console.log(e.target.matches('.list-group-item .btn-outline-success'));
    if (e.target.matches('#carrito .list-group-item .btn-outline-success'))
    {
        btnAgregar(e);
    }

    //console.log(e.target.matches('.list-group-item .btn-outline-danger'));
    if (e.target.matches('#carrito .list-group-item .btn-outline-danger'))
    {
        btnQuitar(e);
    }

    //console.log(e.target.matches('#footer div .btn-outline-danger'));
    if (e.target.matches('#footer div .btn-outline-danger'))
    {
        cancelarCompra();
    }

    //console.log(e.target.matches('#footer div .btn-outline-success'));
    if (e.target.matches('#footer div .btn-outline-success'))
    {
        finalizarCompra();   
    }
})

let arrayCarrito = [];

const agregarAlCarrito = (e) => {
    const producto = {
        id: e.target.dataset.fruta,
        titulo: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }

    const indice = arrayCarrito.findIndex((item) => item.id === producto.id);

    if (indice === -1)
    {
        arrayCarrito.push(producto);
    }
    else
    {
        arrayCarrito[indice].cantidad++;
    }

    pintarCarrito();

}

const pintarCarrito = () => {
    carrito.textContent = "";

    arrayCarrito.forEach(item => {
        const clone = templateProducto.content.cloneNode(true);
        clone.querySelector('#tituloProducto').textContent = item.titulo;
        clone.querySelector('#cantidadProducto').textContent = item.cantidad;
        clone.querySelector('#totalProducto').textContent = item.precio * item.cantidad;

        clone.querySelector('.btn-outline-danger').dataset.id = item.id;
        clone.querySelector('.btn-outline-success').dataset.id = item.id;

        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);

    pintarFooter();
}

const pintarFooter = () => {
    //console.log("pintar footer");
    footer.textContent = "";

    const total = arrayCarrito.reduce((acc, current) => acc + current.cantidad * current.precio, 0);
    
    if (total > 0)
    {
        const clone = templateFooter.content.cloneNode(true);
        clone.querySelector('#totalCompra').textContent = total;
        footer.appendChild(clone);
    }
}

const cancelarCompra = () => {
    location.reload();
}

const finalizarCompra = () => {
    const totalCompra = footer.querySelector('#totalCompra').textContent;
    Swal.fire({
        title: "Solo falta pagar!",
        text: "Total: $" + totalCompra,
        icon: "success",
        confirmButtonText: "Pagar",
        backdrop: true,
        timer: 5000,
        timerProgressBar: true,
        position: "top",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false
    }).then((result) => {
        if (result.value)
        {
            location.reload();
        }
        else
        {
            Swal.fire({
                title: "Pagó cancelado!",
                icon: "error",
                backdrop: true,
                timer: 2000,
                timerProgressBar: true,
                position: "top",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false
            });    
        }
    })
}

const btnAgregar = (e) => {
    //console.log("tocaste agregar", e.target.dataset.id);
    arrayCarrito = arrayCarrito.map(item => {
        if (item.id === e.target.dataset.id)
        {
            item.cantidad++;    
        }
        return item;
    })

    pintarCarrito();
}

const btnQuitar = (e) => {
    // console.log("tocaste quitar", e.target.dataset.id);
    arrayCarrito = arrayCarrito.filter(item => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                
                if (item.cantidad === 0)
                    return
                return item;
            }
            else
            {
                return item;
            }
        }
        return item;
    })

    pintarCarrito();
}
