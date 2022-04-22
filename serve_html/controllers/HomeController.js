const httpStatus = require("http-status-codes");
const { resolve } = require("path");
const Book = require("../models/books");

//handle errors  
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page requested does not exist!`);
};
 
exports.respondInternalError =(error, req, res, next) => {
    let errorCode= httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occured: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

//log the URL acessed
exports.logRequestPaths =(req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
};

exports.reqBooks = (req, res, next) => {
    let id = req.params.id;
    Book.findOne({"id": id}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.getBooks= (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.new = (req, res) => {
    res.render("AddNewBook");
};
exports.create = (req, res) => {
    let bookParams = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
    };
    if (bookParams.title == null || bookParams.author == null || bookParams.url == null) {
        res.send("All fields are required")
    }
    else {
    Book.create(bookParams)
        .then(books => {
            res.locals.redirect = "/home";
            res.locals.books = books;
            next();
        })
        .catch(error => {
            console.log(`Error adding book: ${error.message}`);
            next(error);
        });
    };
};

exports.redirectView = (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    };

exports.delete = (req, res, next) => {
    let BookID = req.params.id;
    Book.findByIdAndRemove(BookID)
    .then(() => {
        res.redirect("/home");
        next();
    })
    .catch(error => {
        console.log(`Error deleting book by ID: ${error.message}`);
        next();
    });
};