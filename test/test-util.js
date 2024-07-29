import { prismaClient } from "../src/app/database";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      firstName: "test",
      lastName: "test",
      email: "test@gmail.com",
      phone: "08123456789",
    },
  });
};

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
};
