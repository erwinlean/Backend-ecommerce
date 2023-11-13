"use strict";

// googleAuth.js
const { google } = require('googleapis');
const credentials = require('./googleAccess.json');

let storedCredentials;

async function authenticate() {
    const { client_email, private_key } = credentials;
    const oAuth2Client = new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    if (storedCredentials) {
        // Si ya hay credenciales almacenadas, úsalas directamente
        oAuth2Client.setCredentials(storedCredentials);
    } else {
        // Si no hay credenciales almacenadas, obtén nuevas credenciales
        await getNewToken(oAuth2Client);
    };

    return oAuth2Client;
};

async function getNewToken(oAuth2Client) {
    await oAuth2Client.authorize();

    storedCredentials = oAuth2Client.credentials;

    return storedCredentials;
};

module.exports = { authenticate };