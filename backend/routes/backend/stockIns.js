// const express = require('express');
// const stockIns = require('../../controllers/superadmin/stockIns');
// const router = express.Router();

// 
const { isLoggedIn } = require('../../../passport/passport');;
// const { userImage } = require('../../controllers/services/multerConfig');

// router.get('/', stockIns.index);
// router.post('/list', isLoggedIn, stockIns.list);
// router.get('/create', isLoggedIn, stockIns.create);
// router.post('/create', isLoggedIn, userImage().none(), stockIns.create);
// router.get('/edit/:id', isLoggedIn, stockIns.edit);
// router.post('/edit/:id', isLoggedIn, userImage().none(), stockIns.edit);

// /**
//  * ISSUE BOOKS
//  */

// router.get('/issue', stockIns.issueIndex);
// router.get('/issue/list', isLoggedIn, stockIns.issueList);
// router.get('/issue/create', isLoggedIn, stockIns.issueCreate);
// router.post('/issue/create', isLoggedIn, userImage().none(), stockIns.issueCreate);
// router.get('/issue/edit/:id', isLoggedIn, stockIns.issueEdit);
// router.post('/issue/edit/:id', isLoggedIn, userImage().none(), stockIns.issueEdit);
// router.delete('/issue/return/:id', isLoggedIn, stockIns.issueReturn);

// module.exports = router;