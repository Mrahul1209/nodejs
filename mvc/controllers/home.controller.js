const homepage = (req, res) => {
    return res.render('home');
}

const aboutpage = (req, res) => {
    return res.render('about');
}
const contactpage = (req, res) => {
    return res.render('contact');
}


module.exports = { homepage, aboutpage, contactpage }