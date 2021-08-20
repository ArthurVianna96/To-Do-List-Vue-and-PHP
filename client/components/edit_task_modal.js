app.component('edit-task', {
    props: {
        showeditmodal: {
            type:Boolean,
            required: true
        },
        task:{

        }
    },

    data(){
        return{
            updatedTask:{id: '', task_name: '', finish_date: ''}
        }
    },

    template:
    /*html*/
    `    
    <div id='overlay' v-if='showeditmodal'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title'>Editar Tarefa</h5>
                    <button type='button' class='close' @click='onCloseModal'>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <div class='modal-body p-4'>
                    <form action='#' method='post' v-on:submit.prevent="onSubmit">
                        <div class='form-group'>
                            <label for='task_name'>Tarefa</label>
                            <input type='text' name='task_name' class='form-control form-control-lg' :value='task.task_name' v-on:input="updatedTask.task_name = $event.target.value" >
                        </div>
                        <div class='form-group'>
                            <label for='finish_date'>Data de término</label>
                            <input type='text' name='finish_date' class='form-control form-control-lg' :value='task.finish_date' v-on:input='updatedTask.finish_date = $event.target.value'>
                        </div>
                        <div class='form-group'>
                            <button class='btn btn-success btn-block btn-lg' type='submit'>Atualizar tarefa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    `,

    methods: {
        onCloseModal(){
            let response = !this.showeditmodal
            this.$emit('closemodal', response)
        },
        updateTask(){

            this.updatedTask.id = this.task.id
            if (this.updatedTask.task_name ===''){
                this.updatedTask.task_name = this.task.task_name
            }
            if (this.updatedTask.finish_date ===''){
                this.updatedTask.finish_date = this.task.finish_date
            }
            this.$emit('updatetaskevent', this.updatedTask )
        },
        onSubmit() {
            this.updateTask()
            this.onCloseModal()
        },
        log(value){
            console.log(value);
        }
    },

    computed: {
        currentTaskChild(){
            return this.task
        }
        
    }
})