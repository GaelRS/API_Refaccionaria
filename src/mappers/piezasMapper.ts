import { Pieza } from '../models/piezasModel';

export const piezaMapper = {
    toDto: (pieza: any) => ({
        id: pieza._id,
        producto: pieza.producto,
        categoria: pieza.categoria,
        precio: pieza.precio,
        descripcion: pieza.descripcion,
        codigo: pieza.codigo,
        marca: pieza.marca,
        stock: pieza.stock,
        modelosVehiculos: pieza.modelosVehiculos
    }),
    
    fromDto: (data: any) => new Pieza({
        producto: data.producto,
        categoria: data.categoria,
        precio: data.precio,
        descripcion: data.descripcion,
        codigo: data.codigo,
        marca: data.marca,
        stock: data.stock,
        modelosVehiculos: data.modelosVehiculos
    })
};
