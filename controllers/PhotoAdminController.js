let model = require("../models/vip.js");
let async = require("async");

// ////////////////////////////////////////////// A C C U E I L
module.exports.AjoutPhotoVIP = function (request, response) {
    response.title = "Ajout VIP";

    model.getListeVIP(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.listeVip = result;

        response.render('photoAdminAjouter', response);

    });
};

module.exports.AjoutNewPhotoVIP = function (request, response) {
    let newPhoto = request.body.newPhotoVIP;

    model.getNbPhotoVIP(newPhoto.idVip, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        newPhoto.numeroPhotoVIP = result[0].nbPhoto + 1;

        model.ajoutNewPhotoVIP(newPhoto, function (err, result) {
            if (err) {
                console.log(err);
                return;

            }

            response.redirect("/ajouterPhoto");

        });

    });
};


module.exports.SupprimerPhotoVIP = function (request, response) {
    let idVip = request.params.idVip;

    model.ajoutNewPhotoVIP(newPhoto, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.render('photoAdminSupprimer', response);
    });
};


module.exports.SupprimerUnePhotoVIP = function (request, response) {
    /*let newPhoto = request.body.newPhotoVIP;

    model.getNbPhotoVIP(newPhoto.idVip, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        newPhoto.numeroPhotoVIP = result[0].nbPhoto + 1;

        model.ajoutNewPhotoVIP(newPhoto, function (err, result) {
            if (err) {
                console.log(err);
                return;

            }

            response.redirect("/ajouterPhoto");

        });

    });*/
};