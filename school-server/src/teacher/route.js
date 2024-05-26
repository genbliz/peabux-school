//@ts-check
const { getAllTeachers, getTeacherById, createTeacher, updateTeacherById, deleteTeacherById } = require("./api");
const { StatusCode } = require("../helper/util");
const { Router } = require("express");
const { createFriendlyErrorResponse, GenericFriendlyError } = require("../helper/errors");
const { zodValidate } = require("../helper/zod-validate");
const { createTeacherSchema } = require("./teacher-schema");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const validationResult = zodValidate(createTeacherSchema(), req.body);

    if (validationResult.errors) {
      const error01 = validationResult.errors[0];
      throw GenericFriendlyError.createValidationError(error01.formatedError || error01.originalError);
    }

    const teacher = await createTeacher(validationResult.data);
    res.status(StatusCode.Created_201).json({ data: teacher });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.put("/", async (req, res) => {
  try {
    const validationResult = zodValidate(createTeacherSchema(true), req.body);

    if (validationResult.errors) {
      const error01 = validationResult.errors[0];
      throw GenericFriendlyError.createValidationError(error01.formatedError || error01.originalError);
    }

    const teacher = await updateTeacherById(validationResult.data);
    res.status(StatusCode.OK_200).json({ data: teacher });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.get("/", async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    res.status(StatusCode.OK_200).json({ data: teachers });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const teacher = await getTeacherById(req.params.id);
    res.status(StatusCode.OK_200).json({ data: teacher });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const teacher = await deleteTeacherById(req.params.id);
    res.status(StatusCode.OK_200).json({ data: teacher });
  } catch (error) {
    const { httpStatus, responseData } = createFriendlyErrorResponse(error);
    res.status(httpStatus).json(responseData);
  }
});

module.exports = { teacherRoutes: router };
