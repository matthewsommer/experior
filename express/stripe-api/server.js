const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));

app.get("/", (req, res) =>
    res.status(200).render("index.pug", { keyPublishable }));

app.post("/charge", (req, res) => {
    let amount = 500;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then(charge => res.render("charge.pug"));
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port %s', port);
});
module.exports = server;