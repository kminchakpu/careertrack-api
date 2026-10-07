jest.mock("../db/connect", () => ({
  getDatabase: jest.fn(),
}));

const passport = require("../config/passport");
const { getDatabase } = require("../db/connect");

describe("Passport session behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Passport configuration is loaded", () => {
    expect(passport).toBeDefined();
    expect(passport.serializeUser).toBeDefined();
    expect(passport.deserializeUser).toBeDefined();
  });

  test("Google strategy is registered", () => {
    expect(passport._strategy("google")).toBeDefined();
  });

  test("Google strategy is named google", () => {
    const strategy = passport._strategy("google");

    expect(strategy.name).toBe("google");
  });

  test("Passport has serializers configured", () => {
    expect(passport._serializers.length).toBeGreaterThan(0);
  });

  test("Passport has deserializers configured", () => {
    expect(passport._deserializers.length).toBeGreaterThan(0);
  });
});