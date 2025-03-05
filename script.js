const html = document.querySelector('html') //aqui selecionamos o elemento html do DOM
const focoBt = document.querySelector('.app__card-button--foco') //seleciona o botão de foco
const curtoBt = document.querySelector('.app__card-button--curto') //seleciona o botão de descanso curto
const longoBt = document.querySelector('.app__card-button--longo') //seleciona o botão de descanso longo
const banner = document.querySelector('.app__image') //variavel para o elemento de imagem do banner
const titulo = document.querySelector('.app__title') //seleciona o titulo da aplicação
const botoes = document.querySelectorAll('.app__card-button') // seleciona todos os botões de card
const startPauseBt = document.querySelector('#start-pause') //seleciona o botão de iniciar e pausar
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") //seleciona o icone do botão iniciar e pausar
const musicaFocoInput = document.querySelector('#alternar-musica') // input que alterna a música
const iniciarOuPausarBt = document.querySelector('#start-pause span') //seleciona o texto dentro do botão iniciar e pausar
const musica = new Audio('/sons/luna-rise-part-one.mp3') //musica inserida como objeto audio
const audioPlay = new Audio('/sons/play.wav'); //seleciona o som do botão que sinaliza o play
const audioPausa = new Audio('/sons/pause.mp3'); //seleciona o som do botão que sinaliza a pausa
const audioTempoFinalizado = new Audio('./sons/beep.mp3') //seleciona o som do botão que sinaliza a finalização
const tempoNaTela = document.querySelector('#timer') //variável elemento que mostra o timer


let tempoDecorridoEmSegundos = 1500 //define o tempo inicial em segundos (25 minutos)
let intervaloId = null //Inicializa a variável para armazenar o ID do intervalo


musica.loop = true //Aqui definimos que a música deve tocar em loop


//Evento para alternar a musica quando o input é alterado
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) { //Se a música estiver pausada
        musica.play() //Ela é tocada 
    } else {
        musica.pause() //É pausada
    }
})

//Evento para o botão foco
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500 //Tempo definido de 25 minutos
    alterarContexto('foco') //Altera para o modo foco
    focoBt.classList.add('active') //adiciona a classe de CSS active ao botão foco
})

//Evento para o botão descanso curso
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300 //Tempo definido de 5 minutos
    alterarContexto('descanso-curto') //Altera para o modo descanso curto 
    curtoBt.classList.add('active') //adiciona a classe de CSS active ao botão descanso curto
})

//Evento para o botão descanso longo
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900 //Tempo definido de 15 minutos
    alterarContexto('descanso-longo') //Altera o contexto para descanso longo
    longoBt.classList.add('active') //adiciona a classe de CSS active ao botão descanso longo
})

//função que altera o contexto da aplicação
function alterarContexto(contexto) {
    mostrarTempo()//Atualiza o tempo na tela
    botoes.forEach(function (contexto){ //Remove a classe 'active' de todos os botões
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto) //Define um atributo de contexto no elemento <html>
    banner.setAttribute('src', `/imagens/${contexto}.png`)//Altera a imagem do banner com base no contexto
    switch (contexto) {//Altera o título com base no contexto
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

//Função de contagem regressiva
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){ //Se o time acabar
        audioTempoFinalizado.play() //toca o som de finalizado e exibe a mensagem abaixo
        alert('Tempo finalizado!')
        zerar() //chama a função que zera o tempo
        return
    }
    tempoDecorridoEmSegundos -= 1 //Decrementa o tempo em 1 segundo
    mostrarTempo() //Atualiza o tempo na tela
}

//Evento para o botão de iniciar/pausar
startPauseBt.addEventListener('click', iniciarOuPausar)

//Função para iniciar ou pausar o timer
function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play() //Audio é pausado
        zerar() //zera o time
        return
    }
    audioPlay.play() //Audio iniciado
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`) //icone que muda conforme seleciona o começar e o pausar
}

//Função que zera o timer
function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`) //icone que muda conforme seleciona o começar e o pausar
    intervaloId = null
}

//Função que mostra o tempo
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString ('pt-Br', {minute: '2-digit', second: '2-digit'}) //horário definido em minutos e segundos
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
