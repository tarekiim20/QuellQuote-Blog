import express from "express";
import bodyParser from "body-parser";
import MethodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(MethodOverride("_method"));
var quotesObject = [
  {
    genere: "Social Well-Being",
    author: "― Oprah Winfrey",
    date: "Nov 12",
    quoteBody:
      "“Surround yourself with only people who are going to lift you higher.”",
    id: "1111",
  },
  {
    genere: "Spiritual Wellness",
    author: "― John Steinbeck",
    date: "1995",
    quoteBody: "“A sad soul can kill you quicker, far quicker than a germ.”",
    id: "1200",
  },
  {
    genere: "Happiness",
    author: "― Voltaire",
    date: "1995",
    quoteBody: "“I have chosen to be happy because it is good for my health.”",
    id: "1400",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { quotes: quotesObject });
});

for (let index = 0; index < quotesObject.length; index++) {
  var { quotesID } = quotesObject[index].id;
}

app.get("/blog.ejs", (req, res) => {
  res.render("blog.ejs", { quotes: quotesObject });
});
app.listen(PORT, () => {
  console.log(`Your server is running through the port ${PORT}`);
});

app.post("/subscribe", (req, res) => {
  if (req.body.userEmail === "") {
    res.status(400).send("Enter your email to subscribe to our blog!");
  }
});

app.get("/new", (req, res) => {
  var quotesObjectBlank = {
    genere: "",
    author: "",
    date: "",
    quoteBody: "",
    id: "",
  };
  res.render("new.ejs", { quotes: quotesObjectBlank });
});

app.get("/blog.ejs/edit/:quotesID", (req, res) => {
  var quoteWithID = quotesObject.find(
    (quote) => quote.id === req.params.quotesID
  );
  res.render("edit.ejs", { quotes: quoteWithID });
});

app.post("/blog.ejs", (req, res) => {
  const newlyCreatedQuote = {
    genere: req.body.newQuoteGenere,
    author: "― " + req.body.newQuoteAuthor,
    date: req.body.newQuoteDate,
    quoteBody: req.body.newQuoteBody,
    image: req.body.newQuotePicture,
    id: req.body.newQuoteID,
  };
  quotesObject.push(newlyCreatedQuote);
  res.render("show.ejs", { quotes: newlyCreatedQuote });
});

app.delete("/delete/:quotesID", (req, res) => {
  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  console.log(req.params);
  removeByAttr(quotesObject, "id", req.params.quotesID);
  res.redirect("/blog.ejs");
});

app.get("/blog.ejs/:quotesID", (req, res) => {
  const quoteWithID = quotesObject.find(
    (quote) => quote.id === req.params.quotesID
  );
  res.render("showNewQuote.ejs", { quoteView: quoteWithID });
});

app.put("/blog.ejs/edit/:quotesID", (req, res) => {
  try {
    let IndexOfQuoteToBeEdited = quotesObject.findIndex(
      (quote) => quote.id === req.body.newQuoteID
    );
    quotesObject[IndexOfQuoteToBeEdited].genere = req.body.newQuoteGenere;
    quotesObject[IndexOfQuoteToBeEdited].author = req.body.newQuoteAuthor;
    quotesObject[IndexOfQuoteToBeEdited].date = req.body.newQuoteDate;
    quotesObject[IndexOfQuoteToBeEdited].quoteBody = req.body.newQuoteBody;
  } catch (error) {
    res.send("don't change the ID");
  }

  res.redirect("/blog.ejs");
});

app.get("/aboutMe.ejs", (req, res) => {
  var sendEmail = {
    email: req.body.contactEmail,
    name: req.body.contactName,
    text: req.body.textMessage,
  };
  res.render("aboutMe.ejs", { mail: sendEmail });
});

app.post("/mail", (req, res) => {
  res.redirect("/aboutMe.ejs");
});

app.get("/contact.ejs", (req, res) => {
  var sendEmail = {
    email: req.body.contactEmail,
    name: req.body.contactName,
    text: req.body.textMessage,
  };
  res.render("contactMe.ejs", { mail: sendEmail });
});
