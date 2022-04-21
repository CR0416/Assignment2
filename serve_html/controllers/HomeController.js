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
    let id = req.params.bookNumber;
    Book.findOne({"bookid": id}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.getBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};