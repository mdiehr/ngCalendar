(function() {
  var app = angular.module('calendarApp', []);

  // Month name data
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  app.controller('CalendarController', function() {

    // Month storage
    this.months = [];

    var now = new Date();
    var todayYear = now.getFullYear(); // Current year (2015)
    var todayMonth = now.getMonth(); // Month of year, 0-11
    var todayDate = now.getDate(); // Date of month, 1-31


    for (var month = 0; month < 12; ++month) {
      var dates = createCalendar(todayYear, month, todayMonth, todayDate);
      this.months.push({name: monthNames[month], dates:dates });
    }

    this.month = todayMonth;
    this.currentMonth = this.months[this.month];
    this.numMonths = 12;
    
    this.canLeft = function() {
      return this.month > 0;
    }

    this.canRight = function() {
      return this.month < this.numMonths - 1;
    }

    this.prevMonth = function() {
      if (this.canLeft())
        this.month -= 1;
      this.currentMonth = this.months[this.month];
    }

    this.nextMonth = function() {
      if (this.canRight())
        this.month += 1;
      this.currentMonth = this.months[this.month];
    }

  });

  function createCalendar(year, month, todayMonth, todayDate) {
    var dates = [];
    var firstDay = new Date(year, month, 1).getDay();
    var lastDate = new Date(year, month+1, 0).getDate();

    var week = [];
    var cell = 0;
    var date = 1;

    var empty = {date:0, class:"invis"};

    // Pad out beginning of week with zeroes
    for (cell; cell < firstDay; ++cell) {
      week.push(empty);
    }

    while (date <= lastDate) {
      // Write out week
      for (cell; cell < 7; ++cell) {
        if (date > lastDate) {
          // Pad end of last week with zeroes
          week.push(empty);
        } else {
          var today = (date === todayDate && month === todayMonth);
          var weekend = cell === 0 || cell === 6;
          week.push({
            date: date++,
            class: today?"today":(weekend?"weekend":"")
          });
        }
      }
      // Save week
      dates.push(week);
      // reset
      cell = 0;
      week = [];
    }
    return dates;
  }



})();
