const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', (req, res) => {
    Tag.create(req.body)
      .then((newTag) => {
        res.json(newTag);
      })
      .catch((err) => {
        res.json(err);
      });
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] === 1) {
        res.json({ message: 'Tag updated successfully' });
      } else {
        res.status(404).json({ message: 'Tag not found or no changes made' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // delete a tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 1) {
        res.json({ message: 'Tag deleted successfully' });
      } else {
        res.status(404).json({ message: 'Tag not found or no changes made' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
