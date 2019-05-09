import moment, {duration} from 'moment';

import WallaFlightManager from '../resoucres/walla-flight.resource';
import GmailManager from '../managers/gmail.manager';

class FlightWatch {
  constructor () {
    this.WallaFlightManager = new WallaFlightManager();
    this.GmailManager = new GmailManager();
    this.checkFlight = this.checkFlight.bind(this);
    this.targetFlightId = 812;
  }

  checkFlight () {
    this.WallaFlightManager.getFlightsDetails()
      .then(({flights_mtk_outbound: {flights}}) => {
        if (!flights.filter(x => x.segments.filter(y => y.flightnumber == this.targetFlightId).length).length) {
          console.log('Didn\'t found the flight');

          return;
        }

        this.sendMail();
        clearInterval(this.mainIntervalId);
        console.log('Target flight is open!');
      });
  }

  sendMail () {
    this.GmailManager.send({
      to: 'Nirelko1@gmail.com',
      subject: 'flight alert!',
      text: 'your flight is open!'
    });
  }

  start () {
    console.log('started checking for flight');
    this.mainIntervalId = setInterval(this.checkFlight, duration(1, 'm').asMilliseconds());
  }
}

export default FlightWatch;