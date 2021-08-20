app.component('footer-vue', {
    template:
    /*html*/
    `<footer>
        Arthur Pedrosa Vianna {{ year }}
    </footer>`,
    computed: {
        year(){
            return new Date().getFullYear()
        }
    }

})
