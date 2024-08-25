const dayjs = require("dayjs");
const { Debates } = require("../models");
const { Debators } = require("../models");
const { Citizen } = require("../models");
const { where } = require("sequelize");
require("dotenv").config();
exports.makeDebate = async (req, res) => {
  const { debateTitle, debateDescription, dateOfDebate, secondDebatorID } =
    req.body;
  const { id, name } = req.user;
  const { makerToken, secondDebator } = req.tokens;
try{
  const debate = await Debates.create({
    debateTitle: debateTitle,
    debateDescription: debateDescription,
    dateOfDebate: dateOfDebate,
  });

  const debator = await Debators.create({
    debatorID: secondDebatorID,
    debateID: debate.id,
    debatorToken: secondDebator,
  });
  const debator2 = await Debators.create({
    debatorID: id,
    debateID: debate.id,
    debatorToken: makerToken,
  });
  res.json({
    message: "Debate Made successfully",
    debate: debate,
    debator: [debator, debator2],
  });
}
catch(e){
  res.json({error:e});
}
};

exports.getDebates = async (req, res) => {
  try {
    const debates = await Debates.findAll();
    res.json({ message: "debates found successfully", debates: debates });
  } catch (e) {
    res.json({ errorMessage: "Could not retrieve debates", error: e });
  }
};

exports.getDebator = async (req, res) => {
  const { debateID } = req.query;
  const { id } = req.user;
  try {
    const debator = await Debators.findOne({
      where: {
        debateID: debateID,
        debatorID: id,
      },
    });
    const debatorData = await Citizen.findOne({
      where: {
        nationalID: id,
      },
    });

    res.json({
      message: "Retrieved deators successfully",
      debators: {
        debatorData: debatorData,
        debator: debator,
      },
    });
  } catch (e) {
    console.log(e);
    res.json({ errorMessage: "Failed to retrieve debators", error: e });
  }
};
exports.getDebators = async (req, res) => {
  const {debateID} = req.query;
  try {
    const debators = await Debators.findAll({
      where: {
        debateID: debateID,
      },
    });
    if (debators)
      res.json({ message: "Debators found successfully", debators: debators });
    else console.log("no debators nigga");
  } catch (e) {
    res.json({ message: "Internal server error", error: e });
  }
};
