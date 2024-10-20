
import { clienteMapper } from '../mappers/clientesMapper';
import { Cliente, ICliente } from '../models/clientesModel';

export class ClientesRepository {
    async getClienteById(id: string): Promise<ICliente | null> {
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return null;
        }
        return clienteMapper.toDto(cliente);
    } 
    async deleteClienteById(id: string): Promise<ICliente | null> {
        return Cliente.findByIdAndDelete(id);
    }
    async existsByCorreo(correo: string): Promise<boolean> {
        const cliente = await Cliente.findOne({ correo });
        return !!cliente; 
    }
    async createCliente(data: any): Promise<ICliente> {
        const cliente = new Cliente(data);
        await cliente.save();
        return clienteMapper.toDto(cliente);
    }
    async updateCliente(id: string, data: any): Promise<ICliente | null> {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, data, { new: true });
        return clienteActualizado ? clienteMapper.toDto(clienteActualizado) : null;
    }
    async updatePatchCliente(id: string, data: any): Promise<ICliente | null> {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, { $set: data }, { new: true });
        return clienteActualizado ? clienteMapper.toDto(clienteActualizado) : null;
    }
}