const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

const cohortName = `%${process.argv[2]}%`;

const getTeachersThatAssisted = (cohortName, cb) => {
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
    cohorts.name LIKE $1
  ORDER BY
    teacher;
  `,[cohortName]
    )
    .then(res => {
      cb(res.rows);
      pool.end();
    })
    .catch(err => console.error("query error", err.stack));
};

getTeachersThatAssisted(cohortName, data => {
  data.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
});
