
//? al nombrar de esta forma este archivo se le indica a Remix que la parte del servidor es la que va a manejar la consulta en el servidor.

export async function getGuitarras() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    return await respuesta.json()
}


//? filtro para buscar la guitarra por el url
export async function getGuitarra(url) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}