"use strict";

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const configuration = {
    strict: process.env.NODE_ENV !== "production",
    state: {
        items: [],
        filters: [],
        selectedFilter: undefined
    },
    mutations: {
        reset(state) {
            state = {
                items: [],
                filters: [],
                selectedFilter: []
            };
        },
        setItems(state, items) {
            state.items = [...items];
        },
        setFilters(state, filters) {
            state.filters = [...filters];
        },
        setSelectedFilter(state, selectedFilter) {
            state.selectedFilter = selectedFilter;
        }
    }
};
export const store = new Vuex.Store(configuration);
