var engine = {
    "cores": ['white','green','purple','pink','red','yellow','black','orange','grey','blue','brown','olive'],
    "hexadecimais":{
        'white': '#ffffff',
        'green': '#02ef00',
        'purple': '#790093',
        'pink': '#ff1493',
        'red': '#e90808',
        'yellow': '#e7d703',
        'black': '#000000',
        'orange': '#f16529',
        'grey': '#ebebeb',
        'blue': '#0000ff',
        'brown': '#4b3621',
        'olive': '#808000'
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random()*engine.cores.length);
    var legendaCorCaixa = document.getElementById('corCaixa');
    var nomeCorSorteada =  engine.cores[indexCorSorteada];
    legendaCorCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}
function aplicarCor(nomeCor){
    var caixaCor = document.getElementById('cor-atual');
    caixaCor.style.backgroundColor = nomeCor;
    caixaCor.style.backgroundImage = "url('img/caixa-fechada.png')";
    caixaCor.style.backgroundSize = "cover";
}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById("pontos");

    engine.moedas += valor;

    if(valor < 0){
        audioErrou.play();
    }
    if(valor > 0){
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCor(sortearCor());
var btn = document.getElementById("btn-responder");
var transcricaoAudio = "";
if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "en-US";

  gravador.onstart = function(){
    btn.innerText = "Estou Ouvindo..."
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  }

  gravador.onend = function(){
    btn.innerText = "RESPONDER"
    btn.style.backgroundColor = "transparent";
    btn.style.color = "white";
  }

  gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    var resposta = document.getElementById("corCaixa").innerText.toUpperCase();
   
   
    if(transcricaoAudio === resposta){
        atualizaPontuacao(1);
    }else{
        atualizaPontuacao(-1);
    }
    aplicarCor(sortearCor());
  }
}else{
    alert('Não tem suporte ao seu Navegador !');
}

btn.addEventListener('click', function(e){
    gravador.start();
})