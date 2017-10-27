class Config {
    static siteUrl() {
        return 'http://localhost:8080'
            //return 'http://203.64.37.90'
    }
    static apiUrl() {
        return 'http://tsc-master'
            //return 'http://203.64.37.41:8088'
    }
    static apiClientSettings() {
        return {
            id: 2,
            secret: 'AxueOnlamX1XDyBlSsFJhlKSGjrqi0tDrEbcHfGX'
        }
    }


}


export default Config;