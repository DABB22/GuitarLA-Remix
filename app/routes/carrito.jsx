import { useEffect, useState} from 'react'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
// ClientOnly - componente en el cual puedes decirle que ciertas partes se ejecuten unicamente en el cliente.
import styles from '~/styles/carrito.css'


export function meta() {
    return [{
        title: 'GuitarLA - Carrito de compras',
        description: 'Venta de guitarras, carrito' // muy recomendada para el SEO
    }]
  }

export function links(){
    return [{
        rel: 'stylesheet',
        href: styles
    }]
}


function Carrito() {

    const [total, setTotal] = useState(0)
    const { carrito, actualizarCantidad, eliminarProducto } = useOutletContext()
    // console.log(carrito)

    useEffect(()=>{
        const calcularTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0)
        setTotal(calcularTotal)
    }, [carrito])

  return (
    <ClientOnly fallback={'cargando...'}>
        { () => (
        <main className="contenedor car">

            <h1 className="heading">Carrito de Compras</h1>

            <div className="contenido">

                <div className="carrito">
                    <h2>Articulos</h2>

                    {carrito?.length === 0 ? 'Carrito Vacío' : (
                        carrito?.map( producto => (
                            <div key={producto.id} className='producto'>
                                <div>
                                    <img src={producto.imagen} alt={`imagen del producto ${producto.nombre}`} />
                                </div>

                                <div>
                                    <p className='nombre'>{producto.nombre}</p>
                                    <div className='div-cantidad'>
                                        <p className='cantidad'>Cantidad:</p>
                                        <select 
                                            name="" 
                                            id=""
                                            className='select'
                                            value = {producto.cantidad}
                                            onChange={ e => actualizarCantidad({
                                                cantidad: +e.target.value,
                                                id: producto.id
                                            }) }
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <p className='precio'>$ <span>{producto.precio}</span></p>
                                    <p className='subtotal'>SubTotal: $ <span>{producto.cantidad * producto.precio}</span></p>

                                </div>

                                <button 

                                    type='button' 
                                    className='btn-eliminar'
                                    onClick={ () => eliminarProducto(producto.id) }

                                >X</button>

                            </div>
                        ))
                    )}
                </div>

                <aside className="resumen">
                    <h3>Resumen Del Pedido</h3>
                    <p>Total a pagar: ${total}</p>
                </aside>

            </div>
            {/* <p className='contadorCarrito'>{carrito.length}</p> */}
        </main>
        )}
    </ClientOnly>
  )
}

export default Carrito