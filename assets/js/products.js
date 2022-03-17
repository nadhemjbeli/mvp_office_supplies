import Vue from 'vue';

const template = '<h1>Hello {{ firstName }}! Is this cooler?</h1>';

const app = new Vue({
    el: '#app',
    data() {
        return {
            firstName: 'Ryan',
        };
    },
    render(h) {
        return Vue.compile(template).render.call(this, h);
    },
});

window.app = app;
