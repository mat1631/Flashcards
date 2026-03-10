const CARDS = [
    {
        cat: "🏠 Smart Home",
        q: "O que é uma Casa Inteligente (Smart Home) e como a IoT a torna possível?",
        a: "É uma residência onde dispositivos como lâmpadas, câmeras e eletrodomésticos são conectados à internet e controlados remotamente via smartphone ou assistentes de voz, automatizando rotinas do dia a dia."
    },
    {
        cat: "🏠 Smart Home",
        q: "Como sensores de presença contribuem para a economia de energia em uma Smart Home?",
        a: "Eles detectam automaticamente quando há pessoas nos ambientes e ajustam iluminação e climatização somente quando necessário, evitando desperdício em cômodos vazios."
    },
    {
        cat: "🏠 Smart Home",
        q: "Cite dois eletrodomésticos inteligentes e descreva como cada um usa IoT.",
        a: "Geladeira inteligente: mapeia alimentos e sugere receitas com base no estoque. Lavarroupas inteligente: programa ciclos nos horários de menor tarifa de energia elétrica."
    },
    {
        cat: "🌱 Agricultura IoT",
        q: "O que é Agricultura de Precisão e qual é seu principal objetivo?",
        a: "É o uso de sensores IoT, drones e big data para monitorar lavouras com extrema precisão, otimizando insumos, aumentando a produtividade e reduzindo o impacto ambiental."
    },
    {
        cat: "🌱 Agricultura IoT",
        q: "Quais são os quatro dados coletados por sensores de solo na agricultura de precisão?",
        a: "Os sensores medem em tempo real: umidade do solo, temperatura, pH e nível de nutrientes. Esses dados são enviados à nuvem para orientar decisões de irrigação e adubação."
    },
    {
        cat: "🌱 Agricultura IoT",
        q: "Como drones com câmeras multiespectrais ajudam o agricultor antes mesmo dos sintomas visíveis?",
        a: "Sobrevoando a lavoura, identificam áreas com deficiência hídrica ou nutricional por meio do espectro de luz invisível ao olho humano, permitindo intervenções precoces e precisas."
    },
    {
        cat: "🌱 Agricultura IoT",
        q: "Qual é a redução no consumo de água que sistemas de irrigação inteligente podem proporcionar?",
        a: "Até 50% de redução, pois os aspersores são ativados ou desligados automaticamente com base nos dados climáticos e nas leituras dos sensores de solo, evitando irrigação desnecessária."
    },
    {
        cat: "🌱 Agricultura IoT",
        q: "Segundo a McKinsey, qual é o impacto da IoT na produtividade e nos custos da agricultura?",
        a: "A IoT pode aumentar a produtividade das lavouras em até 20% e reduzir custos operacionais em até 15%, representando um avanço significativo para a segurança alimentar global."
    },
];

let idx = 0;
let flipped = false;
let answers = new Array(CARDS.length).fill(null);
let nOk = 0, nErr = 0;

function render() {
    const c = CARDS[idx];
    const n = idx + 1;
    const total = CARDS.length;


    document.getElementById('fTag').textContent = c.cat;
    document.getElementById('bTag').textContent = 'resposta';
    document.getElementById('qNum').textContent = String(n).padStart(2, '0') + ' / ' + total;
    document.getElementById('qText').textContent = c.q;
    document.getElementById('aText').textContent = c.a;
    document.getElementById('aCat').textContent = c.cat;


    document.getElementById('card').classList.toggle('flipped', flipped);


    const pct = (n / total * 100).toFixed(0);
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progLabel').textContent = n + ' de ' + total;


    document.getElementById('sCard').textContent = n + '/' + total;
    document.getElementById('sOk').textContent = nOk;
    document.getElementById('sErr').textContent = nErr;
    const done = nOk + nErr;
    document.getElementById('sPct').textContent = done ? Math.round(nOk / done * 100) + '%' : '—';


    document.getElementById('prevBtn').disabled = idx === 0;
    document.getElementById('nextBtn').disabled = idx === total - 1;


    const btnOk = document.getElementById('btnOk');
    const btnErr = document.getElementById('btnErr');
    btnOk.className = 'ans-btn' + (answers[idx] === true ? ' ok' : '');
    btnErr.className = 'ans-btn' + (answers[idx] === false ? ' err' : '');


    const ff = document.getElementById('faceFront');
    ff.classList.remove('answered-ok', 'answered-err');
    if (answers[idx] === true) ff.classList.add('answered-ok');
    if (answers[idx] === false) ff.classList.add('answered-err');
}

function flipCard() {
    flipped = !flipped;
    document.getElementById('card').classList.toggle('flipped', flipped);
}

function go(dir) {
    idx = Math.max(0, Math.min(CARDS.length - 1, idx + dir));
    flipped = false;
    render();
}

function mark(ok) {
    if (!flipped) { toast('Vire o cartão primeiro!', 'warn'); return; }
    if (answers[idx] !== null) return;

    answers[idx] = ok;
    if (ok) { nOk++; toast('Ótimo! ✓', 'ok'); }
    else { nErr++; toast('Continue estudando ✗', 'err'); }
    render();

    setTimeout(() => {
        if (idx < CARDS.length - 1) go(1);
        else showResult();
    }, 850);
}

function showResult() {
    document.querySelector('.arena').style.display = 'none';
    document.getElementById('btnRow').style.display = 'none';
    document.getElementById('navRow').style.display = 'none';
    document.querySelector('.cat-dots').style.display = 'none';

    const pct = Math.round(nOk / CARDS.length * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚';
    const msg = pct >= 80 ? 'Amassou demais!'
        : pct >= 50 ? 'Ta quase, tenta mais uma vez!'
            : 'Você não tá prestando atenção nas aulas.';

    document.getElementById('resultCard').innerHTML = `
    <span class="result-icon">${emoji}</span>
    <div class="result-title">${msg}</div>
    <p class="result-sub">Você completou todos os flashcards</p>
    <span class="result-big">${nOk}/${CARDS.length}</span>
    <span class="result-pct">${pct}% de aproveitamento</span>
    <button class="restart-btn" onclick="restart()">↺ Jogar novamente</button>
  `;
    document.getElementById('resultWrap').style.display = 'block';
}

function restart() {
    idx = 0; flipped = false;
    answers = new Array(CARDS.length).fill(null);
    nOk = 0; nErr = 0;

    document.querySelector('.arena').style.display = '';
    document.getElementById('btnRow').style.display = '';
    document.getElementById('navRow').style.display = '';
    document.querySelector('.cat-dots').style.display = '';
    document.getElementById('resultWrap').style.display = 'none';
    render();
}

function toast(msg, type) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast show t-${type}`;
    setTimeout(() => el.classList.remove('show'), 2000);
}


render();

