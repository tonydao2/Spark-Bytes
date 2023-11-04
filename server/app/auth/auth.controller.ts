import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';
//import jwt from 'jsonwebtoken';
//import bcrypt from 'bcrypt';
//import { env } from '../common/setupEnv.ts';
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
