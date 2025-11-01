import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { createPackage, deletePackage, getAllPackages, getPackageById, updatePackage } from '../controllers/package.controller.js';

const router = Router();

router.get('/', getAllPackages);
router.get('/:id', getPackageById);

router.post('/', requireAuth, requireAdmin, createPackage);
router.put('/:id', requireAuth, requireAdmin, updatePackage);
router.delete('/:id', requireAuth, requireAdmin, deletePackage);

export default router;


