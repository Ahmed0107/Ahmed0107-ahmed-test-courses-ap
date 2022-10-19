const Joi = require("joi");
const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

//get all courses
router.get("/", (req, res) => {
  res.send(courses);
});

//get course by id
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cours with given ID was not found");
  res.send(course);
});

// add a new course
router.post("/", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  const result = validateCourse(req.body);
  if (result) {
    courses.push(course);
    res.send(courses);
  }
});

//update a course
router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cours with given ID was not found");

  const result = validateCourse(req.body);

  course.name = req.body.name;

  res.send(course);
});

//delete a course
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cours with given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses)
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ name: course.name });
}

module.exports = router;
