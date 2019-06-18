let model = require("../models/vip.js");
let async = require("async");

// ////////////////////////////////////////////// A C C U E I L
module.exports.AjoutVIP = function (request, response) {
    response.title = "Ajout VIP";

    model.getNationalite(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.nationalite = result;

        response.render('vipAdminAjouter', response);

    });
};


module.exports.AjoutNewVIP = function (request, response) {
    let newVIP = request.body.newVIP;
    /*model.ajoutNewVIP(newVIP, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        model.ajoutPhotoPrincipaleVIP(result.insertId, newVIP, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.ajouterCouturier = "oui";
            response.render('vipAdminAjouterProfession', response);
        });

    });*/
    response.ajouterCouturier = "oui";
    response.render('vipAdminAjouterProfession', response);

};

module.exports.Repertoire = function (request, response) {
    response.title = 'Détail lettre';
    let lettre;
    let target;

    if (request.params != null) {
        target = request.params.target;
        lettre = request.params.lettre;
    }

    async.parallel(
        [
            function (callback) {
                model.getStarsCorrespondingToALetter(lettre, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getAlphabet(function (err, result) {
                    callback(null, result)
                });
            }
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.personne = result[0];
            response.lettres = result[1];
            response.target = target;
            response.render('repertoireVips', response);
        }
    );
};


module.exports.ModifierVIP = function (request, response) {
    let idVip = request.params.idVip;

    response.title = "Modifier VIP";

    async.parallel(
        [
            function (callback) {
                model.getNationalite(function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    callback(null, result)
                });
            },
            function (callback) {
                model.getVipById(idVip, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    callback(null, result)
                });
            }

        ], function (err, result) {

            if (err) {
                console.log(err);
                return;
            }

            response.nationalite = result[0];
            response.infoVip = result[1];
            response.infoVip.idVip = idVip;

            response.render('vipAdminModifier', response);
        }
    )
};


module.exports.ModifierNewVIP = function (request, response) {
    let idVIP = request.body.idVip;
    let newVIP = request.body.newVIP;
    model.modifierNewVIP(idVIP, newVIP, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        model.modifierPhotoPrincipaleVIP(idVIP, newVIP, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            response.redirect("/modifier/listerVIP");
        });

    });
};

module.exports.SupprimerVIP = function (request, response) {

    let idVip = request.params.idVip;

    response.title = "Supprimer VIP";

    model.getVipById(idVip, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.infoVip = result[0];
        response.infoVip.idVip = idVip;

        response.render('vipAdminSupprimer', response);
    });
};

module.exports.SupprimerUnVIP = function (request, response) {
    let idVIP = request.body.idVip;

    model.supprimerUnVip(idVIP, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.redirect("/ajouter");
    });
};

module.exports.AjoutProfessionNewVIP = function (request, response) {
    response.infoVip = result[0];
    response.infoVip.idVip = idVip;

    response.redirect("/ajouter");
};