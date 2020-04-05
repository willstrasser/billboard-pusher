const Channels = require('pusher');

const {
  PUSHER_APP_ID: appId,
  PUSHER_KEY: key,
  PUSHER_SECRET: secret,
  PUSHER_CLUSTER: cluster,
} = process.env;

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
});

export default (req, res) => {
  const data = req.query;
  channels.trigger('my-channel', 'my-event', data, () => {
    res.status(200).end(`sent event successfully {data: ${JSON.stringify(data)}`);
  });
};
