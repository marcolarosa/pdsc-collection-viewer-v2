"use strict";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const ShellComponent = () =>
    import(/* webpackChunkName: "group-shell" */ "components/Shell.component.vue");

import BadRequestComponent from "components/BadRequest.component.vue";

export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "*", name: "404", component: BadRequestComponent },
        {
            path: "/",
            name: "shell",
            component: ShellComponent,
            children: []
        }
    ]
});
