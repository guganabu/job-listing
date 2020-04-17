// const db = require("./db");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("jobs", () => {
    console.log('Database Connected')
});

exports.handlers = {
    /**
     * @function importJobs
     * @param {Array} jobList 
     * Method to import list of jobs into the Database
     */
    importJobs(jobList) {
        console.log('Jobs importer started...');
        console.log('Total job items: ' + jobList.length);
        let id = 0;
        db.parallelize(()=> {
            id++;
            jobList.map( (jobItem) => {
                db.run(
                    `INSERT INTO job 
                    (id, job_id, title, type, company, company_url, job_url, location) values 
                    (${id}, "${jobItem.id}", "${jobItem.title}", "${jobItem.type}", "${jobItem.company}", "${jobItem.company_url}", "${jobItem.url}", "${jobItem.location}")`
                    , (err) => {
                        if (err) {  
                            console.log('err', err);
                        }
                    });
                });
        });
        console.log('Jobs Imported Successfully!')
        return jobList.length;
    },

    /**
     * @function fetchJobs
     * @param {Object} query 
     * @param {METHOD} callback 
     * Method to fetch jobs by given query params
     */
    fetchJobs(query, callback) {
        let selectQuery = 'SELECT * FROM job';
        const queries = [];
        if (query.location && query.location !== '') {    
            queries.push(`location like '%${query.location}%'`);
            
        }
        if (query.title && query.title !== '') {
            queries.push(`title like '%${query.title}%'`);
        }
        if (queries.length) {
            selectQuery += ' WHERE ' + queries.join(' OR ');
        }
        db.all(selectQuery, [], (err, rows) => {
            if (err) {
                console.log('Error '+ err);
            }
            callback(rows);
        });
    }
}
