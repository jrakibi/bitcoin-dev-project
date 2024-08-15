"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorDetails = getAuthorDetails;
exports.getTopicData = getTopicData;
exports.classNames = classNames;
const generated_1 = require("@/.contentlayer/generated");
const generated_2 = require("contentlayer/generated");
const navigation_1 = require("next/navigation");
const contentlayer_1 = require("pliny/utils/contentlayer");
function getAuthorDetails(authorList) {
    return authorList.map((author) => {
        const authorResults = generated_2.allAuthors.find((p) => p.slug === author);
        return (0, contentlayer_1.coreContent)(authorResults);
    });
}
function getTopicData(slug) {
    const sortedCoreContents = (0, contentlayer_1.allCoreContent)((0, contentlayer_1.sortPosts)(generated_1.allTopics));
    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
        (0, navigation_1.notFound)();
    }
    const prev = sortedCoreContents[postIndex + 1];
    const next = sortedCoreContents[postIndex - 1];
    const post = generated_1.allTopics.find((p) => p.slug === slug);
    const authorList = post?.authors || ["default"];
    const authorDetails = getAuthorDetails(authorList);
    const mainContent = (0, contentlayer_1.coreContent)(post);
    const jsonLd = post.structuredData;
    jsonLd["author"] = authorDetails.map((author) => ({
        "@type": "Person",
        name: author.name
    }));
    return {
        prev,
        next,
        post,
        authorDetails,
        mainContent,
        jsonLd
    };
}
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
