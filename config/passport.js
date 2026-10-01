const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/connect");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDatabase();
        const usersCollection = db.collection("users");

        const email =
          profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(
            new Error(
              "Google account did not provide an email address."
            ),
            null
          );
        }

        let user = await usersCollection.findOne({
          authId: profile.id,
        });

        if (!user) {
          user = await usersCollection.findOne({
            email,
          });
        }

        if (!user) {
          const newUser = {
            authId: profile.id,
            name: profile.displayName,
            email,
            role: "user",
            createdAt: new Date(),
          };

          const result =
            await usersCollection.insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser,
          };
        } else if (!user.authId) {
          await usersCollection.updateOne(
            {
              _id: user._id,
            },
            {
              $set: {
                authId: profile.id,
                updatedAt: new Date(),
              },
            }
          );

          user.authId = profile.id;
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    if (!ObjectId.isValid(id)) {
      return done(null, false);
    }

    const db = getDatabase();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

module.exports = passport;