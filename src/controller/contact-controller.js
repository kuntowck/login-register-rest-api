import { prismaClient } from "../app/database";
import contactService from "../service/contact-service";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await contactService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const result = await contactService.get(user, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;

    const result = await contactService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
    console.log("Error in controller update: ", error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    await contactService.remove(user, contactId);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
    console.log("Error in controller remove: ", error);
  }
};

export default { create, get, update, remove };
