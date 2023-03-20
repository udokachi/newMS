
import { google } from 'googleapis';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import UserAttribute from '../Database/model/userModel.js';
import { Generatesignature, makeToken, option } from '../utils/utils.js';
import { emailHtml } from "../view/userEmail.js";
import { mailSent, FromAdminMail, userSubject } from "../utils/userNotification.js";
import jwt from 'jsonwebtoken'
import { APP_URL } from '../config/config.js';
import dotenv from 'dotenv'
dotenv.config()

const googleAuth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const client = googleAuth.getClient();
const spreadsheetId = '1LE7LuX42zQmzjaWQpHuocsQBhNULY4vP5ACJTOQZFAY';
const googleSheets = google.sheets({
  version: 'v4',
  auth: client,
});

const createUser = async (req, res) => {
  try {
    const user = await UserAttribute.create(req.body);
    console.log(req.body)

    const { email } = req.body;

    console.log(email);
    
    const createSpreasheet = await googleSheets.spreadsheets.values.append({
      auth: googleAuth,
      spreadsheetId,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            user._id,
            user.name,
            user.codeName,
            user.email,
            user.phoneNumber,
            user.gender,
            user.image,
            user.stack,
            user.verified,
          ],
        ],
      },
    });
    console.log("createSpreadsheet is ", createSpreasheet)

    let signature = await Generatesignature({
      id: user._id,
      email: user.email,
      verified: user.verified,
    });

  

    const link = `${process.env.VERIFY_EMAIL_LINK}${signature}${signature}`;
    const html = emailHtml(email, link);
    await mailSent(FromAdminMail, email, userSubject, html);
  ;
    return res.status(201).json({
      message:
        "User created successfully ",
      verified: user.verified,
    })


  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>", error.description, error.stack, error.search)
    console.error(error);
    res.status(400).json({
      status: 'false',
      message: 'not found',
    });
  }
};



export const login = async (req, res) => {
 // Login endpoint => {
  const { email } = req.body;
  if (!email) {
    res.status(404);
    res.send({
      message: "You didn't enter a valid email address.",
    });
  }
  const token = makeToken(email);
  const mailOptions = {
    from: "You Know",
    html: emailTemplate({
      email,
      link: `http://localhost:${Port}/account?token=${token}`,
    }),
    subject: "Your Magic Link",
    to: email,
  };
  return mailSent.send  (mailOptions, (error) => {
    if (error) {
      res.status(404);
      res.send("Can't send email.");
    } else {
      res.status(200);
      res.send(`Magic link sent. : http://localhost:${Port}/account?token=${token}`);
    }
  });
};



// export const verifyUser = async (req, res) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   const data = jwt.verify(token, process.env.JWT_KEY);
//   try {
//     const user = await UserAttribute.findOne({ _id: data._id, 'tokens.token': token });
//     if (!user) {
//       return res.status(401).json({
//         status: 'false',
//         message: 'not authorized to access this resource',
//       });
//     }
//     res.status(200).json({ status: 'success', user });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       status: 'false',
//       message: 'not found',
//     });
//   }
// };


// export const updateUser = async (req, res) => {
//   try {
//     const user = await UserAttribute.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).json({
//         status: 'false',
//         message: 'invalid user',
//       });
//     }

//     const updatedUser = await UserAttribute.findById(req.params.id);

//     const updatedSheet = await googleSheets.spreadsheets.values.update({
//       auth: googleAuth,
//       spreadsheetId,
//       range: 'Sheet1!A:H',
//       valueInputOption: 'RAW',
//       resource: {
//         values: [
//           [
//             updatedUser._id,
//             updatedUser.name,
//             updatedUser.codeName,
//             updatedUser.email,
//             updatedUser.phoneNumber,
//             updatedUser.gender,
//             updatedUser.image,
//             updatedUser.stack,
//             updatedUser.author
//           ],
//         ],
//       },
//     });
//     console.log("updatedSheet is ", updatedSheet)

//     res.status(200).json({
//       status: 'success',
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       status: 'false',
//       message: 'not found',
//     });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const user = await UserAttribute.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         status: 'false',
//         message: 'invalid user',
//       });
//     }
//     const rows = await googleSheets.spreadsheets.values.get({
//       auth: googleAuth,
//       spreadsheetId,
//       range: 'Sheet1!A:E',
//     });
//     const filteredRows = rows.data.values.filter((row) => row[0] !== user._id.toString());
//     console.log(filteredRows)
//     const updatedSheet = await googleSheets.spreadsheets.values.update({
//       auth: googleAuth,
//       spreadsheetId,
//       range: 'Sheet1!A:E',
//       valueInputOption: 'RAW',
//       resource: {
//         values: filteredRows,
//       },
//     });
//     console.log("deletedSheet is ", updatedSheet)

//     res.status(204).json({
//       status: 'success',
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       status: 'false',
//       message: 'not found',
//     });
//   }
// };


export const getSingleUser = async (req, res) => {
  try {
    const user = await UserAttribute.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'false',
        message: 'invalid user',
      });
    }
    res.status(200).json({ status: 'success', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'false',
      message: 'not found',
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const rows = await googleSheets.spreadsheets.values.get({
      auth: googleAuth,
      spreadsheetId,
      range: 'Sheet1!A:E',
    });
    res.status(200).json({ message: 'success', data: rows.data });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'false',
      message: 'not found',
    });
  }
};

export default createUser