const urlBackend = "http://localhost:3000"
const listaMusicas = document.getElementById("listaMusicas")

function escaparHTML(texto) {
    const elemento = document.createElement("span")
    elemento.textContent = texto
    return elemento.innerHTML
}

async function buscarMusicas() {
    try {
        const resposta = await fetch(urlBackend)
        if (!resposta.ok) {
            throw new Error(`Falha ao buscar músicas: ${resposta.status}`)
        }

        const musicas = await resposta.json()

        musicas.forEach((musica) => {
            listaMusicas.innerHTML += `
                <article class="musica">
                    <h2>${escaparHTML(musica.titulo)}</h2>
                    <p class="artista">${escaparHTML(musica.artista)}</p>
                    <p class="detalhes">${escaparHTML(musica.genero)} | ${escaparHTML(musica.ano)} | ${escaparHTML(musica.duracao)} min</p>
                    <div class="acoes">
                        <a class="editar" href="editar.html?id=${encodeURIComponent(musica.id)}">Editar</a>
                        <button class="apagar">Apagar</button>
                    </div>
                </article>
            `
        })
    } catch (error) {
        console.error("Não foi possível carregar as músicas:", error)
        listaMusicas.textContent = "Não foi possível carregar as músicas."
    }
}

buscarMusicas()