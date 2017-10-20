import { IPermissao } from '../shared/permissao.model';

export interface IUsuario {
    id: number
    nome: string
    email: string
    cpf: string
    telefone: string
    ativo: boolean
    perfis: IPermissao[]
}
