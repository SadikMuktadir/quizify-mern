"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const courseRouter = (0, express_1.Router)();
courseRouter.post('/create-course', course_controller_1.courseController.createCourse);
courseRouter.get('/', course_controller_1.courseController.getCourses);
courseRouter.get('/:id', course_controller_1.courseController.getSingleCourse);
exports.default = courseRouter;
