app.component('footer-vue', {
    props:{
        darkmode:{}
    },
    template:
    /*html*/
    `<footer :class="{'dark-header-footer':darkmode}">
        Arthur Pedrosa Vianna {{ year }}
    </footer>`,
    computed: {
        year(){
            return new Date().getFullYear()
        }
    }

})
