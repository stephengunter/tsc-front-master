class TimeService {
    
    static todayString(){
        let now = Moment()
        return this.tpeDate(now)
    }
    static tpeTime(datetime) {
        return MomentTimeZone.utc(datetime).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')
    }
    static tpeDate(datetime){
          return MomentTimeZone.utc(datetime).tz("Asia/Taipei").format('YYYY-MM-DD')
    }
    static getTimeobj(val) {
        if (!val) return null
        val = String(val)
        let hour = ''
        let minute = ''
        if (val.length > 3) {
            hour = val.substr(0, 2)
            minute = val.substr(2, 2)
        } else {
            hour = val.substr(0, 1)
            minute = val.substr(1, 2)
        }
        return { HH: hour, mm: minute }
    }
    static timeString(val) {
        let timeObj = this.getTimeobj(val)
        if (!timeObj) return ''
        return timeObj.HH + ':' + timeObj.mm
    }
    static period(begin, end) {
        if (!begin || !end) return ''
        return begin + ' ~ ' + end
    }
     static inPeriod(begin_date,end_date)
    {
      return Moment().isBetween(begin_date, end_date)
    }
    
    static chineseDayofWeek(val, formated) {
        let date = Moment(val)
        let day = ""
        switch (date.day()) {
            case 0:
                day = "日";
                break;
            case 1:
                day = "一";
                break;
            case 2:
                day = "二";
                break;
            case 3:
                day = "三";
                break;
            case 4:
                day = "四";
                break;
            case 5:
                day = "五";
                break;
            case 6:
                day = "六";
        }
        if (formated) return '(' + day + ')'
        return day
    }
   
    
    


}


export default TimeService;