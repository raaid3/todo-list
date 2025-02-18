let events = {};

export const pubsub = {
  sub: function (eventName, fn) {
    if (events[eventName]) {
      events[eventName].push(fn);
    } else {
      events[eventName] = [fn];
    }
  },

  pub: function (eventName, data) {
    const fnList = events[eventName];
    for (let fn of fnList) {
      fn(data);
    }
  },
};
