import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validaton.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser == 1) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  // validasi login request dari user
  const loginRequest = validate(loginUserValidation, request);

  // mengambil data username dan password dari database
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  // cek apakah ada username atau password
  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  // validasi password dari request dengan password dari database
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  // cek jika password salah
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }
  // membuat token untuk user
  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      // menambahkan token ke database
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      // mengambil token untuk user
      token: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return prismaClient.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
