export default class DateFormatter {

  addTime(date: Date, value: number, type: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year') {
    const values = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }

    switch(type) {
      case 'second':
        values.seconds = values.seconds + value;
        break;
      case 'minute':
        values.minutes = values.minutes + value;
        break;
      case 'hour':
        values.hours = values.hours + value;
        break;
      case 'day':
        values.date = values.date + value;
        break;
      case 'month':
        values.month = values.month + value;
        break;
      case 'year':
        values.year = values.year + value;
        break;
    }

    return new Date(values.year, values.month, values.date, values.hours, values.minutes, values.seconds);
  }

}