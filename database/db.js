import express from "express";
import mongoose from "mongoose";

export const database = async (DB_URI) => {
  try {
    if (!DB_URI) {
      console.log("Database string is empty");
      process.exit(1);
    }
    await mongoose.connect(DB_URI);
    console.log("Database connected success!");
  } catch (error) {
    console.log(`Failed to connect database ${error}`);
  }
};
