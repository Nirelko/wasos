import moment from 'moment';

const TOKEN_LIFE_SPAN = moment.duration(5, 'days').asMilliseconds();

class TokenManager {
  add (name, data) {
    localStorage.setItem(name, JSON.stringify({
      data,
      creationDate: moment.now()
    }));
  }

  get (name) {
    let item = localStorage.getItem(name);

    if (!item) {
      return;
    }
    item = JSON.parse(item);

    if (moment.now() - item.creationDate > TOKEN_LIFE_SPAN) {
      this.remove(name);

      return;
    }

    return item.data;
  }

  replaceData (name, data) {
    const item = localStorage.getItem(name);

    if (!item) {
      throw new Error(`Couldn't find the given local storage item ${name}`);
    }

    this.remove(name);
    localStorage.setItem(name, JSON.stringify({...JSON.parse(item), data}));
  }

  remove (name) {
    localStorage.removeItem(name);
  }
}

export default new TokenManager();