const seoConfig = {
    // The default title for your site.
    title: "Bruno Ângelo",
    // A template for the title, allowing you to add a suffix or prefix.
    titleTemplate: "%s | Bruno Ângelo",
    // The default title for pages that don't specify their own title.
    defaultTitle: "Bruno Ângelo",
    // The default description for your site.
    description: "This is the default description of my website.",
    // Open Graph settings for better social media integration.
    openGraph: {
        // The type of content (e.g., website, article).
        type: "website",
        // The locale of your content.
        locale: "pt_CV",
        // The canonical URL of your site.
        url: "https://www.brunoastro.cv/",
        // The name of your site.
        site_name: "Bruno Ângelo",
        // The default title for Open Graph.
        title: "Bruno Ângelo",
        // The default description for Open Graph.
        description: "Welcome to the official website of Bruno Ângelo, where innovation meets creativity. Explore a world of ideas, projects, and insights that showcase expertise in technology, management, and beyond. Designed to inspire and inform, this platform highlights my journey, achievements, and commitment to delivering impactful solutions.",
        // Images that will be used when your content is shared.
        images: [
            {
                url: "https://www.brunoastro.cv/portfolio_cover.png",
                width: 487,
                height: 183,
                alt: "Portfolio Cover Image",
            },
        ],
    },
    // Twitter settings for Twitter cards.
    twitter: {
        // The card type, which determines how your content is displayed.
        cardType: "summary_large_image",
        // The Twitter handle of your site.
        site: "@brunoastr0",
        // The Twitter handle of the content creator.
        creator: "@brunoastr0",
    },
    // Additional meta tags to include in the head of your document.
    additionalMetaTags: [
        {
            name: "theme-color",
            content: "#000000",
        },
        {
            name: "msapplication-navbutton-color",
            content: "#000000",
        },
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000000",
        },
    ],
};

export default seoConfig;
