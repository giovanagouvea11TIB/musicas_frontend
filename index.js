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
                        <button class="apagar" onclick="apagarMusica(${musica.id})">Apagar</button>
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

async function apagarMusica(id) {
    const confirmou = confirm("Tem certeza que quer apagar essa música?")

    if (!confirmou) {
        return
    }

    try {
        const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
            method: "DELETE"
        })
        if (!resposta.ok) {
            throw new Error(`Falha ao apagar música: ${resposta.status}`)
        }

        const respostaTransformada = await resposta.json()

        alert(respostaTransformada.mensagem)

        window.location.reload()
    } catch (error) {
        console.error("Não foi possível apagar a música:", error)
        alert("Não foi possível apagar a música.")
    }
}