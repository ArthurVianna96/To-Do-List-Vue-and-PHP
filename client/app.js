const app = Vue.createApp ({
    data() {
        return {
            errormessage: false,
            successmessage: false,
            showeditmodal:false,
            markedTasks: [],
            unMarkedTasks:[],
            currentTask: {},
            darkMode:false
        }
    },
    mounted() {
        this.getAllUnmarkedTasks()
        this.getAllMarkedTasks()
    },
    methods: {
        getAllUnmarkedTasks(){
            axios.get("http://localhost/server/queries.php?action=getunmarked")
            .then((response)=>{
                if(response.data.error){
                    this.errorMessageEdit = response.data.message
                } else {
                    this.unMarkedTasks = response.data.tasks
                }
            })
        },
        getAllMarkedTasks(){
            axios.get("http://localhost/server/queries.php?action=getmarked")
            .then((response)=>{
                if(response.data.error){
                    this.errorMessageEdit = response.data.message
                } else {
                    this.markedTasks = response.data.tasks
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
                    this.getAllUnmarkedTasks()
                    this.getAllMarkedTasks()
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
                    this.getAllUnmarkedTasks()
                    this.getAllMarkedTasks()
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
                    this.getAllUnmarkedTasks()
                    this.getAllMarkedTasks()
                }
            })
        },

        markTask(value){
            let myForm = new FormData();
            myForm.append('id', value.id)
            axios.post("http://localhost/server/queries.php?action=mark", myForm)
            .then((response)=>{
                if(response.data.error){
                    this.errormessage = response.data.message
                } else{
                    this.successmessage = response.data.message
                    this.getAllUnmarkedTasks()
                    this.getAllMarkedTasks()
                }
            })
        },

        unMarkTask(value){
            let myForm = new FormData();
            myForm.append('id', value.id)
            axios.post("http://localhost/server/queries.php?action=unmark", myForm)
            .then((response)=>{
                if(response.data.error){
                    this.errormessage = response.data.message
                } else{
                    this.successmessage = response.data.message
                    this.getAllUnmarkedTasks()
                    this.getAllMarkedTasks()
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
        },
        toggleDarkMode(value){
            this.darkMode = value
            console.log(this.darkMode);
        }
    },

})