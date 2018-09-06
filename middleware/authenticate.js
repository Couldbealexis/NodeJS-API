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
    UserType.findOne({_id: user.type})
              .then(
                userType => {
                  if ( !userType ){
                    return Promise.reject();
                  }
                  if (userType.description != "admin"){
                    res.status(401).send();
                  }else{
                    req.user = user;
                    req.token = token;
                    next();
                  }
                }).catch(e => res.status(500).send()); 
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate, adminAuthenticate};
