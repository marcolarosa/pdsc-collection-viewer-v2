"use strict";

import { flattenDeep, reduce, uniq, capitalize, orderBy } from "lodash";

export async function loadData() {
    try {
        let response = await fetch("/repository/index.json");
        if (response.status !== 200) {
            throw new Error(response);
        }
        let items = await response.json();
        items = postprocess(items);
        let filters = extractFilters(items);
        return { items, filters };
    } catch (error) {
        console.log(error);
    }

    function postprocess(items) {
        let classifications;
        items = items.map(item => {
            let images = item.images.map(image => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: "image",
                    item: image,
                    name: image.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications)
                };
            });
            images = orderBy(images, "name");
            let audio = item.media.filter(a => a.type === "audio");
            audio = audio.map(a => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: "audio",
                    item: a.files,
                    name: a.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications)
                };
            });
            let video = item.media.filter(v => v.type === "video");
            video = video.map(v => {
                return {
                    itemId: item.itemId,
                    collectionId: item.collectionId,
                    title: item.title,
                    type: "video",
                    item: v.files,
                    name: v.name,
                    speakers: item.speakers.map(s => s.name),
                    ...extractClassifications(item.classifications)
                };
            });
            return {
                ...item,
                images,
                audio,
                video
            };
        });
        return items;
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
            if (d.speakers) {
                d.speakers.forEach(s => {
                    filters.speakers[s.name] = 1;
                });
            }
            if (d.classifications) {
                d.classifications.forEach(c => {
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
            filters.title[d.title] = 1;
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
                            value: {
                                type: "title",
                                value: k,
                                label: `Title: ${k}`
                            }
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
}

export function flattenItemList(items) {
    return flattenDeep(
        items.map(item => {
            let components = [];
            if (item.images.length) {
                components.push({
                    ...item.images[0],
                    images: item.images
                });
            }
            return [...components, ...item.audio, ...item.video];
        })
    );
}
