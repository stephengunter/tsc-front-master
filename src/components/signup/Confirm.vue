<template>

    <div>
        confirm
    </div>

</template>

<script>
    export default {
        name:'SignupConfirm',
        props:['active','course'],
        data(){
            return{
                isAuth:false
            }
        },
        watch: {
          'active': 'init'
        },
        methods:{
           init(){
                if(this.active){
                    this.checkAuth()

                }
                    // this.isAuth=this.$auth.isAuthenticated()
                    // alert(this.isAuth)
            },
            checkAuth(){
                this.isAuth=this.$auth.isAuthenticated()
                if(!this.isAuth){
                    let returnUrl="signup/create?course=" + this.course.id
                    this.$router.push('/login?return=' + returnUrl)
                }
            },
            getCourseId(){
                if(this.course) return this.course.id
                    return 0
            },
            nextStep(){
                this.$emit('nextStep')
            },
            cancel(){
                this.$emit('cancel')
            }

        }
    }  
</script>


<style>
.info-description {
    font-size:17px;
}

    
</style>