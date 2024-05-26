//@ts-check
const { getAllStudents, getStudentById, createStudent, updateStudentById, deleteStudentById } = require("./api");
const { StatusCode } = require("../helper/util");
const { Router } = require("express");
const { zodValidate } = require("../helper/zod-validate");
const { createStudentSchema } = require("./student-schema");
const { createFriendlyErrorResponse, GenericFriendlyError } = require("../helper/errors");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const validationResult = zodValidate(createStudentSchema(), req.body);

    if (validationResult.errors) {
      const error01 = validationResult.errors[0];
      throw GenericFriendlyError.createValidationError(error01.formatedError || error01.originalError);
    }
    const student = await createStudent(validationResult.data);
    res.status(StatusCode.Created_201).json(student);
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.put("/", async (req, res) => {
  try {
    const validationResult = zodValidate(createStudentSchema(true), req.body);

    if (validationResult.errors) {
      const error01 = validationResult.errors[0];
      throw GenericFriendlyError.createValidationError(error01.formatedError || error01.originalError);
    }

    const student = await updateStudentById(validationResult.data);

    res.status(StatusCode.OK_200).json({ data: student });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(StatusCode.OK_200).json({ data: students });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    res.status(StatusCode.OK_200).json({ data: student });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await deleteStudentById(req.params.id);
    res.status(StatusCode.OK_200).json({ data: student });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

module.exports = { studentRoutes: router };
