import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { User } from "@shared/schema";

const users = new Map<string, User>();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
    },
    (_accessToken, _refreshToken, profile, done) => {
      const googleId = profile.id;
      let user = Array.from(users.values()).find((u) => u.googleId === googleId);

      if (!user) {
        user = {
          id: `user-${Date.now()}`,
          googleId,
          email: profile.emails?.[0]?.value || "",
          displayName: profile.displayName || "",
          avatar: profile.photos?.[0]?.value,
          createdAt: new Date().toISOString(),
        };
        users.set(user.id, user);
      }

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser((id: string, done) => {
  const user = users.get(id);
  done(null, user);
});

export { users };
