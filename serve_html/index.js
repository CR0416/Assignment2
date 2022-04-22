const express = require("express")
const app = express();
const homeController = require("./controllers/HomeController");
const httpStatus = require("http-status-codes");
const mongoose = require("mongoose");
const books = require("./models/books");
const methodOverride = require("method-override");

app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

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
//     title: "TheHungerGames",
//     author: "Suzanne Collins",
//     url: "https://www.amazon.com/dp/B07HHJ7669?plink=kWJK38TQ7sXR7Rue&ref_=adblp13nvvxx_0_1_im",
// },
// books.create({
//         title: "Catching Fire",
//         author: "Suzanne Collins",
//         url: "https://www.amazon.ca/Catching-Fire-Second-Hunger-Games/dp/0545586178/ref=pd_bxgy_img_sccl_1/134-2452071-0386103?pd_rd_w=VFjBj&pf_rd_p=19eafb8a-881a-44bb-9725-85a79b8c53d4&pf_rd_r=VXCD7W6AYA6XF4EYD635&pd_rd_r=9f67af23-9c64-4780-8f2c-188259a8afcb&pd_rd_wg=eBHWn&pd_rd_i=0545586178&psc=1",
//     },
// books.create({
//             title: "Mockingjay",
//             author: "Suzanne Collins",
//             url: "https://www.amazon.ca/Catching-Fire-Second-Hunger-Games/dp/0545586178/ref=pd_bxgy_img_sccl_1/134-2452071-0386103?pd_rd_w=VFjBj&pf_rd_p=19eafb8a-881a-44bb-9725-85a79b8c53d4&pf_rd_r=VXCD7W6AYA6XF4EYD635&pd_rd_r=9f67af23-9c64-4780-8f2c-188259a8afcb&pd_rd_wg=eBHWn&pd_rd_i=0545586178&psc=1",
//         },
// books.create({
//             title: "The Paper Palace: A Novel",
//             author: "Miranda Cowley Heller",
//             url: "https://www.amazon.ca/Paper-Palace-Miranda-Cowley-Heller/dp/0593419073/ref=sr_1_14?crid=N6GYN4BCU215&keywords=books&qid=1650658158&sprefix=book%2Caps%2C103&sr=8-14",
//         },
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

app.get(
    "/DeleteABook", 
    homeController.getBooks,
    (req, res, next) => {
        console.log(req.data);
        res.render("deletebook", { books: req.data});
    }
);

app.get("/AddNewBook", homeController.new);
app.post("/create", homeController.create, homeController.redirectView);
app.delete("/books/:id/delete", homeController.delete, homeController.redirectView);

app.listen( app.get("port"), () => {
    console.log(`The server has started at http://localhost:${app.get("port")}`);
});