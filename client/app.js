const app = Vue.createApp ({
    data() {
        return {
            errormessage: false,
            successmessage: false,
            tasks: [],
            currentTask: {}
        }
    },
    mounted() {
        this.getAllTasks();
    },
    methods: {
        getAllTasks(){
            axios.get("http://localhost/server/queries.php?action=read")
            .then((response)=>{
                if(response.data.error){
                    this.errorMessageEdit = response.data.message
                } else {
                    this.tasks = response.data.tasks
                }
            })
        },
        addTask(value){
            let myForm = new FormData();
            myForm.append('task_name', value.task_name)
            myForm.append('finish_date', value.finish_date)
            axios.post("http://localhost/server/queries.php?action=create", myForm)
            .then((response)=>{
                if(response.data.error){
                    this.errormessage = response.data.message
                } else{
                    this.successmessage = response.data.message
                    this.getAllTasks()
                }
            })
        },
        deleteTask(value){
            let myForm = new FormData();
            myForm.append('id', value.id)
            myForm.append('task_name', value.task_name)
            axios.post("http://localhost/server/queries.php?action=delete", myForm)
            .then((response)=>{
                if(response.data.error){
                    this.errormessage = response.data.message
                } else{
                    this.successmessage = response.data.message
                    this.getAllTasks()
                }
            })
        },
        updateTask(value){
            let myForm = new FormData();
            myForm.append('id', value.id)
            myForm.append('task_name', value.task_name)
            myForm.append('finish_date', value.finish_date)
            axios.post("http://localhost/server/queries.php?action=update", myForm)
            .then((response)=>{
                if(response.data.error){
                    this.errormessage = response.data.message
                } else{
                    this.successmessage = response.data.message
                    this.getAllTasks()
                }
            })
        },

        onEditClick(value){
            this.showeditmodal = value
        },
        onCloseEdit(value){
            this.showeditmodal = value
        },
        selectTask(value){
            this.currentTask = value
        }
    },

})