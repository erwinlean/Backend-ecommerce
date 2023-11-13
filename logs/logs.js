"use strict";

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { authenticate } = require('./driveAuth');
require('dotenv').config();

const driveFolder = process.env.DRIVE_FOLDER;
// const driveFile = process.env.driveFile;

async function logGenerator(req, res, next) {
    const logEntry = {
        endpoint: req.path,
        method: req.method,
        timestamp: new Date(),
        ip: req.ip || req.connection.remoteAddress,
    };

    // Ruta al archivo de logs
    const logFilePath = path.join(__dirname, 'logs.txt');

    fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', async (err) => {
        if (err) {
            console.error('Error writing to request log:', err);
            next();
        } else {
            await uploadLogFileToDrive(logFilePath, logEntry);
            next();
        };
    });
};

async function uploadLogFileToDrive(localFilePath, logEntry) {
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

            console.log('Log file updated on Google Drive successfully.');
        } else {
            const media = {
                mimeType: 'text/plain',
                body: fs.createReadStream(localFilePath),
            };

            const fileMetadata = {
                name: 'logs.txt',
                parents: [driveFolder],
            };

            await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id',
            });

            console.log('Log file uploaded to Google Drive successfully.');
        };

        // Eliminar el archivo local después de cargarlo en Google Drive
        fs.unlinkSync(localFilePath);
    } catch (error) {
        console.error('Error uploading log file to Google Drive:', error);
    };
};


module.exports = { logGenerator };