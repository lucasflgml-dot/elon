// api/tweets.js - API para tweets aleatórios
export default function handler(request, response) {
  // Dados dos tweets - MESMOS DO ARQUIVO JSON
  const tweetsData = {
    "temas": {
      "tecnologia": [
        "O futuro é open source! 🚀 GitHub tá revolucionando como a gente programa #DevLife",
        "Python continua dominando o mundo da programação! 🐍 Melhor linguagem pra começar? #Python",
        "A IA tá ficando tão boa que até esse tweet poderia ser gerado por ela 🤖 #InteligenciaArtificial",
        "Será que um dia a gente vai programar só falando com o computador? 🤔 #FuturoDaTecnologia",
        "Celular com tela dobrável é modinha ou veio pra ficar? 📱 #Tecnologia"
      ],
      "games": [
        "A nova geração de consoles tá custando um rim! 💸 Vale a pena o investimento? #Gaming",
        "Jogo indie brasileiro merece mais atenção! 🇧🇷 Apoiem os devs locais #IndieGames",
        "Você prefere single-player com história ou multiplayer competitivo? 🎮 #Games",
        "Cloud gaming é o futuro ou só hype? ☁️ #GameStreaming",
        "Modo história vs. Modo online: qual te prende mais horas? ⏰ #Gamer"
      ],
      "futebol": [
        "O Brasileirão é o campeonato mais imprevisível do mundo! ⚽ Que jogo foi esse?? #Futebol",
        "VAR: salvador ou vilão? 🤔 Às vezes acho que piorou a arbitragem #VAR",
        "Time pequeno dando trabalho pros grandes é o que torna o futebol lindo! 👏 #Brasileirao",
        "Contratação do ano? Esse jogador veio pra fazer história! ✍️ #MercadoDaBola",
        "A torcida é o 12º jogador! Sem público, o futebol perde a alma 🙌 #Torcida"
      ],
      "cinema": [
        "Filme de herói cansa ou você ainda ama a Marvel? 🦸‍♂️ #Cinema",
        "Oscar 2024: qual filme merecia estar indicado e ficou de fora? 🏆 #Oscar",
        "Streaming tá matando o cinema ou salvando a indústria? 🎬 #Netflix",
        "Ator brasileiro que merecia mais reconhecimento internacional? 🇧🇷 #CinemaBrasileiro",
        "Qual a franquia que precisa voltar? Precisamos de mais filmes disso! 🔄 #Filmes"
      ],
      "musica": [
        "Funk, sertanejo ou pagode? Qual tá dominando seu Spotify? 🎵 #Musica",
        "Show no Brasil é carpo demais! 💰 Como justificar esses preços? #Shows",
        "Artista novo que você descobriu e tá viciado? 🔊 #NewMusic",
        "Playlist do verão já tem dono! Qual música não pode faltar? ☀️ #Verão",
        "Música brasileira tá num momento bom? 🇧🇷 Quem tá mandando bem? #MPB"
      ]
    }
  };

  // Permitir que qualquer site (Wix) acesse esta API
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Se for uma requisição OPTIONS (pré-voo), retorne OK
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Pegar todos os temas disponíveis
  const temas = Object.keys(tweetsData.temas);
  const tweetsSelecionados = [];
  
  // Para cada tema, escolher UM tweet aleatório
  temas.forEach(tema => {
    const tweetsDesseTema = tweetsData.temas[tema];
    const indiceAleatorio = Math.floor(Math.random() * tweetsDesseTema.length);
    const tweetEscolhido = tweetsDesseTema[indiceAleatorio];
    
    tweetsSelecionados.push({
      tema: tema,
      texto: tweetEscolhido,
      id: Math.random().toString(36).substring(7) // ID aleatório
    });
  });
  
  // Embaralhar a ordem dos tweets
  for (let i = tweetsSelecionados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tweetsSelecionados[i], tweetsSelecionados[j]] = [tweetsSelecionados[j], tweetsSelecionados[i]];
  }
  
  // Retornar apenas 5 tweets (para não ficar muito longo)
  const tweetsParaRetornar = tweetsSelecionados.slice(0, 5);
  
  // Adicionar data/hora
  const agora = new Date();
  tweetsParaRetornar.forEach(tweet => {
    tweet.horario = agora.toLocaleTimeString('pt-BR');
    tweet.data = agora.toLocaleDateString('pt-BR');
  });
  
  // Enviar resposta
  response.status(200).json({
    sucesso: true,
    quantidade: tweetsParaRetornar.length,
    tweets: tweetsParaRetornar,
    atualizado_em: agora.toISOString()
  });
}
