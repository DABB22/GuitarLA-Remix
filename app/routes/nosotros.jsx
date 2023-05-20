import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'
import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'

export function meta() {
  return [{
      title: 'GuitarLA - Sobre Nosotros',
      description: 'Venta de guitarras, blog de música' // muy recomendada para el SEO
  }]
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {
    return (

        <main className="contenedor nosotros main">
            <h2 className="heading">Nosotros</h2>

            <div className="contenido">
                <img src={imagen} alt="imagen sobre nosotros"/>

                <div>
                    <p>Etiam accumsan est et feugiat dictum. Praesent urna purus, finibus vitae maximus id, gravida a erat. Vivamus aliquet dapibus odio id tincidunt. Quisque commodo lacinia lorem, nec suscipit ligula mollis nec. In pulvinar purus maximus elit sodales feugiat. Sed id turpis risus. Suspendisse neque tortor, tincidunt porttitor risus non, ultrices vehicula eros.</p>

                    <p>Etiam accumsan est et feugiat dictum. Praesent urna purus, finibus vitae maximus id, gravida a erat. Vivamus aliquet dapibus odio id tincidunt. Quisque commodo lacinia lorem, nec suscipit ligula mollis nec. In pulvinar purus maximus elit sodales feugiat. Sed id turpis risus. Suspendisse neque tortor, tincidunt porttitor risus non, ultrices vehicula eros.</p>
                </div>
            </div>

        </main>

    )
}

export default Nosotros