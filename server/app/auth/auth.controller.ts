import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { env } from '../common/setupEnv.ts';
// import { create } from 'axios';

async function doesUserExist(email: string) {
  /**
   * Check if user exists in the database
   * Potentially throws an error from Prisma
   * @param email string - email of the user
   */
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return true;
    }
    return false;
  }
  catch (err) {
    return err;
  }
}
// Delete this line once you use the function
// @ts-ignore
async function getUser(email: string) {
  /**
   * Get user from the database
   * Potentially throws an error from Prisma
   * @param email string - email of the user
   */
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}


async function createUser(name: string, email: string, password: string) {
  /**
   * Create user in the database
   * Potentially throws an error from Prisma
   * @param name string - name of the user
   * @param email string - email of the user
   * @param password string - password of the user
   */
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return newUser;
  }
  catch (err) {
    return err;
  }
}

async function hasher(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12)
}

export const signup = async (req: Request, res: Response) => {
  // console.log(jwt, env, create) // i hate typescript
  console.log(req.body)
  const { name, email, password } = req.body; // destructure into consts
  if (!name || !email || !password) { return res.status(400).send("BAD REQUEST: missing parameter" + name + " " + email + " " + password + " here is full:::" + JSON.stringify(req.body)) }
  if (![name, email, password].every(item => typeof item === 'string')) {
    return res.status(400).send("BAD REQUEST: malformed parameters")
  }
  if (!email.includes("@") || !email.includes(".")) { return res.status(400).send("BAD REQUEST: check email") }
  const status = await doesUserExist(email);
  if (status instanceof Error) {
    console.log(status)
    return res.status(500).send("ERROR CHECK USER EXIST")
  }
  if (status) { return res.status(409).send("CONFLICT: user already exist") }
  const hashPw = await hasher(password);
  const newUser = await createUser(name, email, hashPw);
  console.log(newUser)
  if (newUser instanceof Error) {
    console.log(newUser)
    return res.status(500).send("ERROR CREATING USER")
  }
  // assuming it was ssuccess
  const newToken = {
    id: newUser.id,
    name: name,
    email: email,
    canPostEvents: newUser.canPostEvents,
    isAdmin: newUser.isAdmin
  }
  return res.status(200).json(newToken)
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Retrieve email and password from request body

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }
  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
