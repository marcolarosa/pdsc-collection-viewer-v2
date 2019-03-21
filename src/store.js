"use strict";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const configuration = {
    strict: process.env.NODE_ENV !== "production",
    state: {
        data: [],
        filters: [],
        list: [],
        selectedFilter: undefined
    },
    mutations: {
        reset(state) {
            state = {
                data: [],
                filters: [],
                list: [],
                selectedFilter: []
            };
        },
        setData(state, data) {
            state.data = [...data];
        },
        setFilters(state, filters) {
            state.filters = [...filters];
        },
        setList(state, list) {
            state.list = [...list];
        },
        setSelectedFilter(state, selectedFilter) {
            state.selectedFilter = selectedFilter;
        }
    }
};
export const store = new Vuex.Store(configuration);
