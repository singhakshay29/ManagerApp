const asyncHandle = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc get all contacts

//CRUD Operation

//Read
const getContact = asyncHandle(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
  // res.status(200).json({ message: "Get all contacts" });//previously using
});

//Create
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
    user_id: req.user.id,
  });
  res.status(201).json(contact);
  // res.status(201).json({ message: "Create Contact" });
});
//update
const updateContact = asyncHandle(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Something went Wrong");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
  // res.status(200).json({ message: `update contact for ${req.params.id}` });
});
//Delete
const deleteContact = asyncHandle(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Something went Wrong");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

const getSingleContact = asyncHandle(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Something went Wrong");
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
