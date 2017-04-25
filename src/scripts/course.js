class Course {
    constructor(course) {
        this['photo']={
            path:''
        }
       
        for (let property in course) {
            this[property] = course[property];
        }

        this.getPhoto()

       
       
        this.hoursText=this.formatHours()
        this.weeksText=this.formatWeeks()

        this.period=Helper.periodFormat(this.begin_date,this.end_date)
        this.canJoin=Helper.inPeriod(this.open_date,this.close_date)

        this.canNetSignup=false
         if(this.net_signup && this.canSignup) this.canNetSignup=true


        this.class_times.sort( ( a, b) => {
            return a.weekday_id > b.weekday_id
        });
        this.schedules.sort( ( a, b) => {
            return a.order > b.order
        });
        
    }
   
   
    formatLocation(){
        return this.center.contactInfo.addressA.fullText + '&nbsp;(' + this.center.name + ')'
    }
    formatCost(){
        let tuition=Number(this.tuition)
        let cost=Number(this.cost)
        if(cost<=0) return Helper.formatMoney(this.tuition) + '元'

        let total=tuition+cost
        let materilaText='(含材料費' + Helper.formatMoney(this.cost) + '元)'
        return Helper.formatMoney(total.toString()) + '元&nbsp;' + materilaText


        
    }
    formatCostDetails(){
        let tuition=Number(this.tuition)
        let cost=Number(this.cost)
        if(cost<=0) return Helper.formatMoney(this.tuition) + '元'

        let total=tuition+cost
        let materilaText=' / 含材料費' + Helper.formatMoney(this.cost) + '元'
        if(this.materials){
            materilaText += '(' + this.materials  + ')'
        }
        return Helper.formatMoney(total.toString()) + '元&nbsp;' + materilaText
        
        
    }
    formatHours(){
        if(this.hours){
          return  this.hours + '小時'
        }else{
            return ''
        }
    }
    formatWeeks(){
        if(this.weeks){
          return  '(' + this.weeks + '週)'
        }else{
            return ''
        }
    }
  
    teachersText(){
        let teachers=this.teachers
        if (!teachers.length) return ''
        let html=''
        for (var i = 0; i < teachers.length; i++) {
            html += teachers[i].name + '&nbsp;'
        }
        return html
    }
    formatTarget(){
       
        if(!this.target) return '有興趣者皆可報名'
            return this.target
    }
    formatCategories(categories){  
      
        if (!categories.length) return ''
        let html=''
        for (var i = 0; i < categories.length; i++) {
            html += categories[i].name  + '&nbsp;'
           
        }
        return html
    }
    classTimesText(){
        let class_times=this.class_times     
        let html=''
        if(class_times.length){
            for (var i = 0; i < class_times.length; i++) {
                html += this.classTimeFullText(class_times[i])   + '&nbsp;'
            }
        }
        return html               
    }
    classTimeFullText(classTime) {
        let day = classTime.weekday.text
        let on = Helper.timeString(classTime.on)
        let off = Helper.timeString(classTime.off)
        return day + ' ' + on + ' - ' + off
    }
    getPhoto() {
        let path=this.photo.path
        this.photo={
             path:Helper.getBackUrl() + path
        } 
    }
    
    

    

    

}


export default Course;