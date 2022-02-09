define(["jquery"], ($) => {
    const BASE_URL = "http://localhost:8080"; // TODO get from config

    /**
     * Handles the provided error according to the default strategy,
     * optionally re-throwing the error to the upper callstack layers.
     *
     * @param {Error} error The error object that is going to be handled.
     * @param {Boolean} rethrow If the error should be re-thrown after handling.
     */
    function handleError(error, rethrow = true) {
        alert(error);
        if (rethrow) throw error;
    }

    function getButton(elementId = "platforme-button") {
        return document.getElementById(elementId);
    }

    function setupButton(product, store, options) {
        const button = getButton();
        button.onclick = async function() {
            try {
                await redirectToCustomization(product, store, options);
            } catch (err) {
                handleError(err);
            }
        };
    }

    /**
     * Gathers the content language defined using a series of approaches
     * which should include extra HTTP request for content language header
     * inference.
     *
     * This method should allow consumers to obtain a good approximation on the
     * locale that best "describes" the current page.
     *
     * @param {Boolean} normalized If the locale string should be normalized,
     * meaning that the '_' character is used instead of '-'.
     * @returns {String} The final locale string representing the best possible
     * locale for the current page environment.
     */
    async function getContentLanguage(normalized = false) {
        let contentLanguage = window.navigator.languages[0];
        if (normalized) contentLanguage = contentLanguage.replace(/-/g, "_");
        return contentLanguage;
    }

    const ICON_1_SVG =
        '<svg width="35" height="35" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6575 18.5825C16.1572 20.0828 14.1224 20.9257 12.0007 20.9257L12.0007 15.8585C12.7786 15.8585 13.5245 15.5495 14.0745 14.9995L17.6575 18.5825Z" fill="#83C5AF"/><path d="M17.6575 7.26882C16.1572 5.76852 14.1224 4.92566 12.0007 4.92566L12.0007 9.99286C12.7786 9.99286 13.5245 10.3019 14.0745 10.8519L17.6575 7.26882Z" fill="#DE816D"/><path d="M6.34395 18.5825C7.84422 20.0828 9.87903 20.9257 12.0007 20.9257L12.0007 15.8585C11.2229 15.8585 10.4769 15.5495 9.92693 14.9995L6.34395 18.5825Z" fill="#7BA0DD"/><path d="M6.34395 7.26882C7.84422 5.76852 9.87903 4.92566 12.0007 4.92566L12.0007 9.99286C11.2229 9.99286 10.4769 10.3019 9.92693 10.8519L6.34395 7.26882Z" fill="#D27479"/><path d="M6.34329 18.5826C4.84302 17.0823 4.00017 15.0475 4.00017 12.9257L9.06727 12.9257C9.06727 13.7036 9.37626 14.4495 9.92627 14.9996L6.34329 18.5826Z" fill="#A696DD"/><path d="M17.6571 18.5826C19.1574 17.0823 20.0002 15.0475 20.0002 12.9257L14.9331 12.9257C14.9331 13.7036 14.6242 14.4495 14.0741 14.9996L17.6571 18.5826Z" fill="#ACCA81"/><path d="M6.34329 7.26882C4.84302 8.76912 4.00017 10.804 4.00017 12.9257L9.06727 12.9257C9.06727 12.1479 9.37626 11.4019 9.92627 10.8519L6.34329 7.26882Z" fill="#D291BA"/><path d="M17.6571 7.26882C19.1574 8.76912 20.0002 10.804 20.0002 12.9257L14.9331 12.9257C14.9331 12.1479 14.6242 11.4019 14.0741 10.8519L17.6571 7.26882Z" fill="#F0C97A"/></svg>';
    const ICON_2_SVG =
        '<svg width="35" height="35" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6912 14.3853L10.8654 20.4999L18.861 17.4133L13.1784 14.348C12.1361 14.9366 11.1052 14.6143 10.6912 14.3853Z" fill="#DF6449"/><path d="M9.45416 12.3027L4 15.565L5.14509 7.56763L10.6906 10.4092C9.69003 10.9248 9.4494 11.8864 9.45416 12.3027Z" fill="#367EB0"/><path d="M13.2522 10.5158L13.1494 4.51837L20 9.43986L14.3373 12.6676C14.5566 11.5938 13.7053 10.7856 13.2522 10.5158Z" fill="#F5C54B"/><path d="M9.45132 12.303L4 15.5627L10.8647 20.4949L10.6906 14.3883C9.62295 13.8407 9.44567 12.752 9.45132 12.303Z" fill="#3C4049"/><path d="M10.6872 10.4122L5.14453 7.56532L13.1519 4.5L13.2515 10.4921C12.2725 9.94177 11.0715 10.2002 10.6872 10.4122Z" fill="#4296CA"/><path d="M14.3458 12.6438L20 9.41852L18.8691 17.4161L13.1836 14.3482C13.9719 13.9033 14.2889 13.1443 14.3458 12.6438Z" fill="#EB9D3F"/></svg>';
    const ICON_3_SVG =
        '<svg width="35" height="35" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7956 14.28C19.3734 16.1128 18.3189 17.7383 16.8173 18.8708L15.2317 16.7687C16.239 16.0089 16.9464 14.9184 17.2297 13.6889L19.7956 14.28Z" fill="#EDE45B"/><path d="M19.1265 8.84869C19.9812 10.5241 20.2184 12.447 19.7963 14.2798L17.2303 13.6889C17.5135 12.4593 17.3544 11.1693 16.781 10.0453L19.1265 8.84869Z" fill="#DAA654"/><path d="M15.1182 5.11694C16.8503 5.84991 18.2688 7.16972 19.1245 8.84458L16.7797 10.0426C16.2056 8.91899 15.254 8.03359 14.092 7.54187L15.1182 5.11694Z" fill="#BB3D4D"/><path d="M9.65259 4.83682C11.4506 4.28481 13.3855 4.38393 15.1177 5.11677L14.0917 7.54177C12.9297 7.05014 11.6316 6.98364 10.4254 7.35397L9.65259 4.83682Z" fill="#983D78"/><path d="M5.29517 8.12268C6.32081 6.54614 7.86913 5.38138 9.6682 4.83295L10.436 7.35163C9.22907 7.71955 8.19037 8.50094 7.50231 9.55858L5.29517 8.12268Z" fill="#70528D"/><path d="M4.05892 13.4535C3.8311 11.5866 4.26835 9.69905 5.29389 8.12244L7.50113 9.55818C6.81314 10.6159 6.51981 11.8821 6.67264 13.1346L4.05892 13.4535Z" fill="#263477"/><path d="M6.54412 18.334C5.16879 17.0511 4.28946 15.3246 4.06055 13.4578L6.67408 13.1373C6.82765 14.3897 7.41756 15.5479 8.34021 16.4086L6.54412 18.334Z" fill="#5C8DB4"/><path d="M11.5803 20.4732C9.70205 20.3746 7.91863 19.6174 6.54321 18.3346L8.33917 16.409C9.26188 17.2696 10.4583 17.7776 11.7183 17.8437L11.5803 20.4732Z" fill="#80BCBD"/><path d="M16.8198 18.8698C15.3186 20.0029 13.4662 20.5708 11.5879 20.4739L11.7236 17.8443C12.9837 17.9093 14.2264 17.5283 15.2335 16.7681L16.8198 18.8698Z" fill="#BCCB5B"/></svg>';
    const ICON_4_SVG =
        '<svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6786 12.4879C16.6776 13.7285 16.1839 14.918 15.3059 15.7946L13.3228 13.8084C13.6739 13.4578 13.8714 12.982 13.8718 12.4857L16.6786 12.4879Z" fill="#CF4A55"/><path d="M15.3091 15.7905C14.4321 16.6681 13.2424 17.1614 12.0018 17.1618L12.0007 14.3551C12.497 14.3549 12.9729 14.1576 13.3236 13.8065L15.3091 15.7905Z" fill="#4290EA"/><path d="M12.0046 7.80676C13.2453 7.80772 14.4347 8.30149 15.3113 9.17945L13.3251 11.1626C12.9745 10.8114 12.4987 10.6139 12.0024 10.6135L12.0046 7.80676Z" fill="#ECC040"/><path d="M15.3067 9.17511C16.1843 10.0521 16.6776 11.2417 16.678 12.4824L13.8713 12.4834C13.8711 11.9872 13.6738 11.5113 13.3228 11.1605L15.3067 9.17511Z" fill="#F27280"/><path d="M7.323 12.4806C7.32396 11.2399 7.81773 10.0504 8.69569 9.17383L10.6788 11.16C10.3276 11.5107 10.1301 11.9865 10.1298 12.4827L7.323 12.4806Z" fill="#9DC540"/><path d="M8.69189 9.17811C9.56885 8.30051 10.7585 7.80722 11.9992 7.80676L12.0002 10.6135C11.5039 10.6137 11.0281 10.811 10.6773 11.1621L8.69189 9.17811Z" fill="#F5DE54"/><path d="M11.9969 17.1616C10.7563 17.1606 9.56679 16.6668 8.69019 15.7889L10.6764 13.8057C11.027 14.1569 11.5028 14.3544 11.9991 14.3548L11.9969 17.1616Z" fill="#6FB7F0"/><path d="M8.69533 15.7932C7.81772 14.9162 7.32443 13.7266 7.32397 12.4859L10.1307 12.4849C10.1309 12.9811 10.3282 13.457 10.6793 13.8078L8.69533 15.7932Z" fill="#7BB431"/><path d="M20.0007 12.4904C19.9991 14.6123 19.1546 16.6466 17.653 18.1459L15.2788 15.768C16.1497 14.8984 16.6395 13.7185 16.6405 12.4878L20.0007 12.4904Z" fill="#EB6F80"/><path d="M17.6594 18.1386C16.1595 19.6396 14.1248 20.4832 12.0029 20.484L12.0017 17.1238C13.2324 17.1233 14.4125 16.634 15.2824 15.7634L17.6594 18.1386Z" fill="#6FB7EC"/><path d="M12.0067 4.4845C14.1286 4.48614 16.163 5.33063 17.6622 6.83219L15.2843 9.20642C14.4148 8.33551 13.2348 7.8457 12.0042 7.84475L12.0067 4.4845Z" fill="#FADB5C"/><path d="M17.654 6.82501C19.155 8.32486 19.9986 10.3595 19.9994 12.4814L16.6391 12.4827C16.6387 11.252 16.1494 10.0719 15.2788 9.20195L17.654 6.82501Z" fill="#F09394"/><path d="M4 12.478C4.00164 10.3561 4.84613 8.32175 6.3477 6.82251L8.72192 9.20041C7.85101 10.07 7.36121 11.2499 7.36026 12.4806L4 12.478Z" fill="#C4D96E"/><path d="M6.34082 6.83033C7.84067 5.32938 9.87535 4.48571 11.9972 4.48492L11.9985 7.84518C10.7678 7.84563 9.58767 8.33496 8.71776 9.20552L6.34082 6.83033Z" fill="#FDF27F"/><path d="M11.9939 20.4845C9.87196 20.4829 7.83762 19.6384 6.33838 18.1368L8.71627 15.7626C9.58584 16.6335 10.7658 17.1233 11.9964 17.1242L11.9939 20.4845Z" fill="#93DFEE"/><path d="M6.34614 18.1434C4.84518 16.6435 4.00152 14.6089 4.00073 12.487L7.36099 12.4857C7.36144 13.7164 7.85077 14.8965 8.72133 15.7664L6.34614 18.1434Z" fill="#9FCA4A"/></svg>';

    const ICONS = {
        icon_1: ICON_1_SVG,
        icon_2: ICON_2_SVG,
        icon_3: ICON_3_SVG,
        icon_4: ICON_4_SVG
    };

    function generateButtonComponent(store) {
        let style =
            "max-height: 45px; padding: 10px 16px 10px 16px; box-sizing: border-box; border-radius: 4px 4px 4px 4px; cursor: pointer; display: inline-flex; align-items: center; transition: opacity 0.05s ease-in-out; user-select: none;";
        if (store.button_background_color) {
            style += ` background-color: ${store.button_background_color};`;
        }
        if (store.button_css) style += store.button_css;
        if (store.button_font) style += ` font-family: ${store.button_font};`;

        const primaryTextStyle = `color: ${store.button_text_color}; font-size: 14px; line-height: 14px; font-weight: 600;`;
        const secondaryTextStyle = `line-height: 12px; color: ${store.button_text_color}; display: block; font-size: 9px; font-weight: 400; margin: 0px 0px 0px 0px`;

        return `
            <div
                id="platforme-button"
                onMouseOver="this.style.opacity=0.8"
                onMouseOut="this.style.opacity=1"
                onMouseDown="this.style.opacity=0.6"
                onMouseUp="this.style.opacity=0.8"
                style="${style}"
            >
                ${
                    store.button_icon_position === "left"
                        ? `<div style="margin-top: 4px">${ICONS[store.button_icon || "icon_1"]}</div>`
                        : ""
                }
                <div style="display: inline-flex; flex-direction: column; margin: 0px ${
                    store.button_icon_position === "left" ? "0" : "16"
                }px 0px ${store.button_icon_position === "left" ? "16" : "0"}px;">
                    ${
                        store.button_orientation === "vertical"
                            ? `<p style="${secondaryTextStyle}">${store.button_secondary_text}</p>`
                            : ""
                    }
                    <a id='platforme-button-anchor' style="${primaryTextStyle}">
                    ${store.button_primary_text}
                </a>
                </div>
                ${
                    store.button_icon_position === "right"
                        ? `<div style="margin-top: 4px">${ICONS[store.button_icon || "icon_1"]}</div>`
                        : ""
                }
            </div>
        `;
    }

    /**
     * Redirect the current user agent to the customization target
     * taking into account the current context's information.
     *
     * @param {String} store The domain of the store currently in use and that
     * is going in the redirection URL parameters.
     * @param {Object} product Object containing the Magento version of the
     * product.
     * @param {Object} info The info object that contains multiple information
     * about the product currently in page visualization.
     * @param {Object} options Set of options that control the behavior of this
     * function.
     * @returns {URL} The generate URL for the redirection process.
     */
    async function redirectToCustomization(
        product,
        store,
        {
            baseUrl = BASE_URL,
            redirect = true,
            setCurrency = true,
            setCountry = true,
            setLocale = true,
            productTitle = null,
            currency = null,
            country = null,
            locale = null
        } = {}
    ) {
        // obtains the base query value from the product information map and obtains
        // the content language, store front digest and cart token, these values are
        // going to be sent in the redirection process
        const query = product.ripe_customization_query;
        currency = currency || "eur"; // TODO get from store config
        country = country || "pt"; // TODO get from store config

        locale = locale || (await getContentLanguage(true));

        // validates that some of the mandatory values are available
        // throwing errors otherwise (ensures guarantees)
        if (!locale) throw new Error("No valid locale value (content language) available");

        const enterUrl = baseUrl + "/config/enter";
        const url = new URL(enterUrl + "?" + query);
        const urlParams = url.searchParams;
        const title = productTitle || (product ? product.name : null);
        const productId = (product ? product.entity_id : null);

        // sets the multiple GET parameters that are going to be used
        // to pass the required Magento information to RIPE White
        urlParams.set("store", store);
        urlParams.set("product_title", title);
        if (setCurrency && currency) urlParams.set("currency", currency);
        if (setCountry && country) urlParams.set("country", country);
        if (setLocale && locale) urlParams.set("locale", locale);
        debugger;

        // in case a product is explicitly set adds extra product ID
        // information to the GET parameters
        if (product) urlParams.set("product_id", productId);

        if (redirect) window.location = url.toString();

        return url;
    }

    // eslint-disable-next-line no-unused-vars
    function addPlatformeButton(product,
        {
            productTitle = null,
            cartVariantId = null,
            setCurrency = true,
            setCountry = true,
            setLocale = true,
            currency = null,
            country = null,
            locale = null,
            variantId = null
        } = {}
    ) {
        // coerces the base URL to the static one in case none is provided
        // this parameter allows dynamic usage of multiple RIPE Bridge envs
        const baseUrl = BASE_URL;

        // gets store base URL
        const store = window.location.host; // TODO get from store config   
    
        // determines if the customizable product (build supported) is set as
        // `active` and if not ignores the request to add the Platforme button HTML
        active = parseInt(product.ripe_customization_active);
        if (!active) return;
    
        // in case there's no previous value defined, fallbacks
        // to the current location so that the user is able to
        // return back to the current page if desired
        const urlParams = new URLSearchParams(product.ripe_customization_query);
        if (!urlParams.has("previous")) {
            urlParams.set("previous", window.location.href);
            product.ripe_customization_query = urlParams.toString();
        }
    
        const injectionPoint = document.getElementById("platforme-button-injection");
        if (!injectionPoint) {
            console.error(
                "You must have an element with ID 'platforme-button-injection' in the HTML to be able to use Platforme's customization button."
            );
            return;
        }
    
        // "injects" the button's HTML into the target DOM element
        // as requested by the logic
        const storeConfig = { // TODO get from store config 
            enabled: true,
            description: null,
            meta: {},
            button_background_color: "#000000",
            button_orientation: "horizontal",
            button_icon: "icon_1",
            button_icon_position: "right",
            button_font: "",
            button_css: "",
            button_text_color: "#ffffff",
            button_primary_text: "Customize your product",
            button_secondary_text: ""
        };

        injectionPoint.innerHTML = generateButtonComponent(storeConfig);
    
        document.addEventListener("change", function() {
            const queryUrl = new URL(document.URL);
            const variantId = queryUrl.searchParams.get("variant");
    
            setupButton(product, store, {
                baseUrl: baseUrl,
                redirect: true,
                productTitle: productTitle,
                cartVariantId: cartVariantId,
                setCurrency: setCurrency,
                setCountry: setCountry,
                setLocale: setLocale,
                currency: currency,
                country: country,
                locale: locale,
                variantId: variantId
            });
        });
        
        setupButton(product, store, {
            baseUrl: baseUrl,
            redirect: true,
            productTitle: productTitle,
            cartVariantId: cartVariantId,
            setCurrency: setCurrency,
            setCountry: setCountry,
            setLocale: setLocale,
            currency: currency,
            country: country,
            locale: locale,
            variantId: variantId
        });
    }

    addPlatformeButton(productData);
});
