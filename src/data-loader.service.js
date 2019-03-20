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
        return { data, asList };
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
