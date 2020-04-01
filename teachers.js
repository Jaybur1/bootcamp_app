const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const args = process.argv.slice(2);

const getTeachersThatAssisted = (args, cb) => {
  pool
    .query(
      `
  SELECT
    DISTINCT teachers.name AS teacher,
    cohorts.name AS cohort
  FROM
    assistance_requests
    JOIN teachers ON (teacher_id = teachers.id)
    JOIN students ON (students.id = student_id)
    JOIN cohorts on (cohorts.id = cohort_id)
  WHERE
    cohorts.name LIKE '%${args[0]}%'
  ORDER BY
    teacher;
  `
    )
    .then(res => {
      cb(res.rows);
      pool.end();
    })
    .catch(err => console.error("query error", err.stack));
};

getTeachersThatAssisted(args, data => {
  data.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
});
