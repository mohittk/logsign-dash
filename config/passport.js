const JwtStrategy = require("passport-jwt").Strategy;
const ExtratctJwt = require("extratct-jwt").ExtratctJwt;
const mongoose = require("mongoose");
const User = mongoose.model("prac2");
const keys = require("../config/key");

const options = {};
options.jwtFromRequest = ExtracteJwt.fromAuthHeaderAsBearerToken();
options.secretKey = keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done)=>{
            User.findById(jwt_payload.id).then(user=>{
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        })
    )

   
}
