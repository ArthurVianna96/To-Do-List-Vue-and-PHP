app.component('header-vue',{
    data(){
        return{
            darkMode:false
        }
    },
    template:
    /*html*/
    `<header :class="{'dark-header-footer':darkMode}">
        <h1>CRUD Application</h1>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @click='toggleDarkMode'>
            <label class="form-check-label" for="flexSwitchCheckDefault">Modo escuro</label>
        </div>
    </header>`,
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
            this.$emit('toggle-dark-mode', this.darkMode)
        }
    },

})