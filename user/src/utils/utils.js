
import jwt from "jsonwebtoken";
import  APP_SECRET  from "../config/config.js";
// import { AuthPayload } from "../interface";

// const jwt = require('jsonwebtoken');
// const APP_SECRET = '';

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const Generatesignature = async (payload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
};

export const verifySignature = async (signature) => {
  return jwt.verify(signature, APP_SECRET);
};


export function convertToWords(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    let timeString = '';
  
    if (hours > 0) {
      timeString += hours + ' hour';
      if (hours > 1) {
        timeString += 's';
      }
      timeString += ' ';
    }
  
    if (remainingMinutes > 0) {
      timeString += remainingMinutes + ' minute';
      if (remainingMinutes > 1) {
        timeString += 's';
      }
    }
  
    return timeString;
  }
  
  export const makeToken = (email) => {
    const expirationDate = new Date();
    expirationDate.setHours(new Date().getHours() + 1);
    return jwt.sign({ email, expirationDate }, APP_SECRET);
  };
// export const Generatesignature = async (payload: AuthPayload) => {
//     return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
//   };
  
//   export const verifySignature = async (signature: string) => {
//     return jwt.verify(signature, APP_SECRET) as JwtPayload
//   };