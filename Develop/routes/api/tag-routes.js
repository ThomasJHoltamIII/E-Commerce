const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with associated products
router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: [`product_name`],
        },
      ],
    });

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific tag by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [`product_name`],
        },
      ],
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

