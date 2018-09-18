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

  let allTicketIds = [];

  await Ticket.create(firstSetTickets, err => {
    if (err) throw err;
  });

  await Column.create({ title: "To Do" }).then(column => {
    columnId1 = column.id;
  });

  await Ticket.find({}).then(tickets => {
    tickets.forEach(ticket => {
      allTicketIds.push(ticket.id);
    });
  });

  await Column.findByIdAndUpdate(
    { _id: columnId1 },
    { $push: { ticket: { $each: allTicketIds } } }
  );

  await Ticket.create(secondSetTickets, err => {
    if (err) throw err;
  });

  await Column.create({ title: "Doing" }).then(column => {
    columnId2 = column.id;
  });

  await Ticket.find({}).then(tickets => {
    allTicketIds = [];
    tickets.forEach(ticket => {
      allTicketIds.push(ticket.id);
    });
    allTicketIds = allTicketIds.slice(6);
  });

  await Column.findByIdAndUpdate(
    { _id: columnId2 },
    { $push: { ticket: { $each: allTicketIds } } }
  );

  await Board.create({
    columns: [columnId1, columnId2]
  });

  await mongoose.connection.close();
})();

const dbName = "ja";
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`);
