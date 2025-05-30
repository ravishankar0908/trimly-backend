export const statusCodes = {
  created: 201,
  success: 200,
  found: 302,
  badreq: 400,
  unauth: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};

export const messages = {
  registrationSuccess: "Registration is Successfull.",
  registrationFailed: "Registration is Failed.",
  serverErrorMessage: "Internal Server Error.",
  emailNotFound: "The Given Email is not found.",
  passwordIncorrect: "The Given password is Incorrect.",
  loginSuccess: "Logged in successfully.",
  noUsers: "No users are available.",
  allUsers: "List of all the users.",
  invalidUserId: "The userid is invalid or user is not found.",
  validUserId: "user details for the given userId.",
  emailExist: "The Given Email is already Exists.",
  invalidToken: "Invalid Token or token is missing.",
};

export const userModelMessages = {
  requireFirstName: "First Name is required to register.",
  requireLastName: "Last Name is required to register.",
  requireGender: "Gender is required to register",
  requireCity: "city is required to register",
  requireEmail: "email address is required to register",
  requirePhone: "phone number is required to register",
  requirePassword: "password is required to register",
  requireConfirmPassword: "confirm password is required to register",
};
