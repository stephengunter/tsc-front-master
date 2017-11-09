class Category {
    constructor(data) {

        for (let property in data) {
            this[property] = data[property];
        }



    }
    static title() {
        return 'Categories'
    }
    static source() {
        return '/categories'
    }

    static showUrl(id) {
        return this.source() + '/' + id
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

    static show(id) {
        return new Promise((resolve, reject) => {
            let url = this.showUrl(id)
            axios.get(url)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error);
                })

        })
    }




}


export default Category;