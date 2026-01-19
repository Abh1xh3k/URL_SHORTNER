import express from 'express';
import { UrlShortner } from '../controller/urlController.js';
import { redirectUrl } from '../controller/redirectController.js';

const router=express.Router();
router.post('/generate-url',UrlShortner);
router.get('/:shortCode',redirectUrl);

export default router;