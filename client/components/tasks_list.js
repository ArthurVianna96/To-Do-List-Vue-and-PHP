app.component('tasks-list', {
    props:{
        showeditmodal:{
        },
        tasks:{
            type: Array
        }
    },
    data(){
        return {
            editClick:this.showeditmodal,
            currentTask: {},
        }
    },

    template:
    /*html*/
    `
    <div class='container'>
        <table class='table table-hover table-striped'>
            <thead class='text-center'>
                <th>ID</th>
                <th>Tarefa</th>
                <th>Data de Término</th>
                <th>Editar</th>
                <th>Excluir</th>
            </thead>
            <tbody class='text-center'>
                <tr v-for="(task, index) in tasks_array" :key='task.id'>
                    <td>{{ task.id }}</td>
                    <td>{{ task.task_name }}</td>
                    <td>{{ task.finish_date }}</td>
                    <td class='button-area'>
                        <a href='#' class='text-success' @click='editCombo(task)'>
                            <i class='fas fa-edit'></i>
                        </a>
                    </td>
                    <td>
                        <a href='#' class='text-danger' @click='deleteButton(task)'>
                            <i class='fas fa-trash-alt'></i>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`,
    methods: {
        editCombo(task){
            this.editTask(task)
            this.editButton()
        },
        editButton(){    
            this.editClick = true
            this.$emit('editclickevent', this.editClick)
        },
        editTask(task){
            this.selectTask(task)    
            this.$emit('edittaskevent', this.currentTask)
        },
        deleteButton(task){
            this.selectTask(task)
            this.$emit('deleteclickevent', this.currentTask)
        },
        selectTask(task){
            this.currentTask = task
        }
    },

    computed:{
        tasks_array(){
            return this.tasks
        }
    }
})