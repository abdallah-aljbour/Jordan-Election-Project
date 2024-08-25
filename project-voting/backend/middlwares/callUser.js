const { StreamClient } = require("@stream-io/node-sdk");
const dayjs = require("dayjs");
require("dotenv").config();

const apiKey = "682pm9spe7t3";
const secret =
  "474c88amtu4henae55hn3aunaxwpvwks7etzdryfqw7c9xd63uac3uq6nqy3jx7h";
console.log(secret);
const client = new StreamClient(apiKey, secret);

const createUserToken = async (req, res, next) => {
  const userID = req.user.id;
  const name = "basil";
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
  console.log(dateOfDebate);
  const exp = dayjs(dateOfDebate).unix();
  const iat = dayjs().unix();
  console.log(user);
  await client.upsertUsers({
    users: { [user.id]: user, [secondUser.id]: secondUser },
  });
  console.log("asd");
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
