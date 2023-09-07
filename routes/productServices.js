const { Category } = require("../models/category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
      let filter = {};
      if (req.query.categories) {
            filter = { category: req.query.categories.split(",") };
      }

      const productList = await Product.find(filter);
      // .populate("categories");
      if (!productList) {
            res.status(500).json({ succes: false });
      }
      res.send(productList);
});

// GEt by Id
router.get(`/:id`, async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (!product) {
            res.status(500).json({ succes: false });
      }
      res.send(product);
});

router.post("/", async (req, res) => {
      const category = await Category.findById(req.body.category);

      if (!category) return res.status(400).send("Invalid Category");

      let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
      });

      product = await product.save();

      if (!product)
            return res.status(500).send("The product can not  be created");

      res.send(product);
});

// Update or Put request
router.put("/:id", async (req, res) => {
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).send("Invalid  Category");

      const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                  name: req.body.name,
                  desription: req.body.description,
                  richDescription: req.body.richDescription,
                  image: req.body.image,
                  images: req.body.images,
                  brand: req.body.brand,
                  price: req.body.price,
                  category: req.body.category,
                  countInStock: req.body.countInStock,
                  rating: req.body.rating,
                  numberofReviews: req.body.numberofReviews,
                  isFeatured: req.body.isFeatured,
                  dateCreated: req.body.dateCreated,
            },
            { new: true }
      );

      if (!product)
            return res.status(404).json("The product can't be updated...");

      res.send(product);
});

router.delete(`/:id`, (req, res) => {
      Product.findByIdAndRemove(req.params.id)
            .then((product) => {
                  if (product) {
                        return res.status(200).json({
                              success: true,
                              message: "the product is deleted",
                        });
                  } else {
                        return res.status(404).json({
                              success: false,
                              message: "product not found",
                        });
                  }
            })
            .catch((err) => {
                  return res.status(400).json({ success: false, error: err });
            });
});

router.get(`/get/count`, async (req, res) => {
      try {
            const productCount = await Product.countDocuments();
            res.json({
                  productCount: productCount,
            });
      } catch (error) {
            res.status(500).json({ error: "Error counting products" });
      }
});

router.get(`/get/featured/:count`, async (req, res) => {
      const count = req.params.count ? req.params.count : 0;
      const products = await Product.find({ isFeatured: true }).limit(+count);

      if (!products) {
            res.status(500).json({ success: false });
      }
      res.send(products);
});

module.exports = router;
