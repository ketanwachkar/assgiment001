const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let users = [
  {
    id: 0,
    username: "makan",
    email: "makan@google.com",
    password: "$2b$10$Sl8BsmAmJAKUCKlG2FlwZOgbiCGMkEkpgjEfc/FDdFMcq6RFaZjw2",
  },
];
// ----------------------------------------------------*
export function findUser(username) {
  return users.find((user) => user.username === username);
}

export function isUserExists(username) {
  return findUser(username) || false;
}
// ----------------------------------------------------*
export function login(username, password) {
  if (!username || !password) {
    return {
      error: "WRONG_CREDENTIAL",
      message: `Both Username and Password are required.`,
    };
  }

  if (!isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} is not defined, make sure the user is registered before.`,
    };
  }

  const user = findUser(username);
  const hashedPassword = hashPassword(password);

  if (!checkPassword(hashedPassword, user.password)) {
    return {
      error: "WRONG_CREDENTIAL",
      message: "Your Password is wrong. Shame on you!(^_^)",
    };
  }

  const token = jwt.sign({ username: user.username, email: user.email, id: user.id }, jwtSecretKey, {
    expiresIn: 3000, // 50min
  });

  return {
    payload: {
      token,
    },
  };
}
// ----------------------------------------------------------------
export function register({ username, password, email }) {
  if (!username || !password || !email) {
    return errorMessage("WRONG_CREDENTIAL", `Username, password and email is required.`);
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return errorMessage("WRONG_CREDENTIAL", `${email} is wrong.`);
  }

  if (isUserExists(username)) {
    return errorMessage(
      "DUPLICATE_USER",
      `${username} has already registered. Try another username(But never mind, don't do this.)`
    );
  }

  const hashedPassword = hashPassword(password);
  const lastUser = users[users.length - 1];
  const id = lastUser ? lastUser.id + 1 : 0;
  users = users.concat([
    {
      username,
      password: hashedPassword,
      email,
      id,
    },
  ]);

  return {
    isSuccessful: true,
    payload: {},
  };
}

export function whoAmI(username) {
  if (!username || !isUserExists(username)) {
    return {
      error: "USER_NOT_FOUND",
      message: `${username} is not defined, make sure the user is registered before.`,
    };
  }

  const user = findUser(username);
  return {
    isSuccessful: true,
    payload: {
      username: user.username,
      id: user.id,
      email: user.email,
    },
  };
}

function hashPassword(password) {
  return bcrypt.hashSync(password, salt);
}

function checkPassword(currentHashedPassword, hashedPassword) {
  return bcrypt.compare(currentHashedPassword, hashedPassword);
}

export function verifyToken(token) {
  return jwt.verify(token, jwtSecretKey);
}

// Fojan side note :
// The find() method returns the value of the first element in the
// provided array that satisfies the provided testing function.
//  If no values satisfy the testing function, undefined is returned.

// bcrypt.compare -> return a boolean

function errorMessage(error, message) {
  return {
    isSuccessful: false,
    error,
    message,
  };
}
