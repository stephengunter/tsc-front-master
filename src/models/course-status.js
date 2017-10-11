class CourseStatus {
    constructor(data) {
       
        for (let property in data) {
            this[property] = data[property];
        }

        

    }
   
   
    static getSignupLabel(data){
        let label=''
        switch (Number(data.signup)) {
            case -1 :
                label = '<span class="tag is-light">未開始</span>'
            break
            case 0 :
                label = '<span class="tag is-danger">已停止</span>'
            break
            case 1 :
                label = '<span class="tag is-success">進行中</span>'
            break
            case 2 :
                label = '<span class="tag is-dark">已截止</span>'
            break

        }
        return label
    }
    static getRegisterLabel(data){       
      
        if(Number(data.register)){
             return '<span class="tag is-success">已完成</span>'
        }else{
            return '<span class="tag is-light">未完成</span>'
        }
        
    }
    
    static getClassLabel(data){
        let label=''
        switch (Number(data.class)) {
            case -1 :
                label = '<span class="tag is-light">尚未開課</span>'
            break
            case 0 :
                label = '<span class="tag is-danger">停止開課</span>'
            break
            case 1 :
                label = '<span class="tag is-success">進行中</span>'
            break
            case 2 :
                label = '<span class="tag is-dark">已結束</span>'
            break

        }
        return label
    }
    
    
   
    

}


export default CourseStatus;