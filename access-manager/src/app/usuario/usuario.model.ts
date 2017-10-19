import { IPerfil } from '../perfil/perfil.model'

export interface IUsuario {
    id: number
    nome: string
    email: string
    cpf: string
    telefone: string
    ativo: boolean
    perfis: IPerfil[]
}
