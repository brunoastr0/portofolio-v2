/** @type {import("next-seo").DefaultSeoProps} */
const seoConfig = {
    title: "Bruno Ângelo",
    titleTemplate: "%s | Bruno Ângelo",
    defaultTitle: "Bruno Ângelo — Computer Engineer in Cabo Verde",
    description: "Computer engineer in Cabo Verde building backend systems, full-stack web products, and reliable network infrastructure.",
    canonical: "https://www.brunoastro.cv/",
    robotsProps: {
        maxImagePreview: "large",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.brunoastro.cv/",
        siteName: "Bruno Ângelo",
        title: "Bruno Ângelo — Computer Engineer in Cabo Verde",
        description: "Backend systems, full-stack web products, network engineering, and production operations.",
        images: [
            {
                url: "https://www.brunoastro.cv/social/home-en.png",
                width: 1200,
                height: 630,
                alt: "Bruno Ângelo — Computer Engineer",
                type: "image/png",
            },
        ],
    },
    twitter: {
        cardType: "summary_large_image",
        site: "@brunoastr0",
        handle: "@brunoastr0",
    },
    additionalMetaTags: [
        {
            name: "author",
            content: "Bruno Ângelo",
        },
        {
            name: "theme-color",
            content: "#FAFAF9",
        },
        {
            name: "msapplication-navbutton-color",
            content: "#FAFAF9",
        },
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "#FAFAF9",
        },
    ],
};

export default seoConfig;
