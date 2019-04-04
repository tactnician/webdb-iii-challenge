// Express Router
const router = require('express').Router();

// Knex 
const knex = require('knex');
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development);

// get all
router.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts) 
    } catch (error) {
        res.status(500).json({message: `error getting ${error}`});
    }
})

//get by id 
router.get('/:id', async (req, res) => {
    try {
        const role = await db('cohorts')
        .where({ id: req.params.id })
        .first();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json(error);
    }
})

// insert
router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
    
        const role = await db('cohorts')
        .where({ id })
        .first();
    
        res.status(201).json(role);
    } catch (error) {
        const message = errors[error.errno] || 'We ran into an error';
        res.status(500).json({ message, error });
    }
})

// //update
router.put('/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
    
        if (count > 0) {
            const role = await db('cohorts')
            .where({ id: req.params.id })
            .first();
    
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Records not found' });
        }
    } catch (error) {
        res.status(500).json({message: `error updating ${error}`})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
    
        if (count > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Records not found' });
        }
    } catch (error) {
        res.status(500).json({message: `error removing ${error}`});
    }
})



module.exports = router;