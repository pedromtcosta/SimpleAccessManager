import { IPerfil } from '../perfil/perfil.model'

export interface ISistema {
    id: number
    nome: string
    descricao: string
    ativo: boolean
    perfis: IPerfil[]
}
