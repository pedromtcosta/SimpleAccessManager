import { IPermissao } from '../shared/permissao.model';
import { IBaseModel } from '../shared/base.model';

export interface IPerfil extends IBaseModel {
    nome: string
    sistemas: IPermissao[]
}
