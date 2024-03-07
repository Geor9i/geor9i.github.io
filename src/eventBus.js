import { util } from "../utils/util.js";

class EventBus {
  constructor(util) {
    this.eventId = 0;
    this.util = util;
    this.subscribers = {};
  }

  /**
   *
   * @param {Object} element element that will be subscribing to an event!
   * @param {string} eventType The type of event you a resubscribing to
   * @param {Object} activateOn Specifies the behaviour of activation default: { target: null}
   */

  subscribe(elementId, eventType, activateOn, callback) {
    const eventId = this.eventId++;
    if (!this.subscribers.hasOwnProperty(elementId)) {
      this.subscribers[elementId] = {};
    }
    if (!this.subscribers[elementId].hasOwnProperty(eventType)) {
      this.subscribers[elementId][eventType] = [
        this.buildSubscriberEventObject(activateOn, callback, eventId),
      ];
    } else {
      this.subscribers[elementId][eventType] = [
        ...this.subscribers[elementId][eventType],
        this.buildSubscriberEventObject(activateOn, callback, eventId),
      ];
    }
    this.subscribers[elementId].getSubscriberEvents = this.getSubscriberEvents;

    const unsubscribe = () => {
      const index = this.subscribers[elementId][eventType].findIndex(
        (el) => el.id === eventId
      );
      this.subscribers[elementId][eventType].splice(index, 1);
    };
    return unsubscribe.bind(this);
  }

  publish({ e }) {
    for (let subscriber in this.subscribers) {
      if (this.subscribers[subscriber].hasOwnProperty(e.type)) {
        const subscriberEventIds =
          this.subscribers[subscriber].getSubscriberEvents(e);
        if (subscriberEventIds && subscriberEventIds.length > 0) {
          this.subscribers[subscriber][e.type].forEach((record) => {
            if (subscriberEventIds.includes(record.id)) {
              record.callback();
            }
          });
        }
      }
    }
  }

  buildSubscriberEventObject(activateOn, callback, eventId) {
    return { activateOn, callback, id: eventId };
  }

  getSubscriberEvents(e) {
    const subscriberIds = [];
    if (this.hasOwnProperty(e.type)) {
      for (let recordName in this[e.type]) {
        const record = this[e.type][recordName];
        if (
          !record.activateOn.hasOwnProperty("target") ||
          record.activateOn.target === e.target
        ) {
          subscriberIds.push(record.id);
        }
      }
      return subscriberIds;
    }
    return null;
  }
}

export const eventBus = new EventBus(util);
