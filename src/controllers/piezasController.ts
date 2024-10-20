import { Request, Response } from "express";
import { PiezasService } from "../services/piezasService";
import { CodigoExistente } from "../exceptions/codigoExistente";
import { redisClient } from "../config/redis";


export class PiezasController {
    private piezasService: PiezasService;

    constructor() {
        this.piezasService = new PiezasService();
    }
    
    async getPiezaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            console.log(`Buscando en caché la pieza con ID: pieza:${id}`);
            const cachedPieza = await redisClient.get(`pieza:${id}`);
            
            if (cachedPieza) {
                console.log(`Pieza encontrada en caché: ${cachedPieza}`);
                res.status(200).json(JSON.parse(cachedPieza));
                return;
            }
    
            const pieza = await this.piezasService.getPiezaById(id);
            if (pieza) {
                await redisClient.set(`pieza:${id}`, JSON.stringify(pieza), {
                    EX: 3600
                });
                res.status(200).json(pieza);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            console.error("Error al obtener la pieza:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    
    async getPiezasByCategoria(req: Request, res: Response): Promise<void> {
        const { categoria } = req.params;
        const { page, limit, orderBy } = req.query;

        try {
            const cachedPiezas = await redisClient.get(`piezas:categoria:${categoria}:page:${page}:limit:${limit}`);
            if (cachedPiezas) {
                res.status(200).json(JSON.parse(cachedPiezas));
                return;
            }

            const piezas = await this.piezasService.getPiezasByCategoria(categoria, parseInt(page as string), parseInt(limit as string), orderBy as string);
            if (piezas.length > 0) {
                await redisClient.set(`piezas:categoria:${categoria}:page:${page}:limit:${limit}`, JSON.stringify(piezas), {
                    EX: 3600
                });
                res.status(200).json(piezas);
            } else {
                res.status(404).json({ error: "Categoria no encontrada" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    async deletePiezaById(req: Request, res: Response) {
        const { id } = req.params;
        try{
            const pieza = await this.piezasService.deletePiezaById(id);
            if(pieza){
                res.status(204).send();
            }else{
                res.status(404).json({ error: "Pieza a eliminar no encontrada" });
            }
        }catch(error){
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    async createPieza(req: Request, res: Response) {
        const nuevaPieza = req.body; 
        try {
            const Pieza = await this.piezasService.createPieza(nuevaPieza);
            res.status(201).json(Pieza);
        } catch (error) {
            if (error instanceof CodigoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }    
    async updatePieza(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData = req.body; 
    
        try {
            const piezaActualizada = await this.piezasService.updatePieza(id, updatedData);
            if (piezaActualizada) {
                res.status(200).json(piezaActualizada);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            if (error instanceof CodigoExistente) { 
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    }
    async updatePatchPieza(req: Request, res: Response) {
        const { id } = req.params;
        const updatedFields = req.body; 
    
        try {
            const piezaActualizada = await this.piezasService.updatePatchPieza(id, updatedFields);
            if (piezaActualizada) {
                res.status(200).json(piezaActualizada);
            } else {
                res.status(404).json({ error: "Pieza no encontrada" });
            }
        } catch (error) {
            if (error instanceof CodigoExistente) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Error en el servidor" });
            }
        }
    } 
}
