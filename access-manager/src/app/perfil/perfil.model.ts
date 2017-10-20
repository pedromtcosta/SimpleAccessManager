import { IPermissao } from '../shared/permissao.model';

export interface IPerfil {
    id: number
    nome: string
    ativo: boolean
    sistemas: IPermissao[]
}
