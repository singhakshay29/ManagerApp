const asyncHandle = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc get all contacts

const getContact = asyncHandle(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
  // res.status(200).json({ message: "Get all contacts" });//previously using
});

const createContact = asyncHandle(async (req, res) => {
  console.log(req.body, "body");
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandetory");
  }
  const contact = Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
  // res.status(201).json({ message: "Create Contact" });
});

const updateContact = asyncHandle(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: `update contact for ${req.params.id}` });
});

const deleteContact = asyncHandle(async (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});
const getSingleContact = asyncHandle(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
  // res.status(200).json({ message: `contact for ${req.params.id}` });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getSingleContact,
};
