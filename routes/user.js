const {Router} = require('express');
const {getUser, putUser, postUser, deleteUser} = require('../controller/user');

const router = Router();

router.get('/', getUser);
router.put('/:id', putUser);
router.post('/', postUser);
router.delete('/', deleteUser);

module.exports = router;
