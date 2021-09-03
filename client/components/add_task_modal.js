app.component('add-task', {
    props: {
        darkmode:{

        }
    },
    data(){
        return{
            showAddModal: false,
            newTask: {task_name: '', finish_date: ''}
            
        }
    },

    template:
    /*html*/
    `
    <div class='container'>
        <div class="row mt-3">
            <div class="col-lg-6">
                <h3 style='margin:0px;' class='text-info' :class="{'text-warning': darkmode}">Tarefas Ativas</h3>
            </div>
            <div class="col-lg-6">
                <button type='button' class="btn btn-info float-right" :class="{'btn-warning': darkmode}" @click='showAddModal = !showAddModal'>
                    <i class='fas fa-plus' style='font-size: 1.0rem;'></i> &nbsp;&nbsp;Adicionar Tarefa
                </button>
            </div>
        </div>
        <hr class='bg-info' :class="{'bg-warning': darkmode}">
    </div>
    
    <div id='overlay' v-if='showAddModal'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title'>Nova Tarefa</h5>
                    <button type='button' class='close' @click='showAddModal = !showAddModal'>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </div>
                <div class='modal-body p-4'>
                    <form action='#' method='post' id='add-task-form' v-on:submit.prevent="onSubmit">
                        <div class='form-group'>
                            <label for='task_name'>Tarefa</label>
                            <input type='text' name='task_name' class='form-control form-control-lg' placeholder='Ex: Lavar o carro' v-model='newTask.task_name'>
                        </div>
                        <div class='form-group'>
                            <label for='finish_date'>Data de término</label>
                            <input type='text' name='finish_date' class='form-control form-control-lg' placeholder='Ex: 20/09/2025' v-model='newTask.finish_date'>
                        </div>
                        <div class='form-group'>
                            <button type='submit'class='btn btn-success btn-block btn-lg'>Adicionar tarefa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        addtask(){
            console.log(this.newTask);
            this.$emit('addtaskevent', this.newTask )
        },
        onSubmit() {
            this.addtask()
            this.newTask = {task_name: '', finish_date: ''}
            this.showAddModal = !this.showAddModal
          }
    },
})