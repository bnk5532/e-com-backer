const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Tag data
  Tag.findAll({
    include: Product
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Tag data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: Product
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      // if there's tag tags, we need to create pairings to bulk create in the tagTag model
      if (req.body.tagIds.length) {
        const tagTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
          };
        });
        return tagTag.bulkCreate(tagTagIdArr);
      }
      // if no tag tags, just respond
      res.status(200).json(tag);
    })
    .then((tagTagIds) => res.status(200).json(tagTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated tags from Tag
      return Tag.findAll({ where: { id: req.params.id } });
    })
    .then((Tags) => {
      // get list of current tag_ids
      const flagTagIds = Tags.map(({ id }) => id);
      // create filtered list of new tag_ids
      const newTags = req.body.tagIds
        .filter((id) => !flagTagIds.includes(id))
        .map((id) => {
          return {
            id: req.params.id,
            id,
          };
        });
      // figure out which ones to remove
      const tagsToRemove = Tags.filter(
        ({ id }) => !req.body.tagIds.includes(id)
      ).map(({ id }) => id);

      // run both actions
      return Promise.all([
        Tag.destroy({ where: { id: tagsToRemove } }),
        Tag.bulkCreate(newTags),
      ]);
    })
    .then((updatedTags) => res.json(updatedTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
