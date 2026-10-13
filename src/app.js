import express from 'express'
import alunosRoutes from './routes/alunos.routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'API REST funcionando' })
})

app.use('/alunos', alunosRoutes)

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' })
})

app.use((error, req, res, next) => {
  console.error(error.message)
  res.status(500).json({ mensagem: 'Erro interno do servidor' })
})

export default app
