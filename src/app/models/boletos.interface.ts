import { Categoria } from "./categoria.interface";

export interface Boletos {
    id?: number;
    descricao : string;
    valor : number;
    dataVencimento : Date;
    categoria : Categoria[];
    lembrar : boolean;
}