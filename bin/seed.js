const mongoose = require("mongoose");
const Board = require("../src/server/models/Board");
const Ticket = require("../src/server/models/Ticket");
const Column = require("../src/server/models/Column");
const User = require("../src/server/models/User");

const firstSetTickets = [
  { title: "Lorem1" },
  { title: "Ipsum1" },
  { title: "Kanban1" },
  { title: "Agile1" },
  { title: "Foo1" },
  { title: "Bar1" }
];

const secondSetTickets = [
  { title: "Lorem2" },
  { title: "Ipsum2" },
  { title: "Kanban2" },
  { title: "Agile2" },
  { title: "Foo2" },
  { title: "Bar2" }
];

(async () => {
  let columnId1 = "";
  let columnId2 = "";
  let columnIds = [];

  let allTicketIds = [];

  await Ticket.create(firstSetTickets, err => {
    if (err) throw err;
  });

  await Column.create({ title: "To Do" }).then(column => {
    columnIds[0] = column.id;
  });

  await Ticket.find({}).then(tickets => {
    tickets.forEach(ticket => {
      allTicketIds.push(ticket.id);
    });
  });

  await Column.findByIdAndUpdate(
    { _id: columnIds[0] },
    { $push: { ticket: { $each: allTicketIds } } }
  );

  await Ticket.create(secondSetTickets, err => {
    if (err) throw err;
  });

  await Column.create({ title: "Doing", limit: 5 }).then(column => {
    columnIds[1] = column.id;
  });

  await Ticket.find({}).then(tickets => {
    allTicketIds = [];
    tickets.forEach(ticket => {
      allTicketIds.push(ticket.id);
    });
    allTicketIds = allTicketIds.slice(6);
  });

  await Column.findByIdAndUpdate(
    { _id: columnIds[1] },
    { $push: { ticket: { $each: allTicketIds } } }
  );

  await Column.create({ title: "Review", limit: 3 }).then(column => {
    columnIds[2] = column.id;
  });

  await Column.create({ title: "Done" }).then(column => {
    columnIds[3] = column.id;
  });

  await Board.create({
    columns: columnIds
  });

  await mongoose.connection.close();
})();

const dbName = "ja";
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`);
