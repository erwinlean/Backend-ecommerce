"use strict";

const { google } = require('googleapis');
const { authenticate } = require('./driveAuth');
require('dotenv').config();

const driveFolder = process.env.DRIVE_FOLDER;

async function logGenerator(req, res, next) {
    const requestStart = Date.now();
    let logged = false; // Flag to ensure next() is called only once

    // Attach an event listener to the 'close' event of the response
    res.on('close', async () => {
        if (logged) return; // If already logged, do nothing

        const logEntry = {
            ip: req.ip || req.connection.remoteAddress,
            endpoint: req.path,
            url: `${req.rawHeaders[9]}${req.path}`,
            method: req.method,
            // header: req.rawHeaders,
            timestamp: new Date(),
            processingTime: `${Date.now() - requestStart} ms`,
            resStatus: res.statusCode
        };

        try {
            // Log entry is created when the connection closes
            await uploadLogEntryToDrive(logEntry);
            logged = true; // Set the flag to true

            return logEntry;
        } catch (err) {
            console.error('Error writing to request log or uploading to Google Drive:', err);
            return err.message
        };
    });

    next();
};

async function uploadLogEntryToDrive(logEntry) {
    try {
        const auth = await authenticate();
        const drive = google.drive({ version: 'v3', auth });

        const existingFile = await drive.files.list({
            q: `'${driveFolder}' in parents and name='logs.txt' and trashed=false`,
            fields: 'files(id)',
        });

        let fileId = null;

        if (existingFile.data.files.length > 0) {
            fileId = existingFile.data.files[0].id;

            const currentContent = await drive.files.get({
                fileId: fileId,
                alt: 'media',
            });

            const newContent = currentContent.data + JSON.stringify(logEntry) + '\n';

            // Actualizar el contenido del archivo en Google Drive
            await drive.files.update({
                fileId: fileId,
                media: {
                    mimeType: 'text/plain',
                    body: newContent,
                },
            });

            console.log('Log entry updated on Google Drive successfully.');
        } else {
            // Crear un nuevo archivo si no existe
            await drive.files.create({
                resource: {
                    name: 'eCommerceLogs.txt',
                    parents: [driveFolder],
                },
                media: {
                    mimeType: 'text/plain',
                    body: JSON.stringify(logEntry) + '\n',
                },
                fields: 'id',
            });

            console.log('Log entry uploaded to Google Drive successfully.');
        };
    } catch (error) {
        console.error('Error uploading log entry to Google Drive:', error);
        throw error;
    };
};


module.exports = { logGenerator };