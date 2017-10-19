import { ISistema } from '../sistema/sistema.model'

export interface IPerfil {
    id: number
    nome: string
    ativo: boolean
    sistemas: ISistema[]
}
