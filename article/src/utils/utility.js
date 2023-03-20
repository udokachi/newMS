import { google } from "googleapis";

export const SCOPES = process.env.SCOPES;
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
export const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER; 
export const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;


const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );
  
  export const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  export const auth = new google.auth.GoogleAuth({
    keyFile: "eventCredentials.json",
    scopes: "https://www.googleapis.com/auth/calendar",
    projectId: GOOGLE_PROJECT_NUMBER
  });

  export const client = await auth.getClient();