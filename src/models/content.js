class Content {
    constructor(data) {

        for (let property in data) {
            this[property] = data[property];
        }

    }

    static index(key_name) {
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl('/contents')
            url += '?key=' + key_name
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


export default Content