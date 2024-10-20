export class CodigoExistente extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CodigoExistente';
    }
}