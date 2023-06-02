const express = require('express');
const router = express.Router();
const route = require('../controllers/control');
const upload = require('../controllers/services/multerConfig');

router.get('/', (req, res)=>{
    res.render('settings/index', {layout:"backend"});
});
router.get('/news/list', route.settings);
router.get('/news/create', route.settings);
router.get('/news/:id', route.settings);
router.post('/news', upload.single('imageUrl'), route.settings);
router.post('/news/:id', upload.single('imageUrl'), route.settings);
router.delete('/news/:id', route.settings);
router.delete('/news/trash/:id', route.settings);

router.get('/groups/list', route.settings);
router.get('/groups/create', route.settings);
router.get('/groups/:id', route.settings);
router.post('/groups/:id', upload.single('logo'), route.settings);
router.post('/groups', upload.single('logo'), route.settings);
router.delete('/groups/:id', route.settings);
router.delete('/groups/trash/:id', route.settings);


router.get('/services/list', route.settings);
router.get('/services/create', route.settings);
router.get('/services/:id', route.settings);
router.post('/services/:id', upload.single('imageUrl'), route.settings);
router.post('/services', upload.single('imageUrl'), route.settings);
router.delete('/services/:id', route.settings);
router.delete('/services/trash/:id', route.settings);


router.get('/articles/list', route.settings);
router.get('/articles/create', route.settings);
router.get('/articles/:id', route.settings);
router.post('/articles/:id',upload.none(), route.settings);
router.post('/articles',upload.none(), route.settings);
router.delete('/articles/:id', route.settings);
router.delete('/articles/trash/:id', route.settings);


router.get('/abouts/list', route.settings);
router.get('/abouts/create', route.settings);
router.get('/abouts/:id', route.settings);
router.post('/abouts/:id',upload.none(), route.settings);
router.post('/abouts',upload.none(), route.settings);
router.delete('/abouts/:id', route.settings);
router.delete('/abouts/trash/:id', route.settings);


router.get('/portfolios/list', route.settings);
router.get('/portfolios/create', route.settings);
router.get('/portfolios/:id', route.settings);
router.post('/portfolios/:id',upload.none(), route.settings);
router.post('/portfolios',upload.none(), route.settings);
router.delete('/portfolios/:id', route.settings);
router.delete('/portfolios/trash/:id', route.settings);


router.get('/subscribers/list', route.settings);
router.get('/subscribers/create', route.settings);
router.get('/subscribers/:id', route.settings);
router.post('/subscribers/:id',upload.none(), route.settings);
router.post('/subscribers',upload.none(), route.settings);
router.delete('/subscribers/:id', route.settings);
router.delete('/subscribers/trash/:id', route.settings);


router.get('/slides/list', route.settings);
router.get('/slides/create', route.settings);
router.get('/slides/:id', route.settings);
router.post('/slides/:id',upload.single('imageUrl'), route.settings);
router.post('/slides',upload.single('imageUrl'), route.settings);
router.delete('/slides/:id', route.settings);
router.delete('/slides/trash/:id', route.settings);


router.get('/products/list', route.settings);
router.get('/products/create', route.settings);
router.get('/products/:id', route.settings);
router.post('/products/:id',upload.single('imageUrl'), route.settings);
router.post('/products',upload.single('imageUrl'), route.settings);
router.delete('/products/:id', route.settings);
router.delete('/products/trash/:id', route.settings);



module.exports = router;