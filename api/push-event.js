import Channels from 'pusher';
import twilio from 'twilio';

const {
  PUSHER_APP_ID: appId,
  PUSHER_KEY: key,
  PUSHER_SECRET: secret,
  PUSHER_CLUSTER: cluster,
} = process.env;

const channels = new Channels({
  appId,
  key,
  secret,
  cluster,
});

export default (req, res) => {
  const data = req.query;

  const twilioSignature = req.headers['x-twilio-signature'];
  const params = req.query;
  const url = 'https://billboard-pusher.now.sh/api/push-event';

  const requestIsValid = twilio.validateRequest(
    process.env.TWILIO_ACCOUNT_AUTH,
    twilioSignature,
    url,
    params
  );

  console.log('requestIsValid', requestIsValid);

  if (!requestIsValid) {
    return res.status(401).send('Unauthorized');
  }

  channels.trigger('my-channel', 'my-event', data, () => {
    res.status(200).end(`sent event successfully {data: ${JSON.stringify(data)}`);
  });
};
