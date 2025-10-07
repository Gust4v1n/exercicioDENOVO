const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let albuns = [
    {
        id: 1,
        titulo: "Álbum de Estreia",
        ano: 2020,
        faixas: [
            { id: 1, titulo: "Intro", duracao: "1:45" },
            { id: 2, titulo: "Primeira Música", duracao: "3:30" }
        ]
    }
];

app.post('/albuns', (req, res) => {
    const { titulo, ano } = req.body;
    const novoAlbum = {
        id: albuns.length + 1,
        titulo,
        ano,
        faixas: []
    };
    albuns.push(novoAlbum);
    res.status(201).json(novoAlbum);
});

app.get('/albuns', (req, res) => {
    res.json(albuns);
});

app.get('/albuns/:id', (req, res) => {
    const album = albuns.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('Álbum não encontrado.');
    res.json(album);
});

app.put('/albuns/:id', (req, res) => {
    const album = albuns.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('Álbum não encontrado.');

    const { titulo, ano } = req.body;
    if (titulo) album.titulo = titulo;
    if (ano) album.ano = ano;

    res.json(album);
});

app.delete('/albuns/:id', (req, res) => {
    const index = albuns.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Álbum não encontrado.');

    albuns.splice(index, 1);
    res.json({ message: "Álbum deletado com sucesso!" });
});

app.post('/albuns/:id/faixas', (req, res) => {
    const album = albuns.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('Álbum não encontrado.');

    const { titulo, duracao } = req.body;
    const novaFaixa = {
        id: album.faixas.length + 1,
        titulo,
        duracao
    };
    album.faixas.push(novaFaixa);
    res.status(201).json(novaFaixa);
});

app.get('/albuns/:id/faixas', (req, res) => {
    const album = albuns.find(a => a.id === parseInt(req.params.id));
    if (!album) return res.status(404).send('Álbum não encontrado.');
    res.json(album.faixas);
});

app.delete('/albuns/:albumId/faixas/:faixaId', (req, res) => {
    const album = albuns.find(a => a.id === parseInt(req.params.albumId));
    if (!album) return res.status(404).send('Álbum não encontrado.');

    const index = album.faixas.findIndex(f => f.id === parseInt(req.params.faixaId));
    if (index === -1) return res.status(404).send('Faixa não encontrada.');

    album.faixas.splice(index, 1);
    res.json({ message: "Faixa deletada com sucesso!" });
});

app.get('/', (req, res) => {
    res.send('🎸 Catálogo de Músicas da Banda rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});