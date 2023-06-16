const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

class LoginController {
    // [POST] /login
    login(req, res, next) {
        console.log('req:', req.body);
        const { username, password } = req.body;
        if (!username) {
            return res.status(220).json({msg: 'Username can be empty.'});
        } else if (!req.body.password) {
            return res.status(220).json({msg: 'Password can be empty.'});
        }

        //Xử lý
        Account.findOne({ username: username })
            .then((account) => {
                if (!account) {
                    return res.status(220).json({msg: 'Username does not exist.'});
                } else {
                    bcrypt.compare(
                        password,
                        account.password,
                        function (err, result) {
                            if (result) {
                                return res.status(200).json({
                                    token: generateToken(account._id),
                                });
                            } else {
                                return res
                                    .status(220)
                                    .json({msg: 'Password is incorrect.'});
                            }
                        },
                    );
                }
            })
            .catch(next);
    }

    getUser(req, res) {
        Account.findOne({ id: req.params.id })
            .then((account) => {
                res.json(account);
            })
            .catch(() => {
                res.send('null');
            });
    }

    getUserById(req, res) {
        Account.findOne({ _id: req.params.id })
            .then((account) => {
                res.send(account);
            })
            .catch(() => {
                res.send('null');
            });
    }

    user(req, res) {
        Account.findOne({ _id: req.user._id }).then((account) => {
            res.send(account);
        });
    }
}

module.exports = new LoginController();

// Get the current logged in user
// if(req.session.User){
// Get user's id/private key
//        var pKey = req.session.User.privateKey;
//     return res.status(200).json({status: 'success', session: req.session.User})
// }
// return res.status(200).json({status: 'error', session: 'No session'})