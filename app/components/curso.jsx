
export default function Curso({curso}) {

    const { contenido, imagen, titulo } = curso

    return (
        <section className="curso">
        {/* 
            no hay manera de pasar la imagen de este archivo hacia la hoja de estilos de css
            definimos la etiqueta style y el atributo jsx, esto es una sintaxis de jsx para aplicar estilos
        */}
            <style jsx="true">{`
                .curso {
                   background-image: linear-gradient( to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7) ), url(${imagen.data.attributes.url})
                }
            `}</style>
            <div className="contenedor curso-grid">
                <div className="contenido">
                    <h2 className="heading">{titulo}</h2>
                    <p className="texto">{contenido}</p>
                </div>
            </div>
        </section>
    )
}
