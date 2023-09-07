const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get(`/`, async (req, res) => {
      const userList = await User.find().select("-passwordHash");

      if (!userList) {
            res.status(500).json({ success: false });
      }
      res.send(userList);
});

// User by id

router.get(`/:id`, async (req, res) => {
      const user = await User.findById(req.params.id).select("-passwordHash");

      if (!user) {
            res.status(500).json({ success: false });
      }
      res.send(user);
});

router.post(`/`, async (req, res) => {
      let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            zip: req.body.zip,
            apartment: req.body.apartment,
      });

      user = await user.save();
      if (!user) return res.status(404).json("The user can't be created...");

      res.send(user);
});

router.post(`/register`, async (req, res) => {
      let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            zip: req.body.zip,
            apartment: req.body.apartment,
      });

      user = await user.save();
      if (!user) return res.status(404).json("The user can't be created...");

      res.send(user);
});

// Login By Users

router.post(`/login`, async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      // Here we are finding user by email
      const secret = process.env.secret;

      if (!user) {
            return res.status(400).send("The user not found");
      }

      if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                  {
                        userId: user.id,
                        isAdmin: user.isAdmin,
                  },
                  secret,
                  {
                        expiresIn: "1d",
                  }
            );
            res.status(200).send({ user: user.email, token });
      } else {
            return res.status(400).send("wrong password");
      }
});

router.get(`/get/count`, async (req, res) => {
      try {
            const userCount = await User.countDocuments();
            res.json({
                  userCount: userCount,
            });
      } catch (error) {
            res.status(500).json({ error: "Error counting users" });
      }
});

router.delete(`/:id`, (req, res) => {
      User.findByIdAndRemove(req.params.id)
            .then((user) => {
                  if (user) {
                        return res.status(200).json({
                              success: true,
                              message: "the user is deleted",
                        });
                  } else {
                        return res.status(404).json({
                              success: false,
                              message: "user not found",
                        });
                  }
            })
            .catch((err) => {
                  return res.status(400).json({ success: false, error: err });
            });
});

module.exports = router;
