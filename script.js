/* script.js: array de 10 perfis, cards dinâmicos, modal slideshow e quiz melhorado */

const profiles = [
  {id:1,name:"Ana Souza",role:"Desenvolvedora Front-end",city:"São Paulo",area:"Desenvolvimento",photo:"https://i.pravatar.cc/400?img=12",skills:["HTML","CSS","JavaScript","React"],education:"Bacharel em Ciência da Computação - USP",experience:[{company:"TechNova",period:"2021–presente",desc:"Desenvolvimento de interfaces acessíveis."},{company:"StartJS",period:"2019–2021",desc:"Implementação de SPAs em React."}],soft:["Comunicação","Proatividade","Trabalho em equipe"],hobbies:["Ciclismo","Fotografia"]},
  {id:2,name:"Bruno Martins",role:"Cientista de Dados",city:"Porto Alegre",area:"Dados",photo:"https://i.pravatar.cc/400?img=5",skills:["Python","Pandas","ML","SQL"],education:"Mestrado em Estatística - UFRGS",experience:[{company:"DataMind",period:"2020–presente",desc:"Modelagem preditiva para varejo."}],soft:["Curiosidade","Raciocínio lógico","Autonomia"],hobbies:["Jogos de tabuleiro","Cozinhar"]},
  {id:3,name:"Carla Pereira",role:"Product Designer",city:"Belo Horizonte",area:"Design",photo:"https://i.pravatar.cc/400?img=24",skills:["Figma","UX Research","Design System"],education:"Design Gráfico - UFMG",experience:[{company:"UXLab",period:"2018–presente",desc:"Condução de pesquisas com usuários."}],soft:["Empatia","Criatividade","Storytelling"],hobbies:["Pintura","Yoga"]},
  {id:4,name:"Diego Silva",role:"Engenheiro DevOps",city:"Recife",area:"Desenvolvimento",photo:"https://i.pravatar.cc/400?img=15",skills:["Docker","Kubernetes","CI/CD","AWS"],education:"Engenharia de Computação - UFPE",experience:[{company:"CloudRoute",period:"2019–presente",desc:"Automação de pipelines."}],soft:["Organização","Resiliência"],hobbies:["Surf","Tecnologia embarcada"]},
  {id:5,name:"Elaine Costa",role:"Analista de Marketing Digital",city:"São Paulo",area:"Marketing",photo:"https://i.pravatar.cc/400?img=3",skills:["SEO","Ads","Content","Analytics"],education:"Comunicação Social - ESPM",experience:[{company:"Agência Alfa",period:"2017–presente",desc:"Planejamento de campanhas."}],soft:["Criatividade","Adaptação"],hobbies:["Leitura","Blog"]},
  {id:6,name:"Felipe Ramos",role:"Engenheiro de Software (Back-end)",city:"Belo Horizonte",area:"Desenvolvimento",photo:"https://i.pravatar.cc/400?img=9",skills:["Node.js","TypeScript","Postgres"],education:"Sistemas de Informação - PUC-MG",experience:[{company:"InfraCore",period:"2020–presente",desc:"APIs escaláveis e design de DB."}],soft:["Pensamento crítico","Mentoria"],hobbies:["Corrida","Open source"]},
  {id:7,name:"Gabriela Lima",role:"Analista de UX Research",city:"São Paulo",area:"Design",photo:"https://i.pravatar.cc/400?img=7",skills:["Entrevistas","Mapas de empatia","Teste A/B"],education:"Psicologia - Unifesp",experience:[{company:"ThinkUX",period:"2019–presente",desc:"Pesquisa qualitativa para mobile."}],soft:["Empatia","Observação"],hobbies:["Café com amigos","Fotografia"]},
  {id:8,name:"Hugo Almeida",role:"Especialista em Segurança",city:"Recife",area:"Desenvolvimento",photo:"https://i.pravatar.cc/400?img=30",skills:["PenTest","Criptografia","Network"],education:"Segurança da Informação - UFPE",experience:[{company:"GuardSec",period:"2016–presente",desc:"Auditorias de segurança."}],soft:["Detalhismo","Persistência"],hobbies:["Xadrez","Culinária"]},
  {id:9,name:"Isabela Rocha",role:"Analista de Dados",city:"Porto Alegre",area:"Dados",photo:"https://i.pravatar.cc/400?img=18",skills:["R","Power BI","SQL"],education:"Estatística - UFRGS",experience:[{company:"Insight Analytics",period:"2018–presente",desc:"Dashboards e ETL."}],soft:["Curiosidade","Comunicação"],hobbies:["Trilhas","Música"]},
  {id:10,name:"João Pedro",role:"Engenheiro de Machine Learning",city:"São Paulo",area:"Dados",photo:"https://i.pravatar.cc/400?img=11",skills:["TensorFlow","Python","MLOps"],education:"Engenharia Elétrica - Poli-USP",experience:[{company:"AiWorks",period:"2021–presente",desc:"Modelos de recomendação."}],soft:["Proatividade","Colaboração"],hobbies:["Basquete","Programação competitiva"]}
];

// Create cards
const container = document.getElementById('profiles-container');

function createCard(p){
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = p.id;
  card.innerHTML = `
    <img src="${p.photo}" alt="${p.name}">
    <div>
      <h4>${p.name}</h4>
      <p class="muted">${p.role} • ${p.city}</p>
      <div class="tag-list">${p.skills.slice(0,3).map(s=>`<span class="tag">${s}</span>`).join('')}</div>
    </div>
  `;
  card.addEventListener('click', ()=> openModal(p.id));
  return card;
}
profiles.forEach(p => container.appendChild(createCard(p)));

// Modal & slideshow
const modal = document.getElementById('profile-modal');
const modalClose = document.getElementById('modal-close');
const modalPhoto = document.getElementById('modal-photo');
const modalName = document.getElementById('modal-name');
const modalRole = document.getElementById('modal-role');
const modalSkills = document.getElementById('modal-skills');
const slideContent = document.getElementById('slide-content');
const slidePrev = document.getElementById('slide-prev');
const slideNext = document.getElementById('slide-next');
const slideCounter = document.getElementById('slide-counter');

let currentProfile = null;
let currentSlide = 0;

function openModal(id){
  const p = profiles.find(x=>x.id===id);
  if(!p) return;
  currentProfile = p;
  currentSlide = 0;
  modalPhoto.src = p.photo;
  modalName.textContent = p.name;
  modalRole.textContent = p.role + ' — ' + p.city;
  modalSkills.innerHTML = p.skills.map(s=>`<span class="tag">${s}</span>`).join('');
  renderSlide();
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

function renderSlide(){
  if(!currentProfile) return;
  const slides = [
    `<h4>Informações pessoais e acadêmicas</h4>
     <p><strong>Formação:</strong> ${currentProfile.education}</p>
     <p><strong>Hobbies:</strong> ${currentProfile.hobbies.join(', ')}</p>`,

    `<h4>Experiências e habilidades técnicas</h4>
     <ul>
      ${currentProfile.experience.map(ex=>`<li><strong>${ex.company}</strong> (${ex.period}) — ${ex.desc}</li>`).join('')}
     </ul>
     <p><strong>Skills:</strong> ${currentProfile.skills.join(', ')}</p>`,

    `<h4>Soft skills e interesses</h4>
     <p>${currentProfile.soft.join(' • ')}</p>`
  ];
  slideContent.innerHTML = slides[currentSlide];
  slideCounter.textContent = `${currentSlide+1} / ${slides.length}`;
}

slidePrev.addEventListener('click', ()=>{ currentSlide = (currentSlide+2) % 3; renderSlide(); });
slideNext.addEventListener('click', ()=>{ currentSlide = (currentSlide+1) % 3; renderSlide(); });

// Quiz improved
const quizModal = document.getElementById('quiz-modal');
const openQuizBtn = document.getElementById('open-quiz');
const closeQuizBtn = document.getElementById('close-quiz');
const quizContainer = document.getElementById('quiz-container');
const quizArea = document.getElementById('quiz-area');
const quizCity = document.getElementById('quiz-city');

openQuizBtn.addEventListener('click', ()=>{ quizModal.setAttribute('aria-hidden','false'); loadQuiz(); });
closeQuizBtn.addEventListener('click', ()=>{ quizModal.setAttribute('aria-hidden','true'); });

// Quiz pool with metadata area/city
const quizPool = [
  {area:'Desenvolvimento',city:'São Paulo',q:'Qual biblioteca é amplamente utilizada para construir interfaces reativas em JavaScript?',choices:['React','jQuery','Lodash','Backbone'],a:0,explain:'React popularizou o desenvolvimento baseado em componentes e virtual DOM.'},
  {area:'Dados',city:'Porto Alegre',q:'Qual linguagem é tradicionalmente usada em análises estatísticas?',choices:['R','HTML','CSS','PHP'],a:0,explain:'R possui pacotes estatísticos robustos e é bastante usado em análise.'},
  {area:'Design',city:'Belo Horizonte',q:'Qual ferramenta é referência para prototipagem e design de interfaces?',choices:['Figma','Notepad','Excel','Terminal'],a:0,explain:'Figma é colaborativo e muito usado por times de design.'},
  {area:'Marketing',city:'São Paulo',q:'O que significa SEO?',choices:['Search Engine Optimization','Social Engagement Objective','System Event Output','Secure Encrypted Online'],a:0,explain:'SEO otimiza conteúdo para motores de busca.'},
  {area:'Desenvolvimento',city:'Recife',q:'O que CI/CD significa no contexto de engenharia de software?',choices:['Integração contínua / Entrega contínua','Controle de versão local','Cliente/Servidor','Computação integrada'],a:0,explain:'CI/CD automatiza testes e deploys.'},
  {area:'Dados',city:'Porto Alegre',q:'Qual é o propósito do ETL em pipelines de dados?',choices:['Extrair, Transformar e Carregar dados','Executar Testes Locais','Enviar Tarefas Livres','Elevar Taxas de Latência'],a:0,explain:'ETL prepara dados para análises e relatórios.'},
  {area:'Design',city:'São Paulo',q:'Qual princípio é central para UX?',choices:['Empatia pelo usuário','Forçar bugs','Ignorar feedback','Minimizar testes'],a:0,explain:'UX foca em entender e resolver necessidades reais.'},
  {area:'Marketing',city:'Recife',q:'Qual métrica costuma indicar engajamento em redes sociais?',choices:['Taxa de engajamento','Velocidade do servidor','Tamanho do banco','Latência de rede'],a:0,explain:'Taxa de engajamento relaciona interações ao alcance.'}
];

let quizFiltered = [];
let quizIndex = 0;
let quizScore = 0;
let answered = false;

function loadQuiz(){
  const area = quizArea.value;
  const city = quizCity.value;
  quizFiltered = quizPool.filter(q => (area === 'all' || q.area === area) && (city === 'all' || q.city === city));
  if(quizFiltered.length === 0) quizFiltered = quizPool.slice();
  quizIndex = 0; quizScore = 0; answered = false;
  renderQuiz();
}

function renderQuiz(){
  const q = quizFiltered[quizIndex];
  quizContainer.innerHTML = `
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.choices.map((c,i)=>`<button data-i="${i}">${c}</button>`).join('')}
    </div>
    <div class="quiz-progress">Pergunta ${quizIndex+1} de ${quizFiltered.length}</div>
  `;
  document.querySelectorAll('.quiz-options button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      if(answered) return;
      answered = true;
      const chosen = Number(e.currentTarget.dataset.i);
      const correct = q.a;
      if(chosen === correct){
        e.currentTarget.classList.add('correct');
        quizScore++;
      } else {
        e.currentTarget.classList.add('wrong');
        // marcar opção correta
        document.querySelectorAll('.quiz-options button')[correct].classList.add('correct');
      }
      // mostrar explicação
      const expl = document.createElement('p'); expl.style.marginTop='12px'; expl.style.color='var(--muted)'; expl.textContent = q.explain;
      quizContainer.appendChild(expl);

      // avançar após delay
      setTimeout(()=>{ if(quizIndex < quizFiltered.length -1){ quizIndex++; answered=false; renderQuiz(); } else finishQuiz(); }, 1400);
    });
  });
}

function finishQuiz(){
  quizContainer.innerHTML = `
    <h3>Resultado</h3>
    <p class="quiz-result">Você acertou <strong>${quizScore}</strong> de ${quizFiltered.length} perguntas.</p>
    <p style="color:var(--muted)">Obrigado por participar — reflita sobre as explicações para atualizar seu conhecimento.</p>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:12px">
      <button class="btn-primary" id="quiz-restart">Refazer Quiz</button>
      <button class="btn-secondary" id="quiz-close">Fechar</button>
    </div>
  `;
  document.getElementById('quiz-restart').addEventListener('click', ()=>{ loadQuiz(); });
  document.getElementById('quiz-close').addEventListener('click', ()=>{ quizModal.setAttribute('aria-hidden','true'); });
}

// demo filter button
document.getElementById('demo-filter').addEventListener('click', ()=>{
  const filtered = profiles.filter(p=>p.skills.includes('JavaScript'));
  container.innerHTML = '';
  filtered.forEach(p=>container.appendChild(createCard(p)));
});

// initialize subtle load animation
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.card').forEach((c,i)=>{ c.style.opacity=0; c.style.transform='translateY(12px)'; setTimeout(()=>{ c.style.transition='all 500ms cubic-bezier(.2,.9,.3,1)'; c.style.opacity=1; c.style.transform='none'; }, 60*i); });
});
