import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '~/models/guitarras.server' 
//* al nombrar de esta forma este archivo de la carpeta models se le indica a Remix que la parte del servidor es la que va a manejar la consulta en el servidor.

import ListadoGuitarras from '~/components/listado-guitarras'

export function meta() {
  return [{
    title: 'GuitarLA - Tienda de Guitarras',
    description: 'GuitarLA - Nuestra colección de guitarras'
  }]
}

export async function loader() {
    const guitarras = await getGuitarras()
    return guitarras.data
}

function Tienda() {
  const guitarras = useLoaderData()
  return (
      <ListadoGuitarras 
        guitarras={guitarras}
      />
  )
}

export default Tienda