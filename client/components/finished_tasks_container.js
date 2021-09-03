app.component('finished-tasks-container', {
    props:{
        finishedtasks:{
            type: Array,   
        },
        darkmode:{

        }
    },
    data(){
        return {
            currentTask: {}
        }
    },
    template:
    /*html*/
    `
    <div class='container'>
        <div class="row mt-3">
            <div class="col-lg-6">
                <h3 style='margin:0px;' class='text-info' :class="{'text-warning': darkmode}">Tarefas Completas</h3>
            </div>
        </div>
        <hr class='bg-info' :class="{'bg-warning': darkmode}">
    </div>

    <div v-for='(task, index) in finishedtasks' :key='task.id' class='finished-task container row mt-2'>
        <div>
            <a href='#' class='text-success'>
                <i class='fas fa-check mr-2'></i>
            </a>
        </div>
        <div class='col-10 float-left'>
            <h4>{{task.task_name}} - {{task.finish_date}}</h4>
        </div>
        <div class='col-1 float-right'>
            <a href='#' class='text-danger' @click='unMark(task)'>
                <i class='fas fa-minus' ></i>
            </a>
        </div>
    </div>
    `,
    methods: {
        unMark(task){
            this.selectTask(task)
            this.$emit('unmark', this.currentTask)
        },
        selectTask(task){
            this.currentTask = task
        }
    },
})