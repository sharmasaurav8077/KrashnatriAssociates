import express from 'express';
import { submitEnquiry } from '../controllers/enquiryController.js';

const router = express.Router();

/**
 * POST /enquiry - Submit enquiry form
 */
router.post('/enquiry', submitEnquiry);

export default router;
