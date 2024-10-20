import {Schema , model} from 'mongoose';

export interface IPieza {
    producto: string;
    categoria: string;
    precio: number;
    descripcion: string;
    codigo: string;
    marca: string;
    stock: string;
    modelosVehiculos: string[];
}


const piezaSchema = new Schema({
    producto: {type: String, required:true},
    categoria: {type: String, required:true},
    precio: {type: Number, required:true},
    descripcion: {type: String, required:true},
    codigo: {type: String, required:true},
    marca: {type: String, required:true},
    stock: {type: String, required:true},
    modelosVehiculos: {type: [String], required:true}
},{versionKey: false});

export const Pieza = model<IPieza>('Pieza', piezaSchema, 'Piezas');
