function createEventEmitter() {
  const events = {};

  return {
    on(eventName, listener) {
      if (!events[eventName]) {
        events[eventName] = [];
      }

      events[eventName].push(listener);

      return () => {
        events[eventName] = events[eventName].filter(
          l => l !== listener
        );
      };
    },

    once(eventName, listener) {
      const onceWrapper = (...args) => {
        listener(...args);
        this.off(eventName, onceWrapper);
      };
      this.on(eventName, onceWrapper);
    },

    emit(eventName, data) {
      if (!events[eventName]) return;

      events[eventName].forEach(listener => {
        listener(data);
      });
    },

    off(eventName, listener) {
      if (!events[eventName]) return;

      if (!listener) {
        delete events[eventName];
      } else {
        events[eventName] = events[eventName].filter(
          l => l !== listener
        );
      }
    }
  };
}
