const express = require("express");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { connectDb, getDb } = require("./configs/db-connection");

//init app
const app = express();
app.use(express.json());
//db Connection
let db;

connectDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.info(`Server is running on port ${PORT}`);
        });
        db = getDb();
    }
});

//routes
app.get("/", (req, res) => {
    const page = req.query.p || 0;
    const blogsPerPage = 2;

    let blogs = [];
    db.collection("Blogs")
        .find()
        .skip(page * blogsPerPage)
        .limit(blogsPerPage)
        .forEach((blog) => blogs.push(blog))
        .then(() => {
            res.status(200).json(blogs);
        })
        .catch((err) => {
            res.status(500).json({ msg: "could not fetch" });
        });
});
app.get("/blog/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("Blogs")
            .findOne({ _id: ObjectId(req.params.id) })
            .then((doc) => {
                doc != null
                    ? res.status(200).json(doc)
                    : res
                          .status(404)
                          .json({ message: "Valid Id but not in the db" });
            })
            .catch((err) => {
                res.status(500).json({ msg: "could not fetch", error: err });
            });
    } else {
        res.status(404).json({
            message: "this page is not availabe",
            error: "Id invalid",
        });
    }
});
app.post("/", (req, res) => {
    const blog = req.body;
    db.collection("Blogs")
        .insertOne(blog)
        .then((result) => {
            res.status(200).json({
                result: result,
                message: "the Blog is added",
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err, message: "could not add this" });
        });
});
app.delete("/blog/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection("Blogs")
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.status(200).json({
                    result: result,
                    message: "blog deleted",
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error,
                    message: "Valid Id blog not deleted",
                });
            });
    } else {
        res.status(404).json({
            message: "not Deleted",
            error: "Id invalid",
        });
    }
});
app.patch("/blog/:id", (req, res) => {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection("Blogs")
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
            .then((result) => {
                res.status(200).json({
                    result: result,
                    message: "blog edited",
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error,
                    message: "Valid Id blog not edited",
                });
            });
    } else {
        res.status(404).json({
            message: "not edited",
            error: "Id invalid",
        });
    }
});
