import alunoRepository from '../repositories/AlunoRepository.js'

class AlunoController {
  async index(req, res, next) {
    try {
      const alunos = await alunoRepository.findAll()
      return res.status(200).json(alunos)
    } catch (error) {
      return next(error)
    }
  }

  async show(req, res, next) {
    try {
      const id = Number(req.params.id)
      if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ mensagem: 'ID inválido' })
      }

      const aluno = await alunoRepository.findById(id)
      if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' })
      }
      return res.status(200).json(aluno)
    } catch (error) {
      return next(error)
    }
  }

  async store(req, res, next) {
    try {
      const { nome, curso } = req.body ?? {}
      if (typeof nome !== 'string' || !nome.trim() ||
          typeof curso !== 'string' || !curso.trim()) {
        return res.status(400).json({
          mensagem: 'Informe nome e curso como textos não vazios'
        })
      }

      const aluno = await alunoRepository.create({
        nome: nome.trim(),
        curso: curso.trim()
      })
      return res.location(`/alunos/${aluno.id}`).status(201).json(aluno)
    } catch (error) {
      return next(error)
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id)
      if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ mensagem: 'ID inválido' })
      }

      const { nome, curso } = req.body ?? {}
      if (typeof nome !== 'string' || !nome.trim() ||
          typeof curso !== 'string' || !curso.trim()) {
        return res.status(400).json({
          mensagem: 'Informe nome e curso como textos não vazios'
        })
      }

      const aluno = await alunoRepository.update(id, {
        nome: nome.trim(),
        curso: curso.trim()
      })
      if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' })
      }
      return res.status(200).json(aluno)
    } catch (error) {
      return next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id)
      if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ mensagem: 'ID inválido' })
      }

      const removido = await alunoRepository.delete(id)
      if (!removido) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado' })
      }
      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}

export default new AlunoController()
