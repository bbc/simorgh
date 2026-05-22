const OriginalDate = Date;

const Timemachine = {
  timestamp: 0,
  tick: false,
  tickStartDate: null,
  keepTime: false,
  difference: 0,

  config({ dateString, timestamp, difference, keepTime, tick } = {}) {
    this.timestamp = OriginalDate.parse(dateString) || timestamp || this.timestamp;
    
    if (difference !== undefined) this.difference = difference;
    if (keepTime !== undefined) this.keepTime = keepTime;
    
    if (tick !== undefined) {
      this.tick = tick;
      if (this.tick) {
        this.tickStartDate = new OriginalDate();
      }
    }
    
    this._apply();
  },

  reset() {
    this.timestamp = 0;
    this.tick = false;
    this.tickStartDate = null;
    this.keepTime = false;
    this.difference = 0;
    
    globalThis.Date = OriginalDate;
  },

  _apply() {
    const self = this;

    // We use a standard function instead of a class here so it can be 
    // called without 'new', mimicking native Date behavior.
    function MockDate(...args) {
      let date;

      if (self.keepTime) {
        date = new OriginalDate();
      } else if (args.length > 0) {
        // ✨ The spread operator replaces the massive 7-level ES5 if/else block
        date = new OriginalDate(...args);
      } else {
        date = new OriginalDate(self.timestamp);
      }

      if (args.length === 0) {
        const difference = self._getDifference();
        if (difference !== 0) {
          date = new OriginalDate(date.getTime() + difference);
        }
      }

      return date;
    }

    MockDate.prototype = OriginalDate.prototype;
    
    MockDate.now = () => {
      const timestamp = self.keepTime ? OriginalDate.now() : self.timestamp;
      return timestamp + self._getDifference();
    };
    
    MockDate.OriginalDate = OriginalDate;
    MockDate.UTC = OriginalDate.UTC;
    MockDate.parse = OriginalDate.parse; // Added for completeness

    // Safely override the global Date object in any environment
    globalThis.Date = MockDate;
  },

  _getDifference() {
    let difference = this.difference;

    if (this.tick && this.tickStartDate) {
      difference += OriginalDate.now() - this.tickStartDate.getTime();
    }

    return difference;
  },
};

// Initialize
Timemachine._apply();

// Export as a standard ES Module
export default Timemachine;