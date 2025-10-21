import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    ingresarCuadre, 
    listarCuadre,
    obtenerResumenClientes,
    obtenerResumenMensajeros
} from '../controllers/cuadreController.js'

const router = Router()

router.post('/ingresar', checkAuth, ingresarCuadre)
router.get('/listar', checkAuth, listarCuadre)
router.get('/resumen-clientes', checkAuth, obtenerResumenClientes)
router.get('/resumen-mensajeros', checkAuth, obtenerResumenMensajeros)


export default router