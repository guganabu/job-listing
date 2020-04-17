const express = require('express')
const config = require('./config');
const cors = require('cors')
const axios = require('axios');
const jobs = require('./job').handlers;
const db = require('./db');
const app = express()
const port = 3000

app.use(cors());

/***
 * METHOD: POST
 * To ETL job items from github source
 */
app.post('/api/jobs/sync', (req, res) => {
    axios.get(config.GITHUB_JOBS_DOMAIN + '/positions.json').then((payload) => {
        const importedCount = jobs.importJobs(payload.data);
        res.send({totalCount: importedCount});
    })
    .catch((error) => {
        console.log('Error ', error)
        res.send('Errow while importing jobs')
    })
});

/**
 * METHOD: GET
 * To fetch all matching job items 
 */
app.get('/api/jobs', (req, res) => {
    const queryParams = req.query;
    // Supported request params object
    const requestParams = {};
    if (queryParams.title &&  queryParams.title !== '') {
        requestParams.title = queryParams.title
    } 
    if (queryParams.location &&  queryParams.location !== '') {
        requestParams.location = queryParams.location
    } 
    jobs.fetchJobs(requestParams, (rows) => {
        res.send(rows);
    });    
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
