//@ts-check
const { StatusCode } = require("./util");

/**
 * @typedef IGenericResponseErrorParams
 * @type {{
  error: string | Error;
  httpStatus?: number;
  code?: string | number;
  subject?: string;
}}
*/

/**
 * @typedef StatusCode
 * @type {(typeof StatusCode)[keyof typeof StatusCode]}
 */

/**
 *
 * @param {{
  errorOption: IGenericResponseErrorParams | string | Error;
  httpStatusX?: number | null | undefined;
  codeX?: string | number | null | undefined;
}} param0
 * @returns
 */
function resolveErrorParams({ errorOption, httpStatusX, codeX }) {
  /**
   * @type {string}
   */
  let message = "Unknown Error";
  /**
   * @type {number}
   */
  let httpStatus = httpStatusX || 500;

  /**
   * @type {string | number}
   */
  let code = codeX || "E000";

  if (typeof errorOption === "string") {
    message = errorOption;
  } else if (errorOption instanceof Error) {
    message = errorOption.message;
  } else if (typeof errorOption === "object") {
    if (errorOption.error instanceof Error) {
      message = errorOption.error.message;
    } else if (typeof errorOption.error === "string") {
      message = errorOption.error;
    }
    if (errorOption?.httpStatus) {
      httpStatus = errorOption?.httpStatus;
    }
    if (errorOption?.code) {
      code = errorOption?.code;
    }
    if (errorOption?.subject) {
      message = `${errorOption.subject}:: ${message}`;
    }
  }
  return { httpStatus, message, code };
}

class GenericFriendlyError extends Error {
  // readonly httpStatus: number;
  // readonly code: string | number;

  /**
   * @param {IGenericResponseErrorParams | string | Error} errorOption
   * @param {StatusCode?} [httpStatus]
   * @param {(string | number)} [code]
   */
  constructor(errorOption, httpStatus, code) {
    super(resolveErrorParams({ errorOption }).message);
    const { httpStatus: status01, code: code01 } = resolveErrorParams({
      errorOption,
      httpStatusX: httpStatus,
      codeX: code,
    });
    this.httpStatus = status01;
    this.code = code01;
  }

  /**
   * @param {IGenericResponseErrorParams} param0
   */
  static fromError({ error, httpStatus, code }) {
    return new GenericFriendlyError({ error, httpStatus, code });
  }

  /**
   * @param {string} msg
   * @param {StatusCode?} httpStatus
   */
  static create(msg, httpStatus) {
    return new GenericFriendlyError(msg, httpStatus);
  }

  /**
   * @param {string} msg
   * @param {StatusCode?} httpStatus
   */
  static throwNew(msg, httpStatus) {
    throw new GenericFriendlyError(msg, httpStatus);
  }

  /**
   * @param {string} msg
   */
  static createUnAuthorizedError(msg) {
    return new GenericFriendlyError(msg, StatusCode.Unauthorized_401);
  }

  /**
   * @param {string} msg
   */
  static createBadRequestError(msg) {
    return new GenericFriendlyError(msg, StatusCode.BadRequest_400);
  }

  /**
   * @param {string} msg
   */
  static createForbiddenError(msg) {
    return new GenericFriendlyError(msg, StatusCode.Forbidden_403);
  }

  /**
   * @param {string} msg
   */
  static createValidationError(msg) {
    return new GenericFriendlyError(msg, StatusCode.Validation_Error_422);
  }

  /**
   * @param {string} msg
   */
  static createInternalServerError(msg) {
    return new GenericFriendlyError(msg, StatusCode.InternalServerError_500);
  }

  /**
   * @param {string} msg
   */
  static createNotFoundError(msg) {
    return new GenericFriendlyError(msg, StatusCode.NotFound_404);
  }
}

/**
 * @param {Error} err
 */
function createFriendlyErrorResponse(err) {
  if (err instanceof GenericFriendlyError) {
    return {
      code: err.code,
      httpStatus: err.httpStatus,
      responseData: {
        __isSchool: true,
        message: err.message,
        httpStatus: err.httpStatus,
        code: err.code,
      },
    };
  }
  return {
    httpStatus: StatusCode.InternalServerError_500,
    responseData: {
      __isSchool: true,
      message: "Error occured",
    },
  };
}

module.exports = { GenericFriendlyError, createFriendlyErrorResponse };
