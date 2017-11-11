import Moment from 'moment'
import MomentTimeZone from 'moment-timezone'

class Helper {
    static getHomeUrl() {
        return Config.siteUrl()
    }
    static getCurrentUrl(url) {
        return this.getHomeUrl() + '/#' + url
    }
    static getApiUrl(url) {
        return Config.apiUrl() + '/api' + url
    }
    static onError(err, msg) {
        Bus.$emit('errors', err, msg)
    }
    static tryParseInt(val) {
        if (!val) return 0
        return parseInt(val)
    }
    static buildQuery(url, searchParams) {
        url += '?'
        for (let field in searchParams) {

            let value = searchParams[field]
            url += field + '=' + value + '&'

        }
        return url.substr(0, url.length - 1);

    }
    static isTrue(val) {
        if (typeof val == 'number') {
            return val > 0
        } else if (typeof val == 'string') {
            if (val.toLowerCase() == 'true') return true
            if (val == '1') return true
            return false
        } else if (typeof val == 'boolean') {
            return val
        }

        return false
    }

    static inputsError(error) {
        if (!error.response) return false
        if (!error.response.status) return false
        return (error.response.status == 422)
    }
    static tpeTime(datetime) {
        return TimeService.tpeTime(datetime)
    }
    static tpeDate(datetime) {
        return TimeService.tpeDate(datetime)
    }
    static timeString(val) {

        return TimeService.timeString(val)
    }
    static period(begin, end) {
        return TimeService.period(begin, end)
    }

    static formatMoney(money) {
        if (!money) return ''
        let pos = money.indexOf(".")
        if (pos < 0) return money

        let cents = parseInt(money.substring(pos + 1))
        if (cents > 0) return money

        return money.substring(0, pos)
    }



    static chineseDayofWeek(val, formated) {
        return TimeService.chineseDayofWeek(val, formated)
    }
    static inPeriod(begin_date, end_date) {
        return TimeService.inPeriod(begin_date, end_date)
    }
    static numberOptions(min, max, desc) {

        return CommonService.numberOptions(min, max, desc)
    }

    static getCourseDetailsUrl(course) {
        let url = '/courses/' + course
        return this.getCurrentUrl(url)
    }

}


export default Helper;