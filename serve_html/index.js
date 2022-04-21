const express = require("express")
const app = express();
const homeController = require("./controllers/HomeController");
const httpStatus = require("http-status-codes");
const Book = require("./models/books")
const mongoose = require("mongoose");
const books = require("./models/books");

app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);

require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
//insert items to the db
// books.create({
//     title: "The Hunger Games",
//     author: "Suzanne Collins",
//     bookid:"1",
//     url: "https://www.amazon.ca/Hunger-Games-Suzanne-Collins/dp/0439023521/ref=pd_bxgy_img_sccl_2/134-2452071-0386103?pd_rd_w=lALb6&pf_rd_p=19eafb8a-881a-44bb-9725-85a79b8c53d4&pf_rd_r=6YGXN41JKVRP7YBKN4MN&pd_rd_r=46c6b2ae-4067-417d-a01f-3688db9ab98e&pd_rd_wg=7Akw0&pd_rd_i=0439023521&psc=1",

// },
//     function (error,savedDocument) {
//         if (error) console.log(error);
//         console.log(savedDocument);
//     }
// );

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(express.static("public"))

app.set("view engine", "ejs");

app.get(
    "/",
    homeController.getBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("home", { books: req.data});
    }
);

app.get(
    "/home",
    homeController.getBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("home", { books: req.data});
    }
);

app.get(
    "/books", 
    homeController.getBooks,
    (req, res, next) => {
        console.log(req.data);
        res.send(req.data);
    }
);

app.get(
    "/books/:bookNumber", 
    homeController.reqBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("books", { books: req.data});
    }
);

app.post("/", (req, res) => {
    res.writeHead(httpStatus.StatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});


app.use(homeController.logRequestPaths);
app.use(homeController.respondNoResourceFound);
app.use(homeController.respondInternalError);



app.listen( app.get("port"), () => {
    console.log(`The server has started at http://localhost:${app.get("port")}`);
});