import {Pieza, IPieza} from '../models/piezasModel';
import {piezaMapper} from '../mappers/piezasMapper';

export class PiezasRepository {
    async getPiezaById(id: string): Promise<IPieza | null> {
        const pieza = await Pieza.findById(id);
        if (!pieza) {
            return null;
        }
        return piezaMapper.toDto(pieza);
    } 
    async getPiezasByCategoria(categoria: string, page: number, limit: number, orderBy: string): Promise<IPieza[]> {
        const sortOptions: { [key: string]: any } = {nombre: -1, precio: 1};
        const piezas = await Pieza.find({ categoria: new RegExp(categoria, 'i') }).sort({ [orderBy]: sortOptions[orderBy]}) .skip((page - 1) * limit).limit(limit);
        return piezas.map(piezaMapper.toDto);
    }

    async deletePiezaById(id: string): Promise<IPieza | null> {
        return Pieza.findByIdAndDelete(id);
    }
    async existsByCodigo(codigo: string): Promise<boolean> {
        const pieza = await Pieza.findOne({ codigo });
        return !!pieza; 
    }

    async createPieza(data: any): Promise<IPieza> {
        const pieza = new Pieza(data);
        await pieza.save();
        return piezaMapper.toDto(pieza);
    }
    async updatePieza(id: string, data: any): Promise<IPieza | null> {
        const piezaActualizada = await Pieza.findByIdAndUpdate(id, data, { new: true });
        return piezaActualizada ? piezaMapper.toDto(piezaActualizada) : null;
    }
    async updatePatchPieza(id: string, data: any): Promise<IPieza | null> {
        const piezaActualizada = await Pieza.findByIdAndUpdate(id, { $set: data }, { new: true });
        return piezaActualizada ? piezaMapper.toDto(piezaActualizada) : null;
    }
    
}