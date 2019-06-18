let db = require('../configDb');
let moment = require('moment');
let async = require("async");

module.exports.getListeVIP = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT `VIP_NUMERO` as idVip, `VIP_NOM` as nom, `VIP_PRENOM` as prenom FROM `vip`";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNationalite = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT `NATIONALITE_NUMERO` AS nationalite_nuemro, `NATIONALITE_NOM` AS nationalite FROM `nationalite`";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.ajoutNewVIP = function (newVIP, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO `vip` SET ?";
            connexion.query(
                sql,
                {
                    NATIONALITE_NUMERO: newVIP.nationaliteVIP,
                    VIP_NOM: newVIP.nomVIP,
                    VIP_PRENOM: newVIP.prenomVIP,
                    VIP_SEXE: newVIP.sexeVIP,
                    VIP_NAISSANCE: newVIP.naissanceVIP,
                    VIP_TEXTE: newVIP.commentaireVIP,
                    VIP_DATE_INSERTION: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                },
                callback);
            connexion.release();
        }
    });
};


module.exports.ajoutPhotoPrincipaleVIP = function (newVIPId, newVIP, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO " +
                "`photo`(`" +
                "PHOTO_NUMERO`, " +
                "`VIP_NUMERO`, " +
                "`PHOTO_SUJET`, " +
                "`PHOTO_COMMENTAIRE`, " +
                "`PHOTO_ADRESSE`) " +
                "VALUES ( " +
                " '1' , '" +
                newVIPId + "' , '" +
                newVIP.sujetPhotoVIP + "' , '" +
                newVIP.commentairePhotoVIP + "' , '" +
                newVIP.photoVIP + "')";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAlphabet = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT LEFT(vip_nom,1) AS lettre FROM `vip` order by lettre";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getStarsCorrespondingToALetter = function (lettre, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT vip_nom AS nom , vip_prenom AS prenom, v.vip_numero AS numero, p.PHOTO_ADRESSE AS photo FROM vip v INNER JOIN photo p ON p.vip_numero = v.vip_numero WHERE Left(vip_nom,1)  = '" + lettre + "' and photo_numero = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getVipById = function (idVip, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT " +
                "v.VIP_NOM AS nom, " +
                "v.VIP_PRENOM AS prenom, " +
                "v.VIP_NAISSANCE AS dateNaissance, " +
                "v.VIP_SEXE AS sexe, " +
                "v.NATIONALITE_NUMERO AS nationalite, " +
                "v.VIP_TEXTE AS commentaire, " +
                "p.PHOTO_SUJET AS sujetPhoto, " +
                "p.PHOTO_COMMENTAIRE AS commentairePhoto " +
                "FROM `vip` v " +
                "INNER JOIN `photo` p ON v.VIP_NUMERO = p.VIP_NUMERO " +
                "WHERE p.PHOTO_NUMERO = 1 AND v.VIP_NUMERO = " + idVip;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.modifierNewVIP = function (idVip, newVIP, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "UPDATE `vip` SET ? WHERE VIP_NUMERO = " + idVip;
            connexion.query(
                sql,
                {
                    NATIONALITE_NUMERO: newVIP.nationaliteVIP,
                    VIP_NOM: newVIP.nomVIP,
                    VIP_PRENOM: newVIP.prenomVIP,
                    VIP_SEXE: newVIP.sexeVIP,
                    VIP_NAISSANCE: newVIP.naissanceVIP,
                    VIP_TEXTE: newVIP.commentaireVIP,
                    VIP_DATE_INSERTION: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                },
                callback);
            connexion.release();
        }
    });
};


module.exports.modifierPhotoPrincipaleVIP = function (idVip, newVIP, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "UPDATE `photo` SET ? WHERE VIP_NUMERO = " + idVip;
            connexion.query(
                sql,
                {
                    PHOTO_SUJET: newVIP.sujetPhotoVIP,
                    PHOTO_COMMENTAIRE: newVIP.commentairePhotoVIP,
                    PHOTO_ADRESSE: newVIP.photoVIP
                },
                callback);
            connexion.release();
        }
    });
};

module.exports.supprimerUnVip = function (idVip, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql =
                "SET FOREIGN_KEY_CHECKS = 0; " +
                "DELETE vip, liaison, mariage, realisateur, film, joue, acteur, chanteur, composer, mannequin, apouragence, couturier, defile, defiledans, photo, comporte, apoursujet " +
                "FROM vip " +
                "LEFT JOIN liaison ON vip.VIP_NUMERO = liaison.VIP_NUMERO " +
                "LEFT JOIN mariage ON vip.VIP_NUMERO = mariage.VIP_NUMERO " +
                "LEFT JOIN realisateur ON vip.VIP_NUMERO = realisateur.VIP_NUMERO " +
                "LEFT JOIN film ON vip.VIP_NUMERO = film.VIP_NUMERO " +
                "LEFT JOIN joue ON vip.VIP_NUMERO = joue.VIP_NUMERO " +
                "LEFT JOIN acteur ON vip.VIP_NUMERO = acteur.VIP_NUMERO " +
                "LEFT JOIN chanteur ON vip.VIP_NUMERO = chanteur.VIP_NUMERO " +
                "LEFT JOIN composer ON vip.VIP_NUMERO = composer.VIP_NUMERO " +
                "LEFT JOIN mannequin ON vip.VIP_NUMERO = mannequin.VIP_NUMERO " +
                "LEFT JOIN apouragence ON vip.VIP_NUMERO = apouragence.VIP_NUMERO " +
                "LEFT JOIN couturier ON vip.VIP_NUMERO = couturier.VIP_NUMERO " +
                "LEFT JOIN defile ON vip.VIP_NUMERO = defile.VIP_NUMERO " +
                "LEFT JOIN defiledans ON vip.VIP_NUMERO = defiledans.VIP_NUMERO " +
                "LEFT JOIN photo ON vip.VIP_NUMERO = photo.VIP_NUMERO " +
                "LEFT JOIN comporte ON vip.VIP_NUMERO = comporte.VIP_NUMERO " +
                "LEFT JOIN apoursujet ON vip.VIP_NUMERO = apoursujet.VIP_NUMERO " +
                "WHERE vip.VIP_NUMERO = " + idVip + "; " +
                "SET FOREIGN_KEY_CHECKS=1; ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajoutNewPhotoVIP = function (newPhoto, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO `photo`SET ?";
            connexion.query(
                sql,
                {
                    PHOTO_NUMERO: newPhoto.numeroPhotoVIP,
                    VIP_NUMERO: newPhoto.idVip,
                    PHOTO_SUJET: newPhoto.sujetPhotoVIP,
                    PHOTO_COMMENTAIRE: newPhoto.commentairePhotoVIP,
                    PHOTO_ADRESSE: newPhoto.photoVIP
                },
                callback);
            connexion.release();
        }
    });
};

module.exports.getNbPhotoVIP = function (idVip, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(`PHOTO_NUMERO`) AS nbPhoto FROM `photo` WHERE `VIP_NUMERO` = " + idVip;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
