import { RequestHandler, Router } from 'express';
import {ClientesController } from '../controllers/clientesController';

const router = Router();
const clientesController = new ClientesController();

router.get('/clientes/:id', clientesController.getClienteById.bind(clientesController) as RequestHandler);
router.delete('/clientes/delete/:id', clientesController.deleteClienteById.bind(clientesController));
router.post('/clientes', clientesController.createCliente.bind(clientesController));
router.put('/clientes/update/:id', clientesController.updateCliente.bind(clientesController));
router.patch('/clientes/updatePatch/:id', clientesController.updatePatchCliente.bind(clientesController));


export default router;
