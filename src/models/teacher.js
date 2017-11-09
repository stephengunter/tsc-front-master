class Teacher {
    constructor(teacher) {
        this['photo'] = {
            path: ''
        }

        for (let property in teacher) {
            this[property] = teacher[property];
        }

        this.experiences = Teacher.getExperiences(teacher.experiences)

        this.getPhoto()

    }

    static source() {
        return '/teacher'
    }

    static storeUrl() {
        return this.source()
    }
    static editUrl(id) {
        return this.source() + '/' + id + '/edit'
    }
    static updateUrl(id) {
        return this.showUrl(id)
    }
    static edit(id) {
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl(this.editUrl(id))
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }
    static index() {

        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl(this.source())
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }

    static store(form) {
        let url = Helper.getApiUrl(this.storeUrl())

        let method = 'post'
        return new Promise((resolve, reject) => {
            form.submit(method, url)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }



    static getExperiences(experiences) {
        let array_experiences = experiences.split('<br>')
        return array_experiences.filter(item => {
            return item != ''
        })
    }

    getPhoto() {
        let path = this.photo.path
        this.photo = {
            path: Config.apiUrl() + path
        }
    }









}


export default Teacher;