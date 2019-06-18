let model = require("../models/login.js");
let Cryptr = require("cryptr");
let session = require('express-session');

// ////////////////////////////////////////////// A C C U E I L
module.exports.Login = function (request, response) {
    response.title = "Conexion à SIXVOIX";
    response.render('login', response);
};

module.exports.AttemptLogin = function (request, response) {

    model.getParams(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF'); // clé de chiffrement. Ne pas la modifier
        let decryptedString = cryptr.decrypt(result[0].passwd);

        // login : admin / mdp : TakeTheLongWayHome

            request.session.user = request.body.login;
            response.redirect("/Ajouter");


    });

};

module.exports.NotFound = function (request, response) {
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};
