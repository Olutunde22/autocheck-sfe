import { getErrorMessage } from "./utils";

describe("getErrorMessage", () => {
  const fallback = "Default error message";

  it("returns error.message if error is an instance of Error", () => {
    const error = new Error("Something went wrong");
    expect(getErrorMessage(error, { message: fallback })).toBe(
      "Something went wrong",
    );
  });

  it("returns data.message", () => {
    const error = {
      response: {
        status: 400,
        data: { message: "Bad request" },
      },
    };
    expect(getErrorMessage(error, { message: fallback })).toBe("Bad request");
  });

  it("returns errObj.message if present and is a string (not Error instance)", () => {
    const error = { message: "Custom error message" };
    expect(getErrorMessage(error, { message: fallback })).toBe(
      "Custom error message",
    );
  });

  it("returns fallback message if error is an object with no message or response", () => {
    const error = { foo: "bar" };
    expect(getErrorMessage(error, { message: fallback })).toBe(fallback);
  });

  it("returns fallback message if error is null", () => {
    expect(getErrorMessage(null, { message: fallback })).toBe(fallback);
  });

  it("returns fallback message if error is undefined", () => {
    expect(getErrorMessage(undefined, { message: fallback })).toBe(fallback);
  });

  it("returns fallback message if error is a number", () => {
    expect(getErrorMessage(123, { message: fallback })).toBe(fallback);
  });

  it("returns default fallback if no message is provided", () => {
    expect(
      getErrorMessage(null, { message: undefined as unknown as string }),
    ).toBe("Oops! Something went wrong, please try again later.");
  });
});
