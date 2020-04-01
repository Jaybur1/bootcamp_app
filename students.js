const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const args = process.argv.slice(2);
args[0] = `%${args[0]}%`

const getStudentsByCohort = (args, cb) => {
  pool
  .query({
    text:     `
    SELECT students.id as id , students.name as name, cohorts.name as cohort
    FROM students
    JOIN cohorts ON (cohort_id = cohorts.id)
    WHERE cohorts.name LIKE $1
    LIMIT $2::INTEGER;
   `,
    values: args
  })
  .then(res => {
    cb(res.rows);
  })
  .catch(err => console.error("query error", err.stack));
}



getStudentsByCohort(args,data => {
  console.log(data)
})