import { IPerfil } from '../perfil/perfil.model'
import { IBaseModel } from '../shared/base.model';

export interface ISistema extends IBaseModel {
    nome: string
    descricao: string
    perfis: IPerfil[]
}
