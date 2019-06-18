let db = require('../configDb');
let async = require("async");

module.exports.getParams = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT `LOGIN` as login, `PASSWD` as passwd FROM `parametres` ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};



module.exports.isMannequin = function (id, callback) {
    async.parallel(
        [function (callback) {
            db.getConnection(function (err, connexion) {
                if (!err) {
                    let sql = "SELECT COUNT(VIP_NUMERO) AS isMannequin FROM mannequin WHERE VIP_NUMERO =  '" + id + "'";
                    connexion.query(sql, callback);
                    connexion.release();
                }
            });
        }], function (err, result) {
            if (!err) {

                let nomProfession;

                if (result[0][0][0].isMannequin === 1) {
                    nomProfession = "Mannequin";
                }

                callback(null, nomProfession);
            }
        });

};
