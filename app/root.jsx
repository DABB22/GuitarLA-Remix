
import {useState, useEffect} from 'react'
// import de los componentes
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link,
    useRouteError,
    isRouteErrorResponse
} from '@remix-run/react'


// from '@remix-run/react' // cuando se requiere del cliente 
// from '@remix-run/node' // cuando se requiere del servidor

// Scripts -> va a tener todas las optimizaciones de Remix 
// LiveReload -> refleja los cambios sin necesidad de actualizar la pág 

import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

// configurar la información meta
export function meta() {
    return [
        { charset: 'utf-8' },
        { title: 'GuitarLA - Remix' },
        { viewport: "width=device-width,initial-scale=1" }
        
    ]
    
}


// para agregar hojas de estilo css y fuentes externas
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin : "true"
        }, 
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

// crear la funcion App() y exportarla - para que se pueda ejecutar el proyecto
export default function App() {

    // esta indicación lo que hace es que revisa si el codigo typeof window !== 'undefined' es del servido entonces no haga nada caso contrario que sea del navegador ejecute el storage
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect( () =>{
        // console.log('Desde useEffect')
        localStorage.setItem('carrito', JSON.stringify(carrito))
    },[carrito] )

    const agregarCarrito = (producto)=>{
        // console.log('Agregando al carrito', producto)
        if(carrito.some( productoState => productoState.id === producto.id  )){
            // console.log('ya existe')

            //? iterrar el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map( productoState => {

                if(productoState.id === producto.id){
                    //Ajustar la cantidad
                    // productoState.cantidad += producto.cantidad;
                    productoState.cantidad = producto.cantidad;
                }
                return productoState
            })
            //añadir el producto actualizado con la cantidad al carrito
            setCarrito(carritoActualizado)
        }else {
            setCarrito([...carrito, producto])
        }
    }

    const actualizarCantidad = producto => {
        // console.log(producto)

        const carritoActualizado = carrito.map( productoState => {
            if(productoState.id === producto.id){
                productoState.cantidad = producto.cantidad
            }
            return productoState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarProducto = id => {
        // console.log('eliminando', id)

        const carritoActualizado = carrito.filter( productoState => productoState.id !== id)
        setCarrito(carritoActualizado)
    }
    // console.log({carrito})
    return(
        <Document> 
            {/* es un placeholder donde se va ir mostrando los diferentes archivos que esten en routs */}
            <Outlet 
            // *
                context = {{
                    agregarCarrito: agregarCarrito, // también puede ser solo agregarCarrito
                    carrito,
                    actualizarCantidad,
                    eliminarProducto
                }}
            />
        </Document>
    )
}



// 
function Document({children}) {
    
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header/>
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/*
    ! ERROR!!!! *********************** MANEJO DE ERRORES ****************************
*/
export function ErrorBoundary(){
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <html lang="es">
                <head>
                    <title>{`Error! ${error.statusText}`}</title>
                    <Links />
                </head>
                <body>
                    <Header />
                    <div className='div-error'>
                        <h1 className='error-heading'>Ooops</h1>
                        <p className='error'>Status: {error.status}</p>
                        <p className='error'>{error.statusText}</p>
                        <Link className='error-enlace' to="/">Volver a la Página Principal</Link>
                    </div>
                    <Footer />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    }     else if (error instanceof Error) {
        return (
            <html lang="es">
                <head>
                    <title>{`Error! ${error.statusText}`}</title>
                    <Links />
                </head>
                <body>
                    <Header />
                    <div className='div-error'>
                        <h1>Error</h1>
                        <p>{error.message}</p>
                        <p>The stack trace is:</p>
                        <pre>{error.stack}</pre>
                        <Link className='error-enlace' to="/">Volver a la Página Principal</Link>
                    </div>
                    <Footer />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
      } else {
        return (
            <html lang="es">
                <head>
                    <title>{`Error! ${error.statusText}`}</title>
                    <Links />
                </head>
                <body>
                    <div className='div-error'>
                        <h1>Unknown Error</h1>;
                        <Link className='error-enlace' to="/">Volver a la Página Principal</Link>
                    </div>
                    <Footer />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        ) 
      }
      //http://remix.run/docs/en/main/route/error-boundary-v2
    }
    
  

// Documentos para revisar V2
//https://remix.run/docs/en/main/pages/v2