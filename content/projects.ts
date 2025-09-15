import { Page } from "./types"

export const projects = {
    title: "Discover Open Source Projects",
    description:
        "It takes some work to go from curiosity to contribution. But that path is not often laid out clearly. Below are some stepping stones that will help you make your first open source contribution - whether in the form of comments, reviews, or writing your own PRs.",
    levels: [
        {
            title: "",
            description: "",
            items: [
                {
                    title: "Bitcoin Core",
                    subTitle: "",
                    description:
                        "The reference implementation of the bitcoin protocol",
                    image: "/images/projects/bitcoin-core-logo.webp",
                    link: "https://github.com/bitcoin/bitcoin",
                    github: "https://github.com/bitcoin/bitcoin",
                    repo: "bitcoin"
                },
                {
                    title: "Lightning Development Kit",
                    subTitle: "",
                    description:
                        "A complete lightning implementation packaged as an SDK",
                    image: "/images/projects/ldk.webp",
                    link: "https://github.com/lightningdevkit",
                    github: "https://github.com/lightningdevkit",
                    repo: "rust-lightning"
                },
                {
                    title: "Lightning Network Daemon",
                    subTitle: "",
                    description:
                        "A Golang implementation and the most widely run full node on the lightning network",
                    image: "/images/projects/lnd.webp",
                    link: "https://github.com/lightningnetwork/lnd",
                    github: "https://github.com/lightningnetwork/lnd",
                    repo: "lnd"
                },
                {
                    title: "Core Lightning",
                    subTitle: "",
                    description:
                        "A lightweight, highly customizable and standard compliant implementation of the lightning protocol implementation written in C",
                    image: "/images/projects/core-lightning.webp",
                    link: "https://github.com/ElementsProject/lightning",
                    github: "https://github.com/ElementsProject/lightning",
                    repo: "lightning"
                },
                {
                    title: "Eclair",
                    subTitle: "",
                    description:
                        "A scala implementation of the lightning network, focusing on the mobile use case",
                    image: "/images/projects/eclair-logo.webp",
                    link: "https://github.com/ACINQ/eclair",
                    github: "https://github.com/ACINQ/eclair",
                    repo: "eclair"
                },
                {
                    title: "Bitcoin Development Kit",
                    subTitle: "",
                    description: "Seamlessly build cross platform wallets",
                    image: "/images/projects/bdk.webp",
                    link: "https://bitcoindevkit.org",
                    github: "https://github.com/bitcoindevkit",
                    repo: "bdk"
                },
                {
                    title: "Libsecp256k1",
                    subTitle: "",
                    description:
                        "Optimized C library for elliptic curve operations on secp256k1",
                    image: "/images/projects/secp256k1.webp",
                    link: "https://github.com/bitcoin-core/secp256k1",
                    github: "https://github.com/bitcoin-core/secp256k1"
                },
                {
                    title: "Payjoin",
                    subTitle: "",
                    description:
                        "Scale Bitcoin, save fees, and preserve privacy all at once.",
                    image: "/images/projects/payjoin.webp",
                    link: "https://payjoin.org/",
                    github: "https://github.com/payjoin",
                    repo: "rust-payjoin"
                },
                {
                    title: "BTCPayserver",
                    subTitle: "",
                    description:
                        "Free, open-source and self-hosted, bitcoin payment processor",
                    image: "/images/projects/btc-pay.webp",
                    link: "https://github.com/btcpayserver",
                    github: "https://github.com/btcpayserver",
                    repo: "btcpayserver"
                },
                {
                    title: "Fedimint",
                    subTitle: "",
                    description:
                        "A modular protocol to custody and transact bitcoin in a community context",
                    image: "/images/projects/fedimint.webp",
                    link: "https://fedimint.org",
                    github: "https://github.com/fedimint",
                    repo: "fedimint"
                },
                {
                    title: "Stratum V2",
                    subTitle: "",
                    description:
                        "The next generation protocol for pooled mining",
                    image: "/images/projects/stratum-v2.webp",
                    link: "https://github.com/stratum-mining",
                    github: "https://github.com/stratum-mining",
                    repo: "stratum"
                },
                {
                    title: "Rust Bitcoin Library",
                    subTitle: "",
                    description:
                        "A series of projects to implement various bitcoin protocols in Rust",
                    image: "/images/projects/rust-btc-logo.webp",
                    link: "https://github.com/rust-bitcoin",
                    github: "https://github.com/rust-bitcoin",
                    repo: "rust-bitcoin"
                },
                {
                    title: "Polar",
                    subTitle: "",
                    description:
                        "One-click lightning networks for local app development and testing",
                    image: "/images/projects/polar.webp",
                    link: "https://lightningpolar.com",
                    github: "https://github.com/jamaljsr/polar",
                    repo: "polar"
                },
                {
                    title: "Warnet",
                    subTitle: "",
                    description:
                        "Monitor and analyze emergent behaviors of P2P networks",
                    image: "/images/projects/warnet1.webp",
                    link: "https://warnet.dev",
                    github: "https://github.com/bitcoin-dev-project/warnet",
                    repo: "warnet"
                },
                {
                    title: "SimLN",
                    subTitle: "",
                    description:
                        "Instantly simulate real-world lightning network activity",
                    image: "/images/projects/simln.webp",
                    link: "https://simln.dev",
                    github: "https://github.com/bitcoin-dev-project/sim-ln",
                    repo: "sim-ln"
                }
            ]
        }
    ]
} satisfies Page
