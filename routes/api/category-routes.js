const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const dbCategoryData = await Category.findAll({
      attributes: [
        'id', 'category_name'
      ],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    });
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const dbCategoryData = await Category.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'category_name'
        ],
        
        include: [
            {
                model: Product,
                attributes: [
                    'id',
                    'product_name',
                    'price',
                    'stock',
                    'category_id'
                ]
            }
        ]
    });
    res.status(200).json(dbCategoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const dbCategoryData = await Category.create({category_name: req.body.category_name});
    res.status(200).json(dbCategoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const dbCategoryData = await Category.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(dbCategoryData);
} catch (err) {
    res.status(500).json(err);
};

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const dbCategoryData = await Category.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(dbCategoryData);
} catch (err) {
    res.status(500).json(err);
};
});

module.exports = router;
