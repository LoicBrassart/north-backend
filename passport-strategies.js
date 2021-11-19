const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const { db, jwtSecret } = require('./conf');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (formMail, formPassword, done) => {
      try {
        const [sqlRes] = await db.query(
          `SELECT id, email, pseudo, password, avatar FROM users WHERE email=?`,
          [formMail]
        );
        if (!sqlRes.length) return done(null, false, 'Wrong email!');
        const { id, email, pseudo, password, avatar } = sqlRes[0];
        const isPasswordOK = bcrypt.compareSync(formPassword, password);
        if (!isPasswordOK) return done(null, false, 'Wrong password!');

        const user = { id, email, pseudo, avatar };
        return done(null, user);
      } catch (e) {
        console.log(`??? - ${e}`);
        return done(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
