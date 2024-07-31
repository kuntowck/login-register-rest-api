import {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
} from "../validation/contact-validation";
import { validate } from "../validation/validaton.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found");
  }

  return contact;
};

const update = async (user, request) => {
  const contact = validate(updateContactValidation, request);
  const totalData = await prismaClient.contact.count({
      where: {
          username: user.username,
          id: contact.id
      }
  });

  if (totalData !== 1) {
      throw new ResponseError(404, "contact is not found");
  }
  console.log('Total data count for contact:', totalData);
  return prismaClient.contact.update({
      where: {
          id: contact.id
      },
      data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
      },
      select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true
      }
  })
}

export default {
  create,
  get,
  update
};
