const User = require('../user/user.model');
const UserType = require('../userType/userType.model');

let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

let adminAuthenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if ( !user ){
      return Promise.reject();
    }
    if(
      UserType.findOne({_id: user.type})
              .then(userType => {userType}).description
    ){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(403).send();
  });
};

module.exports = {authenticate, adminAuthenticate};
