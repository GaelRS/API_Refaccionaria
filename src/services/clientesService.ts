import { ClientesRepository } from '../repositories/clientesRepository';
import { CorreoExistente } from '../exceptions/correoExistente'; 


export class ClientesService{
    private ClientesRepository = new ClientesRepository();

    async getClienteById(id: string) {
        return this.ClientesRepository.getClienteById(id);
    }
    async deleteClienteById(id: string) {
        return this.ClientesRepository.deleteClienteById(id);
    }
    async createCliente(data: any) {
        const existe = await this.ClientesRepository.existsByCorreo(data.correo);
        if (existe) {
            throw new CorreoExistente("El correo que intentas dar de alta ya existe"); 
        }
        return this.ClientesRepository.createCliente(data);
    }
    async updateCliente(id: string, data: any) {
        const existe = await this.ClientesRepository.existsByCorreo(data.correo);
        if (existe) {
            throw new CorreoExistente("El correo que intentas dar de alta ya existe");
        }
        return this.ClientesRepository.updateCliente(id, data);
    }
    async updatePatchCliente(id: string, data: any) {
        const existe = await this.ClientesRepository.existsByCorreo(data.correo);
        if (existe) {
            throw new CorreoExistente("El correo que intentas dar de alta ya existe");
        }
        const clienteActualizado = await this.ClientesRepository.updatePatchCliente(id, data);
        return clienteActualizado;
    }
}
