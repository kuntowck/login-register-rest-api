import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
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

export default {
  register,
  login,
};
