const urlBackend = "https://musicas-backend-six.vercel.app"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

const inputTitulo = document.getElementById("titulo")
const inputArtista = document.getElementById("artista")
const inputGenero = document.getElementById("genero")
const inputAno = document.getElementById("ano")
const inputDuracao = document.getElementById("duracao")

const botaoSalvar = document.getElementById("botaoSalvar")

async function buscarMusica() {
    try {
        const resposta = await fetch(`${urlBackend}/musica/${id}`)
        if (!resposta.ok) {
            throw new Error(`Falha ao buscar música: ${resposta.status}`)
        }

        const musica = await resposta.json()

        inputTitulo.value = musica.titulo
        inputArtista.value = musica.artista
        inputGenero.value = musica.genero
        inputAno.value = musica.ano
        inputDuracao.value = musica.duracao
    } catch (error) {
        console.error("Não foi possível carregar a música:", error)
        alert("Não foi possível carregar a música.")
    }
}

buscarMusica()

botaoSalvar.addEventListener("click", salvarAlteracoes)

async function salvarAlteracoes() {
    if (
        inputTitulo.value === "" ||
        inputArtista.value === "" ||
        inputGenero.value === "" ||
        inputAno.value === "" ||
        inputDuracao.value === ""
    ) {
        alert("Preencha todos os campos!")
        return
    }

    const musica = {
        titulo: inputTitulo.value,
        artista: inputArtista.value,
        genero: inputGenero.value,
        ano: inputAno.valueAsNumber,
        duracao: inputDuracao.valueAsNumber
    }

    try {
        const resposta = await fetch(`${urlBackend}/editar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(musica)
        })
        if (!resposta.ok) {
            throw new Error(`Falha ao editar música: ${resposta.status}`)
        }

        const respostaTransformada = await resposta.json()

        alert(respostaTransformada.mensagem)

        window.location.href = "index.html"
    } catch (error) {
        console.error("Não foi possível salvar as alterações:", error)
        alert("Não foi possível salvar as alterações.")
    }
}