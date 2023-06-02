const express = require('express');
const expenseCategories = require('../../controllers/superadmin/expenseCategories');
const router = express.Router();


const { isLoggedIn } = require('../../../passport/passport');;
const { userImage } = require('../../controllers/services/multerConfig');

router.get('/categories', expenseCategories.index);
router.get('/categories/list', expenseCategories.list);
router.get('/categories/create', expenseCategories.create);
router.post('/categories/create', userImage().none(), expenseCategories.create);
router.get('/categories/edit/:id', expenseCategories.edit);
router.post('/categories/edit/:id', userImage().none(), expenseCategories.edit);

/**
 * expenses
 */

const expenses = require('../../controllers/superadmin/expenses');
router.get('', expenses.index);
router.get('/list', expenses.list);
router.get('/create', expenses.create);
router.post('/create', userImage().none(), expenses.create);
router.get('/edit/:id', expenses.edit);
router.post('/edit/:id', userImage().none(), expenses.edit);
module.exports = router;