const mockAuthenticatedUser = {
  _id: "68de44444444444444444444",
  authId: "google-test-user-001",
  name: "CareerTrack Test User",
  email: "testuser@example.com",
  role: "user",
};

const mockAuthentication = (req, res, next) => {
  req.user = mockAuthenticatedUser;
  req.isAuthenticated = () => true;
  next();
};

const mockUnauthenticated = (req, res, next) => {
  req.user = undefined;
  req.isAuthenticated = () => false;
  next();
};

module.exports = {
  mockAuthenticatedUser,
  mockAuthentication,
  mockUnauthenticated,
};