
class HomeController {
    static getHomePage(req, res) {
        if (req.session && req.session.user) {
            res.render('index.ejs');
        } else {
            res.redirect('/users/login');
        }
    }
}

export default HomeController;
