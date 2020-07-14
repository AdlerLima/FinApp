import { Categoria } from "./categoria.interface";
export interface Lancamento {
    id?: number;
    descricao: string;
    valor: number;
    categoria : Categoria[];
    tipo: number;
    cor : string;

}