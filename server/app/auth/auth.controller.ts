import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../common/setupEnv.ts';
import { create } from 'axios';
//Delete this line once you use the function
// @ts-ignore
async function doesUserExist(email: string): Promise<boolean> {
  /**
   * Check if user exists in the database
   * Potentially throws an error from Prisma
   * @param email string - email of the user
   */
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

//@ts-ignore
async function createUser(name: string, email: string, password: string) {
  /**
   * Create user in the database
   * Potentially throws an error from Prisma
   * @param name string - name of the user
   * @param email string - email of the user
   * @param password string - password of the user
   */
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return newUser;
}

async function hasher(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12)
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body; // destructure into consts
  if (!name || !email || !password){ return res.status(400).send("BAD REQUEST: missing parameter")}
  if (![name, email, password].every(item => typeof item === 'string')){
    return res.status(400).send("BAD REQUEST: malformed parameters")
  }
  const status = await doesUserExist(email);
  if (status){return res.status(409).send("CONFLICT: user already exist")}
  const hashPw = await hasher(password);
  const newUser = await createUser(name, email, hashPw);
  // assuming it was ssuccess
  const newToken = {
    id: newUser.id,
    name: name,
    email: email,
    canPostEvents: newUser.canPostEvents,
    isAdmin: newUser.isAdmin
  }
  return newToken
};

export const login = async (req: Request, res: Response) => {};
