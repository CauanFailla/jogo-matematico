const btn_adição = document.querySelector('.btn-adição')
const btn_subtração = document.querySelector('.btn-subtração')
const btn_multiplicação = document.querySelector('.btn-multiplicação')
const btn_divisão = document.querySelector('.btn-divisão')
const btnFim_continuarPraticando = document.querySelector('.btnFim-continarPraticando')
const btnFim_voltar = document.querySelector('.btnFim-voltar')
const sec_escolhas = document.querySelector('.sec-escolhas')
const sec_jogo = document.querySelector('.sec-jogo')
const p_adição1 = document.querySelector('.adiçãoValue1')
const p_adição2 = document.querySelector('.adiçãoValue2')
const ops = [...document.querySelectorAll('.op')]
const btn_voltar  = document.querySelector('.btn-voltar')
const sec_finalizado = document.querySelector('.sec-finalizado')
let Oops = [0,0,0,0]  
const operador_visual  = document.querySelector('.ope-visual')
const btn_confirmarEscolha =  document.querySelector('.btn-confirmarEscolha')
const btn_sound = document.querySelectorAll('.btn-som')
let resultado
let rodadas = 0
let tempoEspera = false
let acesso_sub = false

document.querySelector('main').style.height = '100vh'

const Jogador = {
    nivel: 0,
    acertosAdição: 0,
    acertosRodada: 0,
    acertosSubtração:0,
    acertosMultiplicação:0,
    acertosDivisão:0,

    getNivel() {
        return this.nivel
    },
    getAcertosGeral() {
        return this.acertosGeral
    },
    getAcertosAdição() {
        return this.acertosAdição
    },
    getAcertosSubtração() {
        return this.acertosSubtração
    },
    getAcertosMultiplicação() {
        return this.acertosMultiplicação
    },
    getAcertosDivisão() {
        return this.acertosDivisão
    },
}

const Valores= {
    firstValue: '',
    secondValue: '',
    getFisrtValue() {
        return this.firstValue
    },
    getSecondValue() {
        return this.secondValue
    },
}

function retirarSecs() {
    let secs = document.querySelectorAll('.secs')
    secs.forEach((s)=>{
        s.style.display = 'none'
    })
}

function gerarValores(operador,ateNf,ateNs) {
    Valores.firstValue =Math.round( Math.random() * ateNf)
    Valores.secondValue =Math.round( Math.random() * ateNs)
    p_adição1.innerHTML = Valores.getFisrtValue()
    p_adição2.innerHTML = Valores.getSecondValue()
   
    switch (operador) {
        case '+':
            resultado = Number(Valores.firstValue) + Number(Valores.secondValue)    
            break;
        case  '-':
            resultado = Number(Valores.firstValue) - Number(Valores.secondValue)   
            break
        case 'x':
            resultado = Number(Valores.firstValue) * Number(Valores.secondValue)
            break
        case '/':
            resultado = Number(Valores.firstValue) / Number(Valores.secondValue)
            break
        default:
            break;
    }
    for (let c = 0; c<4;  c++) {
        if (operador == '/') {
            Oops[c] = Math.random() * 100
        } else {
            Oops[c] = Math.round(Math.random() * 100)
        }
    }
    Oops[Math.round(Math.random() * 3)] = resultado
    ops.forEach((o,i)=>{
        if (operador == '/') {
            o.innerHTML = Oops[i].toFixed(1).replace('.',',')
        } else {
            o.innerHTML = Oops[i]
        }
        
    })
    console.log(Oops)
}

function removerEscolhido() {
    ops.forEach((o)=>{
        o.classList.remove('opEscolhida')
        o.classList.remove('opErrado')
        o.classList.remove('Ocerto')
    })
}

ops.forEach((o)=>{
    o.addEventListener('click',()=>{
        if (!tempoEspera) {
            removerEscolhido()
            o.classList.add('opEscolhida')
        }
    })
})

function verificarEscolhas() {
    return ops.find((o)=>{
        return o.classList.contains('opEscolhida')
    })
}

function constarAcerto() {
    switch (operador_visual.innerHTML) {
        case '+':
            Jogador.acertosAdição++
            if (Jogador.acertosAdição <=4) {
                document.querySelector('.btn-adição p').innerHTML = `${Jogador.acertosAdição}/4`
            }
            break;
        case '-':
            Jogador.acertosSubtração++
            if (Jogador.acertosSubtração <=4) {
                document.querySelector('.btn-subtração p').innerHTML = `${Jogador.acertosSubtração}/4`
            }
            break
        case 'x':
            Jogador.acertosMultiplicação++
            if (Jogador.acertosMultiplicação <=4) {
                document.querySelector('.btn-multiplicação p').innerHTML = `${Jogador.acertosMultiplicação}/4`
            }
            break
        case '/':
            Jogador.acertosDivisão++
            if (Jogador.acertosDivisão <=4) {
                document.querySelector('.btn-divisão p').innerHTML = `${Jogador.acertosDivisão}/4`
            }
            break
        default:
            break;
    }
    if (Jogador.acertosAdição >= 4) {
        btn_subtração.classList.remove('escolha-bloqueado')
        btn_subtração.classList.add('escolha-liberado')
        btn_subtração.classList.add('btn-som')
    }
    if (Jogador.acertosSubtração >= 4) {
        btn_multiplicação.classList.remove('escolha-bloqueado')
        btn_multiplicação.classList.add('escolha-liberado')
        btn_multiplicação.classList.add('btn-som')
    }
    if (Jogador.acertosMultiplicação >= 4) {
        btn_divisão.classList.remove('escolha-bloqueado')
        btn_divisão.classList.add('escolha-liberado')
        btn_divisão.classList.add('btn-som')
    }
}

function valoresAcertosAtt(aR,a) {
    document.querySelector('.p-acertos').innerHTML = `Acertos: ${aR}/4`
    document.querySelector('.p-aFase').innerHTML = `Acesso para proxima fase: ${a>=4?'Liberado':a+'/4'}`
}

function atualizarValoresFim() {
    console.log('Passou')
    if (operador_visual.innerHTML=='+'){valoresAcertosAtt(Jogador.acertosRodada,Jogador.acertosAdição)}
    if (operador_visual.innerHTML=='-'){valoresAcertosAtt(Jogador.acertosRodada,Jogador.acertosSubtração)}
    if (operador_visual.innerHTML=='x'){valoresAcertosAtt(Jogador.acertosRodada,Jogador.acertosMultiplicação)}
    if (operador_visual.innerHTML=='/'){valoresAcertosAtt(Jogador.acertosRodada,Jogador.acertosDivisão)}
}

btn_adição.addEventListener('click',()=>{
    if (btn_adição.classList.contains('escolha-liberado')) {
        btn_voltar.style.display = 'block'
        operador_visual.innerHTML = '+'
        retirarSecs()
        sec_jogo.style.display = 'flex'
        gerarValores('+',100,100)        
        
    }
})

btn_subtração.addEventListener('click',()=>{
    if (btn_subtração.classList.contains('escolha-liberado')) {
        btn_voltar.style.display = 'block'
        operador_visual.innerHTML = '-'
        retirarSecs()
        sec_jogo.style.display = 'flex'
        gerarValores('-',100,60)
    }
})

btn_multiplicação.addEventListener('click',()=>{
    if (btn_multiplicação.classList.contains('escolha-liberado')) {
        btn_voltar.style.display = 'block'
        operador_visual.innerHTML = 'x'
        retirarSecs()
        sec_jogo.style.display = 'flex'
        gerarValores('x',10,10)
    }
})

btn_divisão.addEventListener('click',()=>{
    if (btn_divisão.classList.contains('escolha-liberado')) {
        operador_visual.innerHTML = '/'
        btn_voltar.style.display = 'block'
        retirarSecs()
        sec_jogo.style.display = 'flex'
        gerarValores('/',100,80)
    }
})

btn_voltar.addEventListener('click',(evt)=>{
    retirarSecs()
    sec_escolhas.style.display = 'flex'
    btn_voltar.style.display = 'none'
    rodadas = 0
    Jogador.acertosRodada = 0
})

function verificarAcerto() {
    ops.forEach((o,i)=>{
        if (o.classList.contains('opEscolhida')) {
            if (Oops[i] == resultado) {
                constarAcerto()
                Jogador.acertosRodada++
                console.log('Certo')
                console.log(o.innerHTML)
                tempoEspera = true
            } else {
                console.log('ERRADO')
                ops.forEach((op,i)=>{
                    if (Oops[i] == resultado) {
                        removerEscolhido()
                        o.classList.add('opErrado')
                        op.classList.add('Ocerto')
                        tempoEspera = true
                    }
                })
            }
        }
    })
}

function direcionarGeradorValores() {
    if (operador_visual.innerHTML == '+') {gerarValores('+',100,100)}
    if (operador_visual.innerHTML == '-') {gerarValores('-',100,60)}
    if (operador_visual.innerHTML == 'x') {gerarValores('x',10,10)}
    if (operador_visual.innerHTML == '/') {gerarValores('/',100,80)}
}

btn_confirmarEscolha.addEventListener('click',()=>{
    console.log('SIM')
    if (rodadas!=3) {
        if (!tempoEspera) {
            if (verificarEscolhas()) {
                rodadas++
                verificarAcerto()
                btn_confirmarEscolha.style.backgroundColor = '#ffa148'
                setTimeout(() => {
                    removerEscolhido()
                    direcionarGeradorValores()
                    tempoEspera = false
                    btn_confirmarEscolha.style.backgroundColor = '#EC9440'
                }, 1500);
            }
        }
    } else {
        verificarAcerto()
        atualizarValoresFim()
        removerEscolhido()
        Jogador.acertosRodada = 0
        console.log(Jogador.acertosRodada)
        sec_finalizado.style.display = 'block'
    }
})

btnFim_continuarPraticando.addEventListener('click',()=>{
    direcionarGeradorValores()
    sec_finalizado.style.display = 'none'
    rodadas++
})

btnFim_voltar.addEventListener('click',()=>{
    rodadas  = 0
    retirarSecs()
    sec_escolhas.style.display = 'flex'
    btn_voltar.style.display = 'none'
    sec_finalizado.style.display = 'none'
})

let som = new Audio('sound-click.mp3')
btn_sound.forEach((s)=>{
    s.addEventListener('click',()=>{
        if (s.classList.contains('escolha-liberado')) {
            som.play()
    
        }
    })
    
})
