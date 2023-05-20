
//* Este archivo es el que va a manejar el routing dinamico en Remix, su sintaxis en el nombre debe empezar con signo de $ y seguido el nombre que se quiera dar

// localhost:8082/api/guitarras?filters[url]="url"&populate=imagen

import { useEffect, useState} from 'react'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'

export async function loader({params}) {
    const { guitarraUrl } = params
    // console.log(params)
    const guitarra = await getGuitarra( guitarraUrl )
    
    if(guitarra.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Guitarra No Encontrada'
        })
    }
    return guitarra
}

//? este data siempre existe cada vez que el loader tiene información y la pasa al componente.
export function meta({data}) {
    return [
        {  title: `GuitarLA - ${data?.data[0]?.attributes.nombre}` },
        {description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`}
    ]
}

function Guitarra() {

    const {agregarCarrito} = useOutletContext ()

    const [cantidad, setCantidad] = useState(0);

    const guitarra = useLoaderData()
    
    // console.log(guitarra)
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes

    const handleSubmit = e => {
        e.preventDefault();

        if(cantidad < 1){
            alert('Debes seleccinar una catidad')
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }

        agregarCarrito(guitarraSeleccionada)
    }

    return (
        <div className='guitarra'>
            <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

            <div className='contenido'>

                <h3>{nombre}</h3>
                <p className='texto'>{descripcion}</p>
                <p className='precio'>${precio}</p>

                <form onSubmit={handleSubmit} className='formulario'>

                    <label htmlFor='cantidad' >Cantidad</label>

                    <select 
                        onChange={e => setCantidad(parseInt(e.target.value))}
                        name="" id="cantidad"
                    >
                        <option value="0">--Seleccione--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input 
                        type="submit" 
                        value='Agregar al carrito'
                    />
                </form>
            </div>
        </div> 
    )
}

export default Guitarra