
/*
 * Module dependencies
 */

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , LDAPStrategy = require('passport-ldap').Strategy
  , config = require('./config.json');

/*
 * Auth strategy
 */

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

if(config.auth.twitter.consumerkey.length) {
  passport.use(new TwitterStrategy({
      consumerKey: config.auth.twitter.consumerkey,
      consumerSecret: config.auth.twitter.consumersecret,
      callbackURL: config.auth.twitter.callback
    },
    function(token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  ));
}

if(config.auth.facebook.clientid.length) {
  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.clientid,
      clientSecret: config.auth.facebook.clientsecret,
      callbackURL: config.auth.facebook.callback
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
}

if(config.auth.ldap.server.url.length) {
  passport.use(new LDAPStrategy(config.auth.ldap,
    function(profile, done) {
      return done(null, profile);
    }
  ));
}
