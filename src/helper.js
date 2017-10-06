import Moment from 'moment'
import MomentTimeZone from 'moment-timezone'

class Helper {
    static getHomeUrl(){
        return Config.siteUrl()
    }
    static getCurrentUrl(url){
        return this.getHomeUrl() + '/#' + url
    }
    static getApiUrl(url){
        return  Config.apiUrl() + '/api' + url
    }
    static onError(err,msg){
        Bus.$emit('errors',err,msg)
    }
    static backToHome(){
        
    }
    static buildQuery(url, searchParams) {
        url += '?'
        for (let field in searchParams) {

            let value = searchParams[field]
            url += field + '=' + value + '&'

        }
        return url.substr(0, url.length - 1);

    }
    static isTrue(val){
         if(typeof val=='number'){
             return val > 0
        }else if(typeof val=='string'){
            if(val.toLowerCase()=='true') return true
            if(val=='1') return true
                  return false
        }else if(typeof val=='boolean'){
              return val
        }
      
        return false
    }
    static inputsError(error){
        if(!error.response) return false
        if(!error.response.status) return false
            return (error.response.status==422)
    }
    static tpeTime(datetime) {
        return MomentTimeZone.utc(datetime).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')

    }
    static tpeDate(datetime){
          return MomentTimeZone.utc(datetime).tz("Asia/Taipei").format('YYYY-MM-DD')
    }
    static activeText(active){
         if(parseInt(active)) return '上架中'
         return '已下架'
    }
    static activeLabel(active){
         if(parseInt(active))  return 'label label-info'
        return 'label label-default'
    }

    static reviewedText(reviewed){
        if(parseInt(reviewed)) return  '已審核'
        return '未審核'
    }
    static reviewedLabel(reviewed){
         if(parseInt(reviewed)) return 'label label-success'
        return 'label label-danger'
    }
    
    static numberOptions(min,max){
        let options=[]
        for (var i = min ; i <= max ; i++) {
            let option={
                text:i,
                value:i
            }
            options.push(option)
        }
        return options
    }
    static getTimeobj(val){
        if(!val) return null
        val=String(val) 
        let hour=''
        let minute=''
        if(val.length>3){
            hour=val.substr(0,2)
            minute=val.substr(2,2)
        }else{
            hour=val.substr(0,1)
            minute=val.substr(1,2)
        }
      return  {HH: hour, mm: minute}
    }
    static defaultTimeObj(hour,minute){
       return  {HH: hour, mm: minute}
    }
    static getTimeSelected(val){
         let hour=parseInt(val.HH)
         let minute=parseInt(val.mm)
         return (hour * 100) + minute
    }
    static timeString(val){
        let timeObj=this.getTimeobj(val)
        if(!timeObj) return ''
        return timeObj.HH + ':' + timeObj.mm
    }
    static teachersText(teachers){
        if (!teachers.length) return ''
        let html=''
        for (var i = 0; i < teachers.length; i++) {
            html += teachers[i].name + '&nbsp;'
        }
        return html
    }
    static categoriesText(categories){       
        if (!categories.length) return ''
        let html=''
        for (var i = 0; i < categories.length; i++) {
            html += categories[i].name + '&nbsp;'
        }
        return html
    }
    static  classTimeFullText(classTime){
        let day =classTime.weekday.text
        let on=this.timeString(classTime.on)
        let off=this.timeString(classTime.off)
        return day + ' ' + on + ' - ' + off
    }
    
    static statusHtml(active){
        if(active && parseInt(active)>0 ){
            return '<span class="label label-success">上架中</span>'
        }else{
            return '<span class="label label-default">已下架</span>'
        }
                    
    }
    static formatMoney(money) {
        if (!money) return ''
        let pos = money.indexOf(".")
        if (pos < 0) return money

        let cents = parseInt(money.substring(pos + 1))
        if (cents > 0) return money

        return money.substring(0, pos)
    }
    
    static yearOptions()
    {
        let thisYear=Moment().year()
        let max=thisYear + 1
        let min=thisYear - 15
       
        return this.numberOptions(min,max)
    }
    static termYearOptions(){
        let thisYear=Moment().year() - 1911
        let max=thisYear + 1
        let min=thisYear - 15
         return this.numberOptions(min,max)
    }
    static termOrderOptions(){       
        let max =  5
        let min = 1
        return this.numberOptions(min,max)
    }

    static chineseDayofWeek(val,formated){
        let date= Moment(val)
        let day=""
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
        if(formated) return '(' + day + ')'
        return day
    }
    static inPeriod(begin_date,end_date)
    {
      return Moment().isBetween(begin_date, end_date)
    }
    static periodFormat(begin, end) {
        if (!begin || !end) return ''
        return begin + ' ~ ' + end
    }
    static getCourseDetailsUrl(course){
        let url='/courses/' + course
        return this.getCurrentUrl(url)
    }
    
}


export default Helper;