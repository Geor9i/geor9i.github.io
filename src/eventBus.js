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
   * @param {Object} activateOn Specifies the behaviour of activation default: { currentTarget: null}
   */

  subscribe(element, eventType, activateOn, callback) {
    const elementName = this.util.getVariableName(element);
    const eventId = this.eventId + 1;
    if (!this.subscribers.hasOwnProperty(elementName)) {
      this.subscribers[elementName] = {};
    } else {
         if (!this.subscribers[elementName].hasOwnProperty(eventType)) {
            this.subscribers[elementName][eventType] = [this.buildSubscriberEventObject(activateOn, callback, eventId)]
         } else {
            this.subscribers[elementName][eventType] = [...this.subscribers[elementName][eventType], this.buildSubscriberEventObject(activateOn, callback, eventId)];
         }
    }
    this.subscribers[elementName].getSubscriberEvents = this.getSubscriberEvents;

    const unsubscribe = () => {
        const index = this.subscribers[elementName][eventType].findIndex(element.id === eventId);
        this.subscribers[elementName][eventType].splice(index, 1);
    }
    return unsubscribe.bind(this);
  }

  publish({ e }) {
    for (let subscriber in this.subscribers) {
      if (this.subscribers[subscriber].hasOwnProperty(e.type)) {
        const subscriberEventIds = this.subscribers[subscriber].getSubscriberEvents(e);
        if (subscriberEventIds && subscriberEventIds.length > 0) {
            this.subscribers[subscriber][e.type].forEach(record => record.callback());
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
            if (record.activateOn.currentTarget === null || record.activateOn.currentTarget === e.currentTarget) {
                subscriberIds.push(record.id);
            }
        }
        return subscriberIds;
    }
    return null;
  }
}

export const eventBus = new EventBus(util);
