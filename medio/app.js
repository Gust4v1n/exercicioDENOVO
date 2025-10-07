const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let imoveis = [];
let clientes = [];
let corretores = [];

app.post('/imoveis', (req, res) => {
    const { tipo, endereco, valor, finalidade } = req.body;
    const novoImovel = {
        id: imoveis.length + 1,
        tipo,         
        endereco,
        valor,
        finalidade    
    };
    imoveis.push(novoImovel);
    res.status(201).json(novoImovel);
});

app.get('/imoveis', (req, res) => {
    res.json(imoveis);
});

app.put('/imoveis/:id', (req, res) => {
    const imovel = imoveis.find(i => i.id === parseInt(req.params.id));
    if (!imovel) return res.status(404).send('Imóvel não encontrado.');

    const { tipo, endereco, valor, finalidade } = req.body;
    if (tipo) imovel.tipo = tipo;
    if (endereco) imovel.endereco = endereco;
    if (valor) imovel.valor = valor;
    if (finalidade) imovel.finalidade = finalidade;

    res.json(imovel);
});

app.delete('/imoveis/:id', (req, res) => {
    const index = imoveis.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Imóvel não encontrado.');

    imoveis.splice(index, 1);
    res.json({ message: "Imóvel removido com sucesso!" });
});

app.post('/clientes', (req, res) => {
    const { nome, telefone, email } = req.body;
    const novoCliente = {
        id: clientes.length + 1,
        nome,
        telefone,
        email
    };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.post('/corretores', (req, res) => {
    const { nome, creci, telefone } = req.body;
    const novoCorretor = {
        id: corretores.length + 1,
        nome,
        creci,
        telefone
    };
    corretores.push(novoCorretor);
    res.status(201).json(novoCorretor);
});

app.get('/corretores', (req, res) => {
    res.json(corretores);
});

app.get('/', (req, res) => {
    res.send('🏡 Sistema de Gerenciamento Imobiliário rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});