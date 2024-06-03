const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', (req, res) => {
    Category.create(req.body)
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });
});

  // update a category by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] === 1) {
        res.json({ message: 'Category updated successfully' });
      } else {
        res.status(404).json({ message: 'Category not found or no changes made' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // delete a category by its `id` value
router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedRows) => {
        if (deletedRows === 1) {
          res.json({ message: 'Category deleted successfully' });
        } else {
          res.status(404).json({ message: 'Category not found or no changes made' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
