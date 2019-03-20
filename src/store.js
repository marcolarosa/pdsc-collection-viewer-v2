"use strict";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const configuration = {
    strict: process.env.NODE_ENV !== "production",
    state: {
        data: [],
        filters: [],
        list: []
    },
    mutations: {
        reset(state) {
            state.data = [];
            state.filters = [];
            state.list = [];
        },
        setData(state, data) {
            state.data = [...data];
        },
        setFilters(state, filters) {
            state.filters = [...filters];
        },
        setList(state, list) {
            state.list = [...list];
        }
    }
};
export const store = new Vuex.Store(configuration);
