const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const invitationController = require("../controllers/invite/invitationController");

const invitationSchema = Joi.object({
  friendMail: Joi.string().email(),
});

const invitationDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  auth,
  validator.body(invitationSchema),
  invitationController.controllers.postInvitation
);

router.post(
  "/accept",
  auth,
  validator.body(invitationDecisionSchema),
  invitationController.controllers.postAccept
);

router.post(
  "/reject",
  auth,
  validator.body(invitationDecisionSchema),
  invitationController.controllers.postReject
);

module.exports = router;
