const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findbyId(req.params.id, {
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
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
    Category.create(req.body)
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });
  // create a new category
});

router.put('/:id', (req, res) => {
    Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedCategory) => {
        res.json(updatedCategory);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
  // update a category by its `id` value

router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        res.json(deletedCategory);
      })
      .catch((err) => res.json(err));
  });
  // delete a category by its `id` value

module.exports = router;
