const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// Get all categorys with associated products
router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: [`product_name`],
        },
      ],
    });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all specific categorys by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: [`product_name`],
        },
      ],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Delete category
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({
      where: { id: req.params.id },
    });

    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
