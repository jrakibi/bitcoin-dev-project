/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
    title: "The Bitcoin Dev Project",
    author: "BDP",
    headerTitle: "BDP",
    description: "Find your way in bitcoin open source",
    language: "en-us",
    theme: "dark", // system, dark or light
    siteUrl: "https://bitcoindevs.xyz",
    siteRepo: "https://github.com/bitcoin-dev-project/bitcoin-dev-project",
    topicsRepo: "https://github.com/bitcoin-dev-project/bitcoin-topics",
    siteLogo: "/public/hero.jpg",
    socialBanner:
        "https://bitcoindevs.xyz/images/pages-thumbnails/social-banner.jpg",
    github: "https://github.com/bitcoin-dev-project/",
    x: "https://x.com/Bitcoin_Devs",
    locale: "en-US",
    twitter: {
        images: [
            "https://bitcoindevs.xyz/images/pages-thumbnails/social-banner.jpg"
        ],
        card: "summary_large_image",
        link: "https://x.com/Bitcoin_Devs"
    },
    search: {
        provider: "kbar", // kbar or algolia
        kbarConfig: {
            searchDocumentsPath: "search.json" // path to load documents to search
        }
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID provided by Algolia
        //   appId: 'R2IYF7ETH7',
        //   // Public API key: it is safe to commit it
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   indexName: 'docsearch',
        // },
    },
    keywords:
        "bitcoin, lightning, bitcoin development, bitcoin open source, bitcoin FOSS, bitcoin career, free open source software, open source, bitcoin development, bitcoin development community, bitcoin development resources, bitcoin development tools, bitcoin development guides, bitcoin development courses"
}

module.exports = siteMetadata
