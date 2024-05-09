const loginModel = require("../model/login.model");
const registerModel = require("../model/register.model");

const loginController = {
  index: (req, res) => {
    res.render("login");
  },

  login: (req, res, next) => {
    let isPassMatched = false;

    req.session.regenerate(async (err) => {
      if (err) {
        next(err);
      }
      const results = JSON.parse(await registerModel.selectEmployee());

      for (const result of results) {
        const id = result.employeeId;
        const pass = result.password;
        if (req.body.user === id && req.body.pass === pass) {
          isPassMatched = true;

          break;
        }
      }
      if (isPassMatched) {
        const sessionName = await loginModel.selectEmployeeName(req.body.user);
        const sessionEmployeeId = await loginModel.selectId(req.body.user);
        req.session.user = req.body.user;
        req.session.pass = req.body.pass;
        req.session.name = sessionName;
        req.session.employeeId = sessionEmployeeId;
      }
      req.session.save((newErr) => {
        if (newErr) {
          next(newErr);
        }
        res.redirect("/login");
      });
    });
  },
};

module.exports = loginController;
