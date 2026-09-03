require('dotenv').config();

exports.verify = ({ "hub.mode": mode,
    "hub.verify_token": token,
    "hub.challenge": challenge }) => {

if (mode !== "subscribe") {
throw new Error("Invalid webhook mode");
}

if (token !== process.env.META_VERIFY_TOKEN) {
throw new Error("Invalid verify token");
}

return challenge;
};
