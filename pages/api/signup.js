import Cookies from 'cookies';
import clientPromise from "../../lib/mongodb";
const { createHash } = require('node:crypto');

async function generateUniqueID(db) {
  const min = 1000;
  const max = 9999;
  const uniqueID = Math.floor(Math.random() * (max - min + 1)) + min;

  const existingUser = await db.collection("Profiles").findOne({ ID: uniqueID });
  if (existingUser) {
    // If the generated ID already exists, recursively generate a new one
    return generateUniqueID(db);
  }

  return uniqueID;
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    const username = req.body['username'];
    const password = req.body['password'];
    const passwordagain = req.body['passwordagain'];

    if (password != passwordagain) {
      res.redirect("/signup?msg=The two passwords don't match");
      return;
    }

    const client = await clientPromise;
    const db = client.db("Users");

    const users = await db.collection("Profiles").find({ "Username": username }).toArray();
    if (users.length > 0) {
      res.redirect("/signup?msg=A user already has this username");
      return;
    }

    const password_hash = createHash('sha256').update(password).digest('hex');
    const currentDate = new Date().toUTCString();

    const uniqueID = await generateUniqueID(db); // Generate a unique ID

    const bodyObject = {
      Username: username,
      Password: password_hash,
      ID: uniqueID,
      Created: currentDate
    };

    await db.collection("Profiles").insertOne(bodyObject);

    const cookies = new Cookies(req, res);
    cookies.set('username', username);

    res.redirect("/");
  } else {
    res.redirect("/");
  }
}
