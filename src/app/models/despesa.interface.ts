import { Categoria } from './categoria.interface';

export interface Despesa {
    id?: number;
    descricao: string;
    valor: number;
    dataLancamento : Date;
    categoria: Categoria[];
    tipo: number;
    cor : string;
}