const router = require("express").Router();
const User = require("../model/User");

//create a data set
router.post("/", async (req, res) => {
    const newUser = new User({
        title: req.body.title,
        description: req.body.desc,
        image: req.body.image,
    });
    try {
        await newUser.save();
        res.status(200).json("User data created successfully!");
    } catch (err) {
        res.status(500).json("Oops! Something went wrong");
    }
});

//update a data set
router.put("/:id", async (req, res) => {
    try {
        const dbUserId = await User.findById(req.params.id);
        if (dbUserId._id === req.params.id) {
            await User.updateOne({
                title: req.body.title,
                description: req.body.desc,
                image: req.body.image,
            });
            res.status(200).json("User data updated!");

        } else {
            res.status(403).json("Check the user ID status!")
        }
    } catch (err) {
        res.status(500).json("Oops! Something went wrong");
    }
});

//delete a data set
router.delete("/:id", async (req, res) => {
    try {
        const userDel = await User.findById(req.params.id);
        if (!userDel) {
            res.status(403).json("Check user ID");
        } else {
            await User.findByIdAndDelete(userDel);
            res.status(200).json("User data has been deleted");
        }
    } catch (err) {
        res.status(500).json("Oops! Something went wrong");
    }
});

//get all data set
router.get("/getData", async (req, res) => {
    try {
        const allData = await User.find();
        res.status(200).json(allData);
    } catch (err) {
        res.status(500).json("Oops! Something went wrong");
    }
});

//get single user data
router.get("/single/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }); 
        if (!user) {
            return res.status(404).json("User not found"); 
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Ops! Something went wrong");
    }
});


module.exports = router;