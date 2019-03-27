"use strict";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import ShellComponent from "components/Shell.component.vue";
import BadRequestComponent from "components/BadRequest.component.vue";
import ViewImageComponent from "components/ViewImage.component.vue";
import RenderListComponent from "components/RenderList.component.vue";
import RenderImageSetComponent from "components/RenderImageSet.component.vue";

export const router = new VueRouter({
    mode: "history",
    base: process.env.NODE_ENV === "development" ? "/" : "/mobile-viewer",
    routes: [
        { path: "*", name: "404", component: BadRequestComponent },
        {
            path: "/",
            component: ShellComponent,
            children: [
                {
                    path: "",
                    name: "viewList",
                    component: RenderListComponent
                },
                {
                    path: "images/:collectionId/:itemId",
                    name: "images",
                    component: RenderImageSetComponent
                },
                {
                    path: "image/:collectionId/:itemId/:image",
                    name: "image",
                    component: ViewImageComponent
                }
            ]
        }
    ]
});
