


export const emailHtml = (email, link) => {
    let response = `
      <div style="max-width:600px; margin:auto; border:10px solid #ddd; padding:30px 20px; font-size:110%;">
      <div style="max-width:500px; height: 50px; color: white; margin:auto; border:1px solid #0f0; background-color:dodgerblue; padding:5px 25px; text-align:left; font-family: Tahoma">
          <h3 style="text-align:center; text-transform: uppercase; color:white"> Welcome To SYTYCC Community </h3>
      </div>
      <hr>
      
      
      <p>Dear ${email},</p>
  
      <h1>"Your sign up link"</h1>
     <p> Hello friend and welcome to our website. This is your link to confirm your account.${link} </p>
  
      <p>Needless to remind you not to share this link with anyone 🤫</p>
  
      <p>Thanks for choosing us, and we look forward to serving you.</p>
  
   
  
      <p>Best regards,</p>
      <p>SYTYCC!!!</p>
  
      
      </div>
      `;
    return response;
  };
  
  