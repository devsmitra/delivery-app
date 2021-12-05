# Delivery App

## Running Locally

Make sure you have Node.js installed.

```
git clone https://github.com/devsmitra/delivery-app.git # or clone your own fork
cd delivery-app
```

## Start sender and biker app by running the following commands:

Sender App:

```
cd sender
npm install
npm run dev
Your app should now be running on `http://localhost:3000`.
```

Biker App:

```
cd biker
npm install
npm run start
Your app should now be running on `http://localhost:3001`.
```

### Note:
Make sure port 3000 and 3001 are free. 

No changes required, if you run Sender app on port: 3000 and Biker app on port: 3001

Incase you want to run on different ports, change API_URL the value in the [biker/src/constants/App.ts](https://github.com/devsmitra/delivery-app/blob/main/biker/src/constants/APP.ts) file.

 
