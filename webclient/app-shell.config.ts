import type {HvAppShellConfig} from "@hitachivantara/app-shell-vite-plugin";

export default (): HvAppShellConfig => ({
    name: "uikit-app",

    baseUrl: "/pentaho-ba-webapp/",

    header: {
        actions: [
            { bundle: "@self/headerActions/ChangeLocale/index.js" },
            {
                bundle: "@hv/help-client/button.js",
                config: {
                    url: "https://www.hitachivantara.com/",
                    description: "Hitachi Vantara Help Link"
                }
            },
            {
                bundle: "@hv/theming-client/colorModeSwitcher.js"
            },
            {
                bundle: "@hv/app-switcher-client/toggle.js",
                config: {
                    title: "Apps",
                    apps: [
                        {
                            label: "App 1",
                            description: "Application 1",
                            url: "#",
                            target: "NEW"
                        },
                        {
                            label: "App 2",
                            description: "Application 2",
                            url: "#",
                            target: "SELF",
                            icon: {
                                iconType: "uikit",
                                name: "Warehouse"
                            }
                        }
                    ]
                }
            }
        ]
    },

    mainPanel: {
        maxWidth: "xl"
    },

    menu: [
        {
            label: "Welcome",
            target: "/welcome"
        },
        {
            label: "Browse Files",
            target: "/browsefiles"
        },
    ],

    providers: [
        {
            bundle: "@self/providers/Provider.js"
        },
    ],

});
