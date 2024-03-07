export class EventBus {
  constructor() {
    this.eventId = 0;
    this.subscribers = {};
  }

  /**
   *
   * @param {String} subsriberId Subscriber Id as a string!
   * @param {string} eventType The type of event you a subscribing to eg. click, mousemove, mouseout, etc.
   * @param {Object} element element that will be subscribing to an event!
   * @param {Object} options Specifies the behaviour of the event => default:  {
      bubling: true,
      target: null,
      stopPropagation: false
    }
   */

  subscribe(subsriberId, eventType, callback, options) {
    const eventId = this.eventId++;
    if (!this.subscribers.hasOwnProperty(subsriberId)) {
      this.subscribers[subsriberId] = {};
    }
    if (!this.subscribers[subsriberId].hasOwnProperty(eventType)) {
      this.subscribers[subsriberId][eventType] = [
        this.buildSubscriptionEventObject(callback, eventId, options),
      ];
    } else {
      this.subscribers[subsriberId][eventType] = [
        ...this.subscribers[subsriberId][eventType],
        this.buildSubscriptionEventObject(callback, eventId, options),
      ];
    }
    this.subscribers[subsriberId].getSubscriberEvents = this._getSubscriberEvents;

    const unsubscribe = () => {
      const index = this.subscribers[subsriberId][eventType].findIndex(
        (el) => el.id === eventId
      );
      this.subscribers[subsriberId][eventType].splice(index, 1);
    };
    return unsubscribe.bind(this);
  }

  publish({ e, parents, children }) {
    for (let subscriber in this.subscribers) {
      if (this.subscribers[subscriber].hasOwnProperty(e.type)) {
        const subscriberEventIds =
          this.subscribers[subscriber].getSubscriberEvents({ e, parents, children });
        if (subscriberEventIds && subscriberEventIds.length > 0) {
          this.subscribers[subscriber][e.type].forEach((subscription) => {
            if (subscriberEventIds.includes(subscription.id)) {
              subscription.callback();
            }
          });
        }
      }
    }
  }

  buildSubscriptionEventObject(callback, id, options) {

    const defaultOptions = {
      bubling: true,
      target: null,
      stopPropagation: false
    }

    return {
      callback, id, options: {
        ...defaultOptions,
        ...options
      }
    };
  }

  _getSubscriberEvents({ e, parents, children }) {
    const subscriberIds = [];
    if (this.hasOwnProperty(e.type)) {
      for (let recordName in this[e.type]) {
        const record = this[e.type][recordName];
        const { bubling, target, stopPropagation } = record.options;
        if (!target || e.target === target || bubling && parents.includes(target) || !bubling && children.includes(target)) {
          subscriberIds.push(record.id);
        } 
      }
      return subscriberIds;
    }
    return null;
  }

}

export const eventBus = new EventBus();

