const { StreamClient } = require("@stream-io/node-sdk");
const dayjs = require("dayjs");
require("dotenv").config();

const apiKey = "682pm9spe7t3";
const secret =
  "6b3a55e0261b034c70e5b16d8a572550e05c8c209e3a3c25d5a5db75d2bb2b4";
console.log(secret);
const client = new StreamClient(apiKey, secret);

const createUserToken = async (req, res, next) => {
  const userID = req.user.id;
  const name = req.user.name;
  const { dateOfDebate, secondDebatorID, secondDebatorName } = req.body;
  const user = {
    id: userID,
    role: "admin",
    name: name,
  };
  const secondUser = {
    id: secondDebatorID,
    role: "admin",
    name: secondDebatorName,
  };
  const date = new Date(dateOfDebate);
  const exp = Math.floor(date.getTime() / 1000);
  const iat = dayjs().unix();
  await client.upsertUsers({
    users: { [user.id]: user, [secondUser.id]: secondUser },
  });
  const makerToken = client.createCallToken(
    { user_id: user.id, role: "admin" },
    [],
    exp,
    iat
  );
  const secondDebator = client.createCallToken(
    { user_id: secondDebatorID, role: "admin" },
    [],
    exp,
    iat
  );
  req.tokens = { makerToken, secondDebator };
  next();
};

module.exports = createUserToken;
