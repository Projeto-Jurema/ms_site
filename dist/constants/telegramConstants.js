"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.texts = exports.questions = void 0;
exports.questions = [
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
        allowedAnswers: ['calmo', 'agitado', 'curioso'],
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
];
var _a = process.env, SITE_BASE_URL = _a.SITE_BASE_URL, JOAO_USERNAME = _a.JOAO_USERNAME, MATEUS_USERNAME = _a.MATEUS_USERNAME;
exports.texts = {
    result: function (link, animalId) {
        return "Obrigado por responder! Link aqui: ".concat(link, ", com o id: ").concat(animalId);
    },
    helloCreators: function (firstName) {
        return "Ol\u00E1 ".concat(firstName, ", tudo bem?\n\nPara me usar, voc\u00EA pode executar os seguintes comandos:\n\n/start: reinicia o bot\n/new: adicionar um novo animal ao site\n/cancel: cancela o animal que est\u00E1 sendo adicionado\n/help: tirar d\u00FAvidas do bot\n\nUse com modera\u00E7\u00E3o.");
    },
    helloHenrique: "Ol\u00E1 Henrique, tudo bem?\n\nEu sou o bot do Projeto Jurema e por aqui voc\u00EA poder\u00E1 adicionar novos animais ao nosso site.\n\nPara me usar, voc\u00EA pode executar os seguintes comandos:\n\n/start: reinicia o bot\n/new: adicionar um novo animal ao site\n/cancel: cancela o animal que est\u00E1 sendo adicionado\n/help: tirar d\u00FAvidas do bot\n\nSe voc\u00EA tiver alguma d\u00FAvida, pode dizer para o ".concat(MATEUS_USERNAME, " ou para o ").concat(JOAO_USERNAME),
    nonChatFound: "N\u00E3o entendi o que voc\u00EA quis dizer \uD83E\uDD28\n\nSe estiver tentando adicionar um novo animal ao site, digite /new.\n\nEm caso de d\u00FAvidas, voc\u00EA tamb\u00E9m pode falar com o ".concat(JOAO_USERNAME, " ou com o ").concat(MATEUS_USERNAME),
    unauthorized: "Ol\u00E1, tudo bem?\n\nCaso voc\u00EA queira saber mais sobre n\u00F3s, precisa ir para o site oficial do Projeto Jurema.\n\nBasta clicar no link abaixo\uD83D\uDC47\n\n".concat(SITE_BASE_URL),
    invalid: 'Tipo inválido',
    imageError: 'Erro ao subir imagem',
    canceled: 'Cadastro de animal cancelado!',
    list: 'Lista de animais:',
    deleted: 'Animal deletado!',
    nonSpecified: 'Nenhum animal foi especificado, use por exemplo:\n\n/delete 1230',
    newResponseForms: function (_a) {
        var name = _a.name, today = _a.today, about = _a.about, city = _a.city, email = _a.email, phone = _a.phone, animalLink = _a.animalLink;
        return "".concat(name, "\n\nInforma\u00E7\u00F5es do futuro dono\nData do requerimento: ").concat(today, "\nMotivo: ").concat(about, "\nCidade: ").concat(city, "\nEmail: ").concat(email, "\nTelefone: ").concat(phone, "\n\nLink do animal: ").concat(animalLink);
    },
};
