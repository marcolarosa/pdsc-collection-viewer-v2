"use strict";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import ShellComponent from "components/Shell.component.vue";
import BadRequestComponent from "components/BadRequest.component.vue";
import ViewImageComponent from "components/ViewImage.component.vue";

export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "*", name: "404", component: BadRequestComponent },
        {
            path: "/",
            name: "shell",
            component: ShellComponent
        },
        {
            path: "/view-image",
            name: "viewImage",
            component: ViewImageComponent
        }
    ]
});
