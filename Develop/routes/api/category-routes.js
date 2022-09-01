const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product]
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .then((categoryTagIds) => res.status(200).json(categoryTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated records from category
      return Category.findAll({ where: { id: req.params.id } });
    })
    .then((categoryFlag) => {
      // get list of current tag_ids
      const categoryFlagId = categoryFlag.map(({ id }) => id);
      // create filtered list of new tag_ids
      if(req.body.catIds){
      const newCategory = req.body.catIds
        .filter((id) => !categoryFlagId.includes(id))
        .map((id) => {
          return {
            category_name: req.params.id,
            id,
          };
        });
      // figure out which ones to remove
      const categoryToRemove = categoryFlag
        .filter(({ id }) => !req.body.catIds.includes(id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Category.destroy({ where: { id: categoryToRemove } }),
        Category.bulkCreate(newCategory),
      ])};
    })
    .then((updatedCategories) => res.json(updatedCategories))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
