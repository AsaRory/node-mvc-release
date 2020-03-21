import express from 'express';
const router = express.Router();
router.get('/', function(req, res, next) {
       res.render('index', { title: 'Express333' });
});
export default router;