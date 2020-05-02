export class Formulario {

    static contador = 1;

    public id: number;
    public usuario: string;
    public concluida: boolean;

    constructor(usuario:string = '') {
        this.id = Formulario.contador++;
        this.usuario = usuario;
        this.concluida = false;
    }
}