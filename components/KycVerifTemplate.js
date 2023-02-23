import React from "react";

export const KycVerifTemplate = ({ data, user }) => {
  let html = `
    <html style="margin:0 !important">
    <head>
    <style>
    p,h4,h1,h2,h3,h5,h6 {margin:0;}
  </style>
     </head>
      <body style="margin:0">
       <div>
           <p style="color:green;">Personal details</p>
           <div style="display:flex; justify-content: space-between; width:100%; ">
             <div style="flex: 1;">
               <div style="display:flex; gap:10px;">
                 <div style="margin:0">
                   <p>Name(S):</p>
                   <h4>${user.firstname}</h4>
                 </div>
                 <div style="margin:0">
                   <p>Surname:</p>
                   <h4>${user.surname}</h4>
                 </div>
               </div>
               <div style="display:flex; gap:10px;">
                 <div style="margin:0">
                   <p>National ID No:</p>
                   <h4>${user.idNumber}</h4>
                 </div>
                 <div style="margin:0">
                   <p>Phone Number:</p>
                   <h4>${user.phone}</h4>
                 </div>
               </div>
               <p>Registered on: ${moment(user.createdAt).format("lll")}</p>
               <p style="font-size: 0.875rem;">
                 This is the date when ${user.firstname} ${user.surname}
                 registered on the KYC Africa National Identity & Address Verification Platform / System.
               </p>
             </div>
             <div style="flex: 1;">
             <p>Qr code here</p>
             </div>
           </div>
       </div>

       <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
         <p style="color:green;">${user.firstname}'s Home Locations</p>
         <div style="background-color: #f6f6f6;  border-radius: 5px; padding:10px;  box-shadow:inset 5px 0px 0px 0px green;>
         herer
         </div>
       </div>

       <div style="border-top: 1px dotted green; padding-top:10px; margin-top:10px">
         <p style="color:green;">${uesr.firstname}'s Work Locations</p>
         <div>
         herer two
         </div>
       </div>
     </body>
    </html>
  `;
  return html;
};

// ${
//     PdfData[0].home.length > 0
//       ? PdfData[0].home
//           .map(
//             (home) => `<div>
//     <p style="font-size: 0.875rem;">Address : ${home.streetName}</p>
//     <p style="font-size: 0.875rem;">Surburb : ${home.suburb}</p>
//     <p style="font-size: 0.875rem;">City : ${home.city}</p>
//     <p style="font-size: 0.875rem;">Added On : ${moment(home.createdAt).format("lll")}</p>
//     <p style="font-size: 0.875rem;">Verification State : ${home.homeVerified}</p>
//     <p style="font-size: 0.875rem;">Positive Verification Checks : ${home.homeTotalCount}</p>
//     <p style="font-size: 0.875rem;">Total Verification Checks: : ${home.homeVerificationCount}</p>
//   </div>`
//           )
//           .join("")
//       : `<p>${user.firstname} ${user.surname} has not set any home locations.</p>`
//   }

// ${
//     PdfData[0].work.length > 0
//       ? PdfData[0]?.work
//           .map(
//             (work) => `<div>
//     <p>Address : ${work.streetName}</p>
//     <p>Surburb : ${work.suburb}</p>
//     <p>City : ${work.city}</p>
//     <p>Added On : ${moment(work.createdAt).format("lll")}</p>
//     <p>Verification State : ${work.workVerified}</p>
//     <p>Positive Verification Checks : ${work.workTotalCount}</p>
//     <p>Total Verification Checks: : ${work.workVerificationCount}</p>
//   </div>`
//           )
//           .join("")
//       : `<p>${user.firstname} ${user.surname} has not set any work locations.</p>`
//   }
