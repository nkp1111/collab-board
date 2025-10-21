import { type } from "arktype";

export const userRegisterValidator = type({
  email: type.keywords.string.email,
  name: type.string.atLeastLength(3).atMostLength(50).optional(),
  password: type(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%!])[A-Za-z\d@#$%!]{8,16}$/
  ).describe(
    "8-16 characters with uppercase & lowercase letters, numbers, and a symbol (@#$%!)."
  ),
});
export type userRegisterType = typeof userRegisterValidator.infer;
