const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json({ data: accounts });
    })
    .catch(err => {
        res.status(500).json({ error: err.message })
    });
});

router.get('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id})
    .then(accounts => {
        res.status(200).json({ data: accounts });
    })
    .catch(err => {
        res.status(500).json({ error: err.message })
    });
})

router.post('/', (req, res) => {
    const postData = req.body;
    db('accounts').insert(postData, 'id')
    .then(ids => {
        res.status(201).json({ data: ids });
    })
    .catch(err => {
        res.status(500).json({ error: err.message })
    });
})

router.put('/:id', (req, res) => {
    const updates = req.body;
    db('accounts').where({ id: req.params.id }).update(updates)
    .then(count => {
        res.status(200).json({ data: count });
    })
    .catch(err => {
        res.status(500).json({ error: err.message })
    });
})

router.delete('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id }).del()
    .then(count => {
        res.status(200).json({ data: count });
    })
    .catch(err => {
        res.status(500).json({ error: err.message })
    });
})

module.exports = router;