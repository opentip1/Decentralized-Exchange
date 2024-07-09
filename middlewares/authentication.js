// const { validateToken } = require("../services/authentication");


// function checkForAuthenticationCookie(cookieName) {
//   return (req, res, next) => {
//     const tokenCookieValue = req.cookies[cookieName];
//     if (!tokenCookieValue) {
//       return next();
//     }


//     try {
//       const userPayload = validateToken(tokenCookieValue);
//       req.user = userPayload;
//     } catch (error) {}


//     return next();
//   };
// }


// module.exports = {
//   checkForAuthenticationCookie,
// };



const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

function redirectToHomeIfAuthenticated(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      if (userPayload) {
        return res.redirect('/');
      }
    } catch (error) {}

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
  redirectToHomeIfAuthenticated,
};
