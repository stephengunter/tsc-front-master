class Menus {
    
    constructor() {
        this.teacherMenus = [
           { id:1, name:'教師資料'  },
           { id:2, name:'課程管理'  }


        ]    

        
       
    } 
    
     getTeacherMenuItems(){
          return this.teacherMenus
     }

    

}


export default Menus;