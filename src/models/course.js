class Course {
    constructor(course) {
        this['photo'] = {
            path: ''
        }

        for (let property in course) {
            this[property] = course[property];
        }

        this.getPhoto()



        this.hoursText = this.formatHours()
        this.weeksText = this.formatWeeks()

        this.period = Helper.period(this.begin_date, this.end_date)
        this.canJoin = Helper.inPeriod(this.open_date, this.close_date)



        if (this.class_times) {
            this.class_times.sort((a, b) => {
                return a.weekday_id > b.weekday_id
            })
        }




        if (this.schedules) {
            this.schedules.sort((a, b) => {
                return a.order > b.order
            })
        }


    }
    static source() {
        return '/courses'
    }

    static showUrl(id) {
        return this.source() + '/' + id
    }
    static index(params) {
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl(this.source())
            url = Helper.buildQuery(url, params)
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }
    static show(id) {
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl(this.showUrl(id))

            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }
    static latest() {
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl('/latest-courses')
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }
    canNetSignup() {
        return true
        return (this.net_signup && this.canSignup)
    }
    hasCost() {
        if (!this.cost) return false
        return Number(this.cost) > 0
    }
    hasCreditCount() {
        if (!this.credit_count) return false
        return Number(this.credit_count) > 0
    }

    formatLocation() {
        return this.center.contactInfo.addressA.fullText + '&nbsp;(' + this.center.name + ')'
    }
    formatTuition() {
        let tuition = Number(this.tuition)
        return Helper.formatMoney(this.tuition) + ' 元'
    }
    formatCost() {
        let cost = Number(this.cost)
        if (cost > 0) {
            return Helper.formatMoney(this.cost) + ' 元'
        } else {
            return ''
        }

        // }
        // if(cost<=0) return Helper.formatMoney(this.tuition) + '元'

        // let total=tuition+cost
        // let materilaText='(含材料費' + Helper.formatMoney(this.cost) + '元)'
        // return Helper.formatMoney(total.toString()) + '元&nbsp;' + materilaText
        // }



    }
    formatCostDetails() {

        let formattedCost = this.formatCost()
        if (!formattedCost) return ''

        let materilaText = ''
        if (this.materials) {
            materilaText += '(' + this.materials + ')'
        }
        return formattedCost + ' ' + materilaText


    }
    formatHours() {
        if (this.hours) {
            return this.hours + ' 小時'
        } else {
            return ''
        }
    }
    formatWeeks() {
        if (this.weeks) {
            return '(' + this.weeks + '週)'
        } else {
            return ''
        }
    }

    teachersText() {
        let teachers = this.teachers
        if (!teachers.length) return ''
        let html = ''
        for (var i = 0; i < teachers.length; i++) {
            html += teachers[i].name + '&nbsp;'
        }
        return html
    }
    categoriesText(categories) {
        if (!categories.length) return ''
        let html = ''
        for (var i = 0; i < categories.length; i++) {
            html += categories[i].name + '&nbsp;'
        }
        return html
    }
    formatTarget() {

        if (!this.target) return '有興趣者皆可報名'
        return this.target
    }
    formatCategories(categories) {

        if (!categories.length) return ''
        let html = ''
        for (var i = 0; i < categories.length; i++) {
            html += categories[i].name + '&nbsp;'

        }
        return html
    }
    classTimesText() {
        let class_times = this.class_times
        let html = ''
        if (class_times.length) {
            for (var i = 0; i < class_times.length; i++) {
                html += this.classTimeFullText(class_times[i]) + '&nbsp;'
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
        let path = this.photo.path
        this.photo = {
            path: Config.apiUrl() + path
        }
    }

    hasClassTimes() {
        return false
        if (!this.class_times) return false
        return this.class_times.length > 0
    }












}


export default Course;