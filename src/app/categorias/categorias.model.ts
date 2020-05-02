export class Categoria {

    static contador = 1;

    public id: number;
    public descricao: string;
    public concluida: boolean;
    

    constructor(descricao:string = '') {
        this.id = Categoria.contador++;
        this.descricao = descricao;
        this.concluida = false;
        
    }
}