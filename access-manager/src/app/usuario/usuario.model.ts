import { IPermissao } from '../shared/permissao.model';
import { IBaseModel } from '../shared/base.model';

export interface IUsuario extends IBaseModel {
    nome: string
    email: string
    cpf: string
    telefone: string
    perfis: IPermissao[]
}
