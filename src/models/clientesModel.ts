import {Schema , model} from 'mongoose';

export interface ICliente {
    correo: string;
    nombre: string;
    telefono: string;
    productosComprados: string[];
}


const clienteSchema = new Schema({
    correo: {type: String, required: true},
    nombre: {type: String, required: true},
    telefono: {type: String, required: true},
    productosComprados: {type: [String], required: true}
},{versionKey: false});

export const Cliente = model<ICliente>('Cliente', clienteSchema, 'Clientes');
