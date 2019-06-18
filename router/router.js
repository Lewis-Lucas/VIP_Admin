let LoginController = require('./../controllers/LoginController');
let VipAdminController = require('./../controllers/VipAdminController');
let PhotoAdminController = require('./../controllers/PhotoAdminController');

// Routes
module.exports = function (app) {

    /*app.get('/!*', function (req, res) {

        sess = req.session;

        // Si déjà connecté
        if (!sess.pseudo && req.path !== "/login") {
            console.log("test");
            res.redirect('/login');
        }

    });*/

    // Login
    app.get('/', LoginController.Login);
    app.get('/login', LoginController.Login);
    app.post('/attemptLogin', LoginController.AttemptLogin);

    //Ajouter VIP
    app.get('/ajouter', VipAdminController.AjoutVIP);
    app.post('/ajoutNewVIP', VipAdminController.AjoutNewVIP);
    app.post('/ajoutProfessionNewVIP', VipAdminController.AjoutProfessionNewVIP);

    //Repetoire VIP
    app.get('/:target/listerVIP', VipAdminController.Repertoire);
    app.get('/:target/listerVIP/:lettre', VipAdminController.Repertoire);

    //Modifier VIP
    app.get('/modifier/:idVip', VipAdminController.ModifierVIP);
    app.post('/modifierNewVIP', VipAdminController.ModifierNewVIP);

    //Supprimer VIP
    app.get('/supprimer/:idVip', VipAdminController.SupprimerVIP);
    app.post('/supprimerUnVIP', VipAdminController.SupprimerUnVIP);

    //Ajouter Photo
    app.get('/ajouterPhoto', PhotoAdminController.AjoutPhotoVIP);
    app.post('/ajoutNewPhoto', PhotoAdminController.AjoutNewPhotoVIP);

    //Supprimer Photo
    app.get('/supprimerPhoto/:idVip', PhotoAdminController.SupprimerPhotoVIP);
    app.post('/supprimerUnePhoto', PhotoAdminController.SupprimerUnePhotoVIP);

    // tout le reste
    app.get('*', LoginController.NotFound);
    app.post('*', LoginController.NotFound);

};
