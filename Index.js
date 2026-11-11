 
const express = require('express')
 
const app = express()
 
app.use(express.json())
 
// Banco de dados improvisado
let tarefas = []
 
let proximoId = 1
 
// CADASTRAR TAREFA - POST
app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: proximoId++,
        descricao: req.body.descricao,
        data: req.body.data,
        concluido: false
    }
 
    tarefas.push(novaTarefa)
 
    res.status(201).json(novaTarefa)
})
 
// LISTAR TODAS AS TAREFAS - GET
app.get('/tarefas', (req, res) => {
    res.json(tarefas)
})
 
// BUSCAR TAREFA PELO ID - GET
app.get('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
 
    const tarefa = tarefas.find(t => t.id === id)
 
    if (!tarefa) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        })
    }
 
    res.json(tarefa)
})
 
// ATUALIZAR TAREFA - PUT
app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
 
    const tarefa = tarefas.find(t => t.id === id)
 
    if (!tarefa) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        })
    }
 
    tarefa.descricao = req.body.descricao
    tarefa.data = req.body.data
 
    res.json(tarefa)
})
 
// EXCLUIR TAREFA - DELETE
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id)
 
    const tarefaExiste = tarefas.some(t => t.id === id)
 
    if (!tarefaExiste) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        })
    }
 
    tarefas = tarefas.filter(t => t.id !== id)
 
    res.json({
        mensagem: 'Tarefa excluída com sucesso'
    })
})
 
// ALTERAR CONCLUSAO - TRUE/FALSE
app.put('/tarefas/:id/concluir', (req, res) => {
    const id = Number(req.params.id)
 
    const tarefa = tarefas.find(t => t.id === id)
 
    if (!tarefa) {
        return res.status(404).json({
            mensagem: 'Tarefa não encontrada'
        })
    }
 
    tarefa.concluido = !tarefa.concluido
 
    res.json(tarefa)
})
 
// BUSCAR SOMENTE TAREFAS NÃO CONCLUÍDAS
app.get('/tarefas-pendentes', (req, res) => {
    const pendentes = tarefas.filter(t => t.concluido === false)
 
    res.json(pendentes)
})
 
// INICIAR SERVIDOR
app.listen(3000, () => {
    console.log('API rodando na porta 3000')
})
 