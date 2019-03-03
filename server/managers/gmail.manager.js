import GmailSendFactory from 'gmail-send';

class GmailManager {
  constructor () {
    const credentialsStrings = process.env.GMAIL_CREDENTIALS.split(':');

    if (!credentialsStrings || !credentialsStrings.length || credentialsStrings.length !== 2) {
      throw new Error('The environment variable GMAIL_CREDENTIALS must be in structure < email >:< pass >');
    }

    this.sender = GmailSendFactory({
      user: credentialsStrings[0],
      pass: credentialsStrings[1]
    });
  }

  send (mailDetails) {
    return this.sender(mailDetails);
  }
}

export default GmailManager;