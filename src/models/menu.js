class Menu {
    constructor(data) {

        for (let property in data) {
            this[property] = data[property];
        }

        this.menuItems = [
            { id: '/centers', text: '開課中心', icon: 'university fa-fw' },
            { id: '/courses', text: '課程總覽', icon: 'book fa-fw' },
            { id: '/about', text: '關於我們', icon: 'info-circle fa-fw' },
            // { id: 'students', text: '學員專區', icon: 'user-o fa-fw' },
            // { id: 'teacher', text: '教師專區', icon: 'user-circle fa-fw' },
            // { id: 'wanted', text: '徵才訊息', icon: 'address-card-o' },
        ]

        this.visitorMenuItems = [
            { id: '/login', text: '登入', icon: 'sign-in fa-fw' },
            { id: '/register', text: '註冊', icon: 'user-plus fa-fw' }
        ]

        this.userMenuItems = [{
                id: '',
                text: '',
                icon: 'user-circle-o fa-fw',

            },
            { id: '/logout', text: '登出', icon: 'sign-out fa-fw' },
            { id: '/user/signups', text: '報名紀錄', icon: 'file-text-o fa-fw' },
            { id: '/user/profiles', text: '個人資訊', icon: 'id-card fa-fw' },
            { id: '/user/change-password', text: '變更密碼', icon: 'key fa-fw' }
        ]


    }



    getMenuItems() {

        return this.menuItems
    }

    getVisitorMenuItems() {

        return this.visitorMenuItems
    }
    getUserMenuItems(username) {

        this.userMenuItems[0].text = username
        return this.userMenuItems
    }

    static getIconClass(icon) {

        return 'fa fa-' + icon
    }





}


export default Menu;