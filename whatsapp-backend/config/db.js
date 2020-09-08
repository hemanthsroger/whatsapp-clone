import mongoose from "mongoose";

export const DbConfig = {
  DB:
    "mongodb+srv://admin:w9j0AQk70by4JtbC@cluster0.kldeb.mongodb.net/whatsappdb?retryWrites=true&w=majority",
  Options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

export const dbConnection = mongoose.connection;
