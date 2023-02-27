export const html = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body style="font-family: Poppins; width: 90%; margin: auto; margin-top: 20px; display: block">
    <section
      id="header"
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        background-color: #eaeaea;
        padding: 3px;
        align-items: center;
        border-radius: 2px;
        width: 100%;
      "
    >
      <div style="display: flex; align-items: center; width: 30%">
        <a style="display: flex; align-items: center"><img src="kyc-logo.png" alt="kyc_logo" style="height: 20px" /></a>
      </div>
      <div style="display: flex; justify-content: end; width: 60%">
        <div
          style="
            width: 50%;
            font-size: 7px;
            text-align: right;
            margin-right: 2%;
            display: flex;
            align-items: center;
            color: #4e4e4e;
          "
        >
          To verify your identity & address please download the KYC AFRICA app from:
        </div>
        <div style="width: 32%; text-align: right; justify-content: space-between; display: flex">
          <img src="apple.png" alt="apple_link" style="height: 20px" />
          <img src="google.png" alt="google_link" style="height: 20px" />
        </div>
      </div>
    </section>
    <section id="personal_details" style="width: 100%">
      <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px">Personal Details</div>
      <div style="display: flex; width: 100%">
        <div style="width: 60%">
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <div style="width: 50%">
              <h6 style="margin: 0px; font-weight: 300">Name(s):</h6>
              <h5 style="margin: 0px; font-weight: 500">Benard Tafara</h5>
            </div>
            <div style="width: 50%">
              <h6 style="margin: 0px; font-weight: 300">Surname:</h6>
              <h5 style="margin: 0px; font-weight: 500">Zvinokwazvo</h5>
            </div>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <div style="width: 50%">
              <h6 style="margin: 0px; font-weight: 300">Nationa ID:</h6>
              <h5 style="margin: 0px; font-weight: 500">4225001907</h5>
            </div>
            <div style="width: 50%">
              <h6 style="margin: 0px; font-weight: 300">Phone:</h6>
              <h5 style="margin: 0px; font-weight: 500">123454568</h5>
            </div>
          </div>
          <div>
            <div>
              <h6 style="margin: 0px; font-weight: 500">Registered on: Feb 25, 2023 11:04 AM</h6>
              <p style="font-size: 8px; font-style: italic; margin: 0px">
                This is the date when Munyaradzi Gerald Mafi registered on the KYC Africa National Identity & Address Verification
                Platform / System.
              </p>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: end; align-items: center; width: 40%">
          <img src="Qr_code_wiktionary_link.svg.png" alt="qrcode_link" style="height: 120px" />
        </div>
      </div>
    </section>
    <section
      id="verified_home_addresses"
      style="border-top: dotted 1px #4e4e4e; padding-top: 2%; margin-top: 2%; margin-bottom: 3%"
    >
      <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px; margin-bottom: 2%">
        Verified Home Addresses
      </div>
      <div style="display: flex; background-color: #f6f6f6; border-radius: 5px; overflow: hidden">
        <div style="background-color: #2fbf00; width: 15px"></div>
        <div style="margin-left: 10px; padding-top: 1%; padding-bottom: 1%">
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Address:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">5564 Jason moyo</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Surburb:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Queensdale</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">City:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Harare</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Registered On:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Feb 22, 2023</h5>
          </div>
        </div>
      </div>
    </section>
    <section id="verified_home_addresses" style="border-top: dotted 1px #4e4e4e; padding-top: 2%; margin-top: 2%">
      <div style="display: block; color: #2fbf00; font-weight: 500; font-size: 14px; margin-bottom: 2%">
        Verified Work Addresses
      </div>
      <div style="display: flex; background-color: #f6f6f6; border-radius: 5px; overflow: hidden">
        <div style="background-color: #2fbf00; width: 15px"></div>
        <div style="margin-left: 10px; padding-top: 1%; padding-bottom: 1%">
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Address:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">5564 Jason moyo</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Surburb:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Queensdale</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">City:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Harare</h5>
          </div>
          <div style="display: flex; margin-top: 2%; margin-bottom: 2%">
            <h5 style="margin: 0px; font-weight: 300; font-size: 11px">Registered On:</h5>
            <h5 style="margin: 0px; font-weight: 500; font-size: 11px">Feb 22, 2023</h5>
          </div>
        </div>
      </div>
    </section>
  </body>
</html>


`