export class CorreoExistente extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CorreoExistente';
    }
}