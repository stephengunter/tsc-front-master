class Config {
    static siteUrl(){
         //return 'http://tsc'//'http://localhost:8080' 
         return 'http://203.64.37.90' 
    }
    static apiUrl(){
        // return 'http://tsc-master'
        return 'http://203.64.37.41:8080' 
    }
    static apiClientSettings() {
        return {
            id:2,
            secret:'AzUbjsNJMkKvLBrI59d4hOVxdQDVxma35i2EvHjH'
        }
    }


}


export default Config;