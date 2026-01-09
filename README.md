📱 Stapubox OTP Login App

This project is a simple and clean OTP-based mobile login flow built as part of the Stapubox Mini-Assignment.
The goal was to create a smooth, real-world style mobile login experience using a phone number and OTP.

Users can:

Enter their mobile number

Receive an OTP

Verify it

Log in successfully

All API calls are integrated with the provided Stapubox backend.

✨ What the app does
1. Send OTP Screen

User enters a 10-digit Indian mobile number

The number is validated before sending

OTP is requested using the API

Errors and loading states are handled properly

2. Verify OTP Screen

OTP is entered using 4 separate input boxes

Auto-focus moves to the next box while typing

OTP is automatically submitted when all 4 digits are filled

Wrong OTP shows an error

User can resend OTP after 60 seconds

User can go back and change the number

3. Android Auto-Read

OTP is automatically detected from incoming SMS using Android SMS Retriever

If auto-read fails, the user can enter OTP manually

🔌 Backend Used

All APIs are provided by Stapubox:

Send OTP

Resend OTP

Verify OTP

They are integrated using Axios and secured with the X-Api-Token header.

🛠 Tech Used

React Native (Expo)

JavaScript

Axios

React Navigation

Android SMS Retriever

▶ How to run the app

Install dependencies

npm install


Start the app

npx expo start


Open Expo Go app on Android

Scan the QR code to run the app

📦 Build APK

To generate a real APK file:

npm install -g eas-cli
eas build --platform android


Expo will give you a download link for the APK.

📂 Project Structure
src/
 ├── api/
 │    └── auth.js
 ├── screens/
 │    ├── SendOtpScreen.js
 │    └── VerifyOtpScreen.js
 ├── components/
 │    └── OtpInput.js
 └── utils/
      └── validation.js

App.js

✅ Validations

Mobile number must be 10 digits and start with 6–9

OTP must be exactly 4 digits

Inputs are sanitized to allow only numbers

⚠ Notes

SMS auto-read works only on Android devices

OTP delivery depends on network and backend



👤 Author

Shashank
Final year B.Tech (CSE)
