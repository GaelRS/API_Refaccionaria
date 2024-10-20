import { Cliente } from '../models/clientesModel';

export const clienteMapper = {
    toDto: (cliente: any) => ({
        id: cliente._id,
        correo: cliente.correo,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        productosComprados: cliente.productosComprados
    }),
    
    fromDto: (data: any) => new Cliente({
        correo: data.correo,
        nombre: data.nombre,
        telefono: data.telefono,
        productosComprados: data.productosComprados
    })
};
