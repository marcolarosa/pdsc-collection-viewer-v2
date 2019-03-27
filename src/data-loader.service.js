"use strict";

import { flattenDeep, reduce, uniq, capitalize, orderBy } from "lodash";

export async function loadData() {
    try {
        let response = await fetch("repository/index.json");
        if (response.status !== 200) {
            throw new Error(response);
        }
        let rawData = await response.json();
        let renderList = flatten([...rawData]);
        let filters = extractFilters(rawData);
        return { rawData, renderList, filters };
    } catch (error) {
        console.log(error);
    }
}

function flatten(data) {
    let classifications;
    data = data.map(d => {
        let images = d.data.images.map(image => {
            return {
                itemId: d.itemId,
                collectionId: d.collectionId,
                title: d.data.title,
                type: "image",
                item: image,
                name: image.name,
                speakers: d.data.speakers.map(s => s.name),
                ...extractClassifications(d.data.classifications)
            };
        });
        images = orderBy(images, "name");
        let audio = d.data.media.filter(a => a.type === "audio");
        audio = audio.map(a => {
            return {
                itemId: d.itemId,
                collectionId: d.collectionId,
                title: d.data.title,
                type: "audio",
                item: a.files,
                name: a.name,
                speakers: d.data.speakers.map(s => s.name),
                ...extractClassifications(d.data.classifications)
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
                name: v.name,
                speakers: d.data.speakers.map(s => s.name),
                ...extractClassifications(d.data.classifications)
            };
        });
        return {
            collectionId: d.collectionId,
            itemId: d.itemId,
            images,
            audio,
            video
        };
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
                Object.keys(c).forEach(key => {
                    if (!filters.classifications[key]) {
                        filters.classifications[key] = [];
                    }
                    filters.classifications[key].push(c[key]);
                });
            });
        }
        filters.collectionId[d.collectionId] = 1;
        filters.itemId[d.itemId] = 1;
        filters.title[d.data.title] = 1;
    });
    let f = [
        {
            label: "Speakers",
            options: Object.keys(filters.speakers)
                .sort()
                .map(k => {
                    return {
                        label: k,
                        value: {
                            type: "speakers",
                            value: k,
                            label: `Speaker: ${k}`
                        }
                    };
                })
        },
        {
            label: "Titles",
            options: Object.keys(filters.title)
                .sort()
                .map(k => {
                    return {
                        label: k,
                        value: { type: "title", value: k, label: `Title: ${k}` }
                    };
                })
        },
        {
            label: "collections",
            options: Object.keys(filters.collectionId)
                .sort()
                .map(k => {
                    return {
                        label: k,
                        value: {
                            type: "collectionId",
                            value: k,
                            label: `Collection: ${k}`
                        }
                    };
                })
        },
        {
            label: "Items",
            options: Object.keys(filters.itemId)
                .sort()
                .map(k => {
                    return {
                        label: k,
                        value: {
                            type: "itemId",
                            value: k,
                            label: `Item: ${k}`
                        }
                    };
                })
        }
    ];

    Object.keys(filters.classifications)
        .sort()
        .forEach(c => {
            f.push({
                label: capitalize(c),
                options: uniq(filters.classifications[c]).map(
                    classification => {
                        return {
                            label: classification,
                            value: {
                                type: c,
                                value: classification,
                                label: `${capitalize(c)}: ${classification}`
                            }
                        };
                    }
                )
            });
        });
    return f;
}

function extractClassifications(classifications) {
    return reduce(classifications);
}
