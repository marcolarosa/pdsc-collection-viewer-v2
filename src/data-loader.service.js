"use strict";

import { flattenDeep } from "lodash";

export async function loadData() {
    try {
        let response = await fetch("/repository/index.json");
        if (response.status !== 200) {
            throw new Error(response);
        }
        let data = await response.json();
        let asList = flatten([...data]);
        let filters = extractFilters(data);
        return { data, asList, filters };
    } catch (error) {
        console.log(error);
    }
}

function flatten(data) {
    data = data.map(d => {
        let images = d.data.images.map(image => {
            return {
                itemId: d.itemId,
                collectionId: d.collectionId,
                title: d.data.title,
                type: "image",
                item: image,
                name: image.split("/")[4]
            };
        });
        let audio = d.data.media.filter(a => a.type === "audio");
        audio = audio.map(a => {
            return {
                itemId: d.itemId,
                collectionId: d.collectionId,
                title: d.data.title,
                type: "audio",
                item: a.files,
                name: a.name
            };
        });
        let video = d.data.media.filter(v => v.type === "video");
        video = video.map(v => {
            return {
                itemId: d.itemId,
                collectionId: d.collectionId,
                title: d.data.title,
                type: "video",
                item: v.files,
                name: v.name
            };
        });
        return [...images, ...audio, ...video];
    });
    return flattenDeep(data);
}

function extractFilters(data) {
    let filters = {
        speakers: {},
        classifications: {},
        collectionId: {},
        itemId: {},
        title: {}
    };
    data.forEach(d => {
        if (d.data.speakers) {
            d.data.speakers.forEach(s => {
                filters.speakers[s.name] = 1;
            });
        }
        if (d.data.classifications) {
            d.data.classifications.forEach(c => {
                filters.classifications.genre = c.genre;
            });
        }
        filters.collectionId[d.collectionId] = 1;
        filters.itemId[d.itemId] = 1;
        filters.title[d.data.title] = 1;
    });
    return [
        {
            label: "Speakers",
            options: Object.keys(filters.speakers)
                .sort()
                .map(k => {
                    return { label: k, value: `Speaker: ${k}` };
                })
        },
        {
            label: "Classifications",
            options: Object.keys(filters.classifications)
                .sort()
                .map(k => {
                    return { label: k, value: `Classification: ${k}` };
                })
        },
        {
            label: "Titles",
            options: Object.keys(filters.title)
                .sort()
                .map(k => {
                    return { label: k, value: `Title: ${k}` };
                })
        },
        {
            label: "collections",
            options: Object.keys(filters.collectionId)
                .sort()
                .map(k => {
                    return { label: k, value: `Collection: ${k}` };
                })
        },
        {
            label: "Items",
            options: Object.keys(filters.itemId)
                .sort()
                .map(k => {
                    return { label: k, value: `Item: ${k}` };
                })
        }
    ];
}
