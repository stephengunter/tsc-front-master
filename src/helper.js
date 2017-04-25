import Moment from 'moment'
import MomentTimeZone from 'moment-timezone'

class Helper {
    static getBackUrl(){
        return 'http://tsc-master'
    }
    static getUrl(url){
        return 'http://tsc-master' + url
    }
    static  buildURL(url,params,searchParams) {
        url= this.getUrl(url) + '?'
        if(searchParams){
            for (let field in this.searchParams) {

              let value=this.searchParams[field]
              url += field + '=' + value + '&'

            }
        }
        var p = params
        url += `column=${p.column}&direction=${p.direction}&per_page=${p.per_page}&page=${p.page}&search_column=${p.search_column}&search_operator=${p.search_operator}&search_query_1=${p.search_query_1}&search_query_2=${p.search_query_2}`
     
        return url

    }
    static getLoginFormData() {
        return {
            grant_type: 'password',
            client_id: 2,

            //client_secret: 'AzUbjsNJMkKvLBrI59d4hOVxdQDVxma35i2EvHjH',
            client_secret: '0rPgpOkrLpMV7eaaymyHkNMXlvTerCV83EXn7a6U',

            username: '',
            password: '',
            scope: ''
        }
    } 
    static getRefreshTokenFormData(refreshToken) {
        return {
            grant_type: 'refresh_token',
            client_id: 2,
            //client_secret: 'AzUbjsNJMkKvLBrI59d4hOVxdQDVxma35i2EvHjH',
            client_secret: '0rPgpOkrLpMV7eaaymyHkNMXlvTerCV83EXn7a6U',

            refresh_token: refreshToken,
            scope: ''
        }
    }   
    
    static tpeTime(datetime) {
        return MomentTimeZone.utc(datetime).tz("Asia/Taipei").format('YYYY-MM-DD HH:mm:ss')

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
   
   
    
}


export default Helper;