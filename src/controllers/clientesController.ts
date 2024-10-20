import { Request, Response } from 'express';
import { PiezasService } from '../services/piezasService'; 
import { ClientesService } from '../services/clientesService';
import { CorreoExistente } from '../exceptions/correoExistente';
import { redisClient } from '../config/redis';

export class ClientesController {
    private clientesService = new ClientesService();
    private piezasService = new PiezasService(); 

    async getClienteById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const redisKey = `cliente:${id}`;
        try {
            const cachedCliente = await redisClient.get(redisKey);
            if (cachedCliente) {
                res.status(200).json(JSON.parse(cachedCliente));
                return; 
            }
            const cliente = await this.clientesService.getClienteById(id);
            if (cliente) {
                const productos = await Promise.all(
                    cliente.productosComprados.map(async (productoId) => {
                        const producto = await this.piezasService.getPiezaById(productoId);
                        return producto ? producto : { mensaje: "Producto no encontrado" };
                    })
                );
    
                const clienteConProductos = { ...cliente, productos };
    
                await redisClient.set(redisKey, JSON.stringify(clienteConProductos), {
                    EX: 3600, 
                });
    
                res.status(200).json(clienteConProductos);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    async deleteClienteById(req: Request, res: Response) {
        const { id } = req.params;
        try{
            const cliente = await this.clientesService.deleteClienteById(id);
            if(cliente){
                res.status(204).send();
            }else{
                res.status(404).json({ error: "Cliente a eliminar no encontrado" });
            }
        }catch(error){
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    async createCliente(req: Request, res: Response) {
        const nuevoCliente = req.body; 
        try {
            const Cliente = await this.clientesService.createCliente(nuevoCliente);
            res.status(201).json(Cliente);
        } catch (error) {
            if (error instanceof CorreoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }   
    async updateCliente(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData = req.body; 
    
        try {
            const clienteActualizado = await this.clientesService.updateCliente(id, updatedData);
            if (clienteActualizado) {
                res.status(200).json(clienteActualizado);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            if (error instanceof CorreoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }
    async updatePatchCliente(req: Request, res: Response) {
        const { id } = req.params;
        const campos = req.body; 
    
        try {
            const clienteActualizado = await this.clientesService.updatePatchCliente(id, campos);
            if (clienteActualizado) {
                res.status(200).json(clienteActualizado);
            } else {
                res.status(404).json({ error: "Cliente no encontrado" });
            }
        } catch (error) {
            if (error instanceof CorreoExistente) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    } 
}
