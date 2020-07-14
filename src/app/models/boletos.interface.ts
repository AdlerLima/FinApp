import { Categoria } from "./categoria.interface";

export interface Boletos {
    id?: number;
    descricao : string;
    valor : number;
    categoria : Categoria[];
    lembrar : boolean;
}