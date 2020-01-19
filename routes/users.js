const express = require('express');
const connectedUsers = require('../connectedUsers');
const router = express.Router()

router.get('/:id', (req, res) => {
    if (Object.values(connectedUsers).map(username => username.toLocaleLowerCase()).includes(req.params.id.toLocaleLowerCase())) {
        res.status(400)
            .json({ msg: 'Username taken' });
    }

    else if (!/^[A-Za-z_0-9]+$/g.test(req.params.id)) {
        res.status(400)
            .json({ msg: 'Use a-z, 0-9, _' });
    }

    else {
        res.status(200)
            .json({ msg: 'ok' });
    }
})

router.get('/', (req, res) => {
    res.status(400)
        .json({ msg: 'Choose a username' });
})

module.exports = router;