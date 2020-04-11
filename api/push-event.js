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
  const params = req.body;
  const twilioSignature = req.headers['x-twilio-signature'];
  const url = process.env.WEBHOOK_URL + 'api/push-event';

  const requestIsValid = twilio.validateRequest(
    process.env.TWILIO_ACCOUNT_AUTH,
    twilioSignature,
    url,
    params
  );

  if (!requestIsValid) {
    return res.status(401).send('Unauthorized');
  }

  channels.trigger('my-channel', 'my-event', params, () => {
    res.status(200).end(`sent event successfully {data: ${JSON.stringify(params)}`);
  });
};
