import { Question, SendResponseForms } from '../telegram'

export const questions = [
  {
    type: 'text',
    text: 'Qual o nome do animal?',
    id: 0,
    query: 'name',
    allowedAnswers: ['*'],
  },
  {
    type: 'text',
    text: 'De que espécie ele é?',
    id: 1,
    query: 'species',
    allowedAnswers: [
      'cachorro',
      'gato',
      'pássaro',
      'equino',
      'bovino',
      'animal silvestre',
    ],
  },
  {
    type: 'text',
    text: 'Qual sua raça? (Caso não saiba, coloque "indefinida")',
    id: 2,
    query: 'breed',
    allowedAnswers: ['*'],
  },
  {
    type: 'text',
    text: 'Qual o sexo dele?',
    id: 3,
    query: 'sex',
    allowedAnswers: ['macho', 'femea'],
  },
  {
    type: 'text',
    text: 'Qual seu porte?',
    id: 4,
    query: 'size',
    allowedAnswers: ['muito pequeno', 'pequeno', 'médio', 'grande'],
  },
  {
    type: 'text',
    text: 'Qual a personalidade dele?',
    id: 5,
    query: 'personality',
    allowedAnswers: ['calmo', 'agitado', 'curioso', 'etc'],
  },
  {
    type: 'text',
    text: 'Ele é castrado?',
    id: 6,
    query: 'is_castrated',
    allowedAnswers: ['sim', 'não'],
  },
  {
    type: 'text',
    text: 'Ele tem chip?',
    id: 7,
    query: 'has_chip',
    allowedAnswers: ['sim', 'não'],
  },
  {
    type: 'photo',
    text: 'Mande uma foto do animal para ser exibido no site',
    id: 8,
    query: 'photo',
  },
] as Question[]

const { SITE_BASE_URL, JOAO_USERNAME, MATEUS_USERNAME } = process.env

interface ConstantsResponseForms extends SendResponseForms {
  today: string
}

export const texts = {
  result: (link: string, animalId: number) =>
    `Obrigado por responder! Link aqui: ${link}, com o id: ${animalId}`,
  helloCreators: (firstName: string) =>
    `Olá ${firstName}, tudo bem?\n\nPara me usar, você pode executar os seguintes comandos:\n\n/start: reinicia o bot\n/new: adicionar um novo animal ao site\n/cancel: cancela o animal que está sendo adicionado\n/help: tirar dúvidas do bot\n\nUse com moderação.`,
  helloHenrique: `Olá Henrique, tudo bem?\n\nEu sou o bot do Projeto Jurema e por aqui você poderá adicionar novos animais ao nosso site.\n\nPara me usar, você pode executar os seguintes comandos:\n\n/start: reinicia o bot\n/new: adicionar um novo animal ao site\n/cancel: cancela o animal que está sendo adicionado\n/help: tirar dúvidas do bot\n\nSe você tiver alguma dúvida, pode dizer para o ${MATEUS_USERNAME} ou para o ${JOAO_USERNAME}`,
  nonChatFound: `Não entendi o que você quis dizer 🤨\n\nSe estiver tentando adicionar um novo animal ao site, digite /new.\n\nEm caso de dúvidas, você também pode falar com o ${JOAO_USERNAME} ou com o ${MATEUS_USERNAME}`,
  unauthorized: `Olá, tudo bem?\n\nCaso você queira saber mais sobre nós, precisa ir para o site oficial do Projeto Jurema.\n\nBasta clicar no link abaixo👇\n\n${SITE_BASE_URL}`,
  invalid: 'Tipo inválido',
  imageError: 'Erro ao subir imagem',
  canceled: 'Cadastro de animal cancelado!',
  list: 'Lista de animais:',
  deleted: 'Animal deletado!',
  nonSpecified:
    'Nenhum animal foi especificado, use por exemplo:\n\n/delete 1230',
  newResponseForms: ({
    name,
    today,
    about,
    city,
    email,
    phone,
    animalLink,
  }: ConstantsResponseForms) =>
    `${name}\n\nInformações do futuro dono\nData do requerimento: ${today}\nMotivo: ${about}\nCidade: ${city}\nEmail: ${email}\nTelefone: ${phone}\n\nLink do animal: ${animalLink}`,
}
