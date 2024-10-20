import { PiezasRepository } from '../repositories/piezasRepository';
import { CodigoExistente } from '../exceptions/codigoExistente'; 

export class PiezasService{

    private PiezasRepository = new PiezasRepository();

    async getPiezaById(id: string) {
        return this.PiezasRepository.getPiezaById(id);
    }
    async getPiezasByCategoria(categoria: string, page: number, limit: number, orderBy: string) {
        return this.PiezasRepository.getPiezasByCategoria(categoria, page, limit, orderBy);
    }
    async deletePiezaById(id: string) {
        return this.PiezasRepository.deletePiezaById(id);
    }
    async createPieza(data: any) {
        const existe = await this.PiezasRepository.existsByCodigo(data.codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe"); 
        }
        return this.PiezasRepository.createPieza(data);
    }
    async updatePieza(id: string, data: any) {
        const existe = await this.PiezasRepository.existsByCodigo(data.codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe");
        }
        return this.PiezasRepository.updatePieza(id, data);
    }
    async updatePatchPieza(id: string, data: any) {
        const existe = await this.PiezasRepository.existsByCodigo(data.codigo);
        if (existe) {
            throw new CodigoExistente("El código ya existe");
        }
        const piezaActualizada = await this.PiezasRepository.updatePatchPieza(id, data);
        return piezaActualizada;
    }
    
    

}