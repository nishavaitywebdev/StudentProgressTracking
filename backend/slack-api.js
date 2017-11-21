var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || '';
var web = new WebClient(token);

const postMessageOnSlackGroup = (channelName, message) => {
    web.chat.postMessage(channelName, message, function(err, res) {
        if (err) {
            console.log('Error:', err);
            return err;
        } else {
            console.log('Message sent: ', res);
            return res;
        }
    });
};

module.exports = {postMessageOnSlackGroup,};