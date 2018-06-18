// Type definitions for shopify-buy 1.4.0
// Project: http://shopify.github.io/js-buy-sdk/api/
// Definitions by: Martin Köhn <https://github.com/openminder>
//                 Stephen Traiforos <https://github.com/straiforos>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.7

/**
 * The JS Buy SDK is a lightweight library that allows you to build ecommerce into any website.
 * It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop,
 * add products to a cart, and checkout.
 * It can render data on the client side or server. This will allow you to add ecommerce functionality to any
 * website or javascript application. This is helpful if you already have a website and need to add ecommerce
 * or only need a simple buy button on your site.
 */

declare namespace ShopifyBuy {
    export function buildClient(config: Config): Client;

    export interface Client {
        product: ShopifyBuy.ProductResource;
        collection: ShopifyBuy.CollectionResource;
        checkout: ShopifyBuy.CheckoutResource;
        shop: ShopResource;
        image: Image;
        fetchNextPage<T extends GraphModel>(nextArray: T[]): T[];
    }

    export interface Config {
        domain: string;
        storefrontAccessToken: string;
    }

    export interface ProductResource {
        fetch(id: string): Promise<Product>;
        fetchAll(pageSizeopt?: number): Promise<Product[]>;
        fetchByHandle(handle: string): Promise<Product>;
        fetchMultiple(ids: string[]): Promise<Product[]>;
        fetchQuery(query: Query): Promise<Product[]>;

        /**
        *   Product Helper Namespace
        *   @link https://shopify.github.io/js-buy-sdk/ProductResource.html
        */
        variantForOptions(product: Product, options: Option): ProductVariant;
    }

    export interface CollectionResource {

        /**
        * Fetches a single collection by ID on the shop.
        */
        fetch(id: string): Promise<Collection>;

        /**
        * Fetches a single collection by ID on the shop, including products.
        */
        fetchWithProducts(id: string): Promise<Collection>;

        /**
        * Fetches all collections on the shop.
        */
        fetchAll(pageSizeopt?: number): Promise<Collection[]>;

        /**
        * Fetches all collections on the shop, including products.
        */
        fetchAllWithProducts(): Promise<Collection[]>;

        /**
        * Fetches all collections on the shop, including products.
        */
        fetchWithProducts(id: string): Promise<Collection>;

        /**
        * Fetches a collection by handle on the shop.
        */
        fetchByHandle(handle: string): Promise<Collection>;

        /**
        * Fetches a collection by query.
        */
        fetchQuery(query: Query): Promise<Collection>;
    }

    export interface CheckoutResource {
        create(
            email?: string,
            lineItems?: LineItem[],
            shippingAddress?: Address,
            note?: string,
            customAttributes?: AttributeInput[]
        ): Promise<Cart>;

        fetch(id: string): Promise<Cart>;

        addLineItems(checkoutId: string | number, lineItems: LineItem[]): Promise<Cart>;

        /**
         * Remove all line items from cart
         */
        clearLineItems(
            checkoutId: string | number,
            lineItems: LineItem[]
        ): Promise<Cart>;

        /**
         * Add items to cart. Updates cart's lineItems
         */
        addVariants(item: Item, nextItem?: Array<Item>): Promise<Cart>;

        /**
         * Remove a line item from cart based on line item id
         */
        removeLineItem(
            checkoutId: string | number,
            lineItemIds: string[]
        ): Promise<Cart>;

        /**
         * Update a line item quantity based on line item id
         */
        updateLineItem(
            checkoutId:  string | number,
            lineItems: AttributeInput[]
        ): Promise<Cart>;
    }

    export interface ShopResource {
        fetchInfo(): Promise<Shop>;
        fetchPolicies(): Promise<Shop>;
    }

    export interface Query {
     /**
      * query: title, collection_type, updated_at
      * TODO probably will remove before Defintely Typed PR, 
      * as their  community guidelines
      */
        query: string;
        sortBy: string;
        after?: string;
        before?: string;
        first?: string;
        last?: string;
        reverse?: boolean;
    }

    export interface Product extends GraphModel {

        createdAt: Date;

        updatedAt: Date;

        /**
         * A product description.
         */
        description: string;

        /**
         * A product descriptions html representation for the shoppify store front.
         */
        descriptionHtml: string;

        /**
         * A product handle.
         */
        handle: string;

        /**
         * Product unique ID
         */
        id: string | number;

        /**
         * An Array of Objects that contain meta data about an image including src of the images.
         */
        images: Array<Image>;

        /**
         * Get an array of Product Options. Product Options can be used to define
         * the currently selectedVariant from which you can get a checkout url (ProductVariant.checkoutUrl)
         * or can be added to a cart (Cart.createLineItemsFromVariants).
         */
        options: Array<Option>;

        /**
         * The product type
         */
        productType: string;

        /**
         * Retrieve variant for currently selected options. By default the first value in each option is selected
         * which means selectedVariant will never be null. With a selectedVariant you can
         * create checkout url (ProductVariant.checkoutUrl) or
         * it can be added to a cart (Cart.createLineItemsFromVariants).
         */
        selectedVariant: ProductVariant;

        /**
         * Retrieve image for currently selected variantImage.
         */
        selectedVariantImage: Image;

        /**
         * A read only Array of Strings represented currently selected option values. eg. ["Large", "Red"]
         */
        selections: Array<string>;

        /**
         * The product title
         */
        title: string;

        /**
         * An Array of product tags
         */
        tags: Tag[];

        /**
         * All variants of a product.
         */
        variants: Array<ProductVariant>;

        /**
         * The product vendor
         */
        vendor: string;
    }

    export interface ProductVariant extends GraphModel {
        /**
         * Variant in stock. Always true if inventory tracking is disabled.
         */
        available: boolean;

        /**
         * Compare at price for variant. The compareAtPrice would be the price of the
         * product previously before the product went on sale.
         */
        compareAtPrice: string;

        /**
         * Price of variant, formatted according to shop currency format string. For instance "$10.00"
         */
        formattedPrice: string;

        /**
         * Variant weight in grams. If no weight is defined grams will be 0.
         */
        grams: number;

        /**
         * Variant unique ID
         */
        id: string | number;

        /**
         * Image for variant
         */

        image: Image;

        /**
         * Image variants available for a variant.
         */
        imageVariant: Array<ImageVariant>;

        /**
         * Option values associated with this variant, ex {name: "color", value: "Blue"}
         */
        optionValues: Array<OptionValue>;

        /**
         * Price of the variant. The price will be in the following form: "10.00"
         */
        price: string;

        /**
         * ID of product variant belongs to
         */
        productId: string | number;

        /**
         * Title of product variant belongs to
         */
        productTitle: string;

        /**
         * Title of variant
         */
        title: string;

        /*
        * Get a checkout url for a specific product variant.
        * You can optionally pass a quantity.
        * If no quantity is passed then quantity will default to 1.
        */
        checkoutUrl(quantitiy: number): string;
    }

    export interface Option {
        /**
         * name of option (ex. "Size", "Color")
         */
        name: string;

        /**
         * get/set the currently selected option value with one of the values from the Product Options/values array.
         * For instance if the option values array had the following ["Large", "Medium", "Small"] setting selected to be
         * "Large", "Medium", or "Small" would be valid any other value would throw an Error.
         */
        selected: string;

        /**
         * an Array possible values for option. For instance if this option
         * is a "Size" option an example value for values could be: ["Large", "Medium", "Small"]
         */
        values: Array<OptionValue>;
    }

    export interface OptionValue {
        name: string;
        option_id: string;
        value: any;
    }

    export interface Tag {
        value: string;
        type: Type;
    }

    export interface Type {
        name: string;
        kind: string;
        fieldBaseTypes?: any;
        implementsNode?: boolean;
    }

    export interface Collection extends GraphModel {
        body_html: string;
        handle: string;
        description: string;
        descriptionHtml: string;
        id: string;
        image: Image;
        metafields: any[];
        products?: Product[];
        published: boolean;
        published_at: string;
        published_scope: string;
        sort_order: string;
        template_suffix: string;
        title: string;
        updated_at: string;
    }

    export interface Cart extends GraphModel {
        /**
         * Get checkout URL for current cart
         */
        checkoutUrl: string;

        /**
         * get ID for current cart
         */
        id: string | number;

        /**
         * Gets the total quantity of all line items. Example: you've added two variants
         * with quantities 3 and 2. lineItemCount will be 5.
         */
        lineItemCount: number;

        /**
         * Get an Array of CartLineItemModel's
         */
        lineItems: LineItem[];

        /**
         * Get current subtotal price for all line items.
         * Example: two items have been added to the cart that cost $1.25 then the subtotal will be 2.50
         */
        subtotal: string;
    }

    export interface LineItem extends GraphModel {
        /**
         * Compare at price for variant. The compareAtPrice would be the price of the product
         * previously before the product went on sale.
         * If no compareAtPrice is set then this value will be null. An example value: "5.00".
         */
        compare_at_price: string;

        /**
         * Variant's weight in grams. If no weight is set then 0 is returned.
         */
        grams: number;

        /**
         * A line item ID.
         */
        id: string | number;

        /**
         * Variant's image.
         */
        image: Image;

        /**
         * The total price for this line item. For instance if the variant costs 1.50 and you have a
         * quantity of 2 then line_price will be 3.00.
         */
        line_price: string;

        /**
         * Price of the variant. For example: "5.00".
         */
        price: string;

        /**
         * ID of variant's product.
         */
        product_id: string | number;

        /**
         * Count of variants to order.
         */
        quantity: number;

        /**
         * Product title of variant's parent product.
         */
        title: string;

        /**
         * ID of line item variant.
         */
        variant_id: string | number;

        /**
         * Title of variant.
         */
        variant_title: string;
    }

    export interface Item {
        variant: ProductVariant;
        quantity: number;
    }

    export interface Address {
        address1: String;
        address2: String;
        city: String;
        company: String;
        country: String;
        firstName: String;
        lastName: String;
        phone: String;
        province: String;
        zip: String;
    }

     /**
     *  https://help.shopify.com/api/custom-storefronts/storefront-api/reference/input_object/attributeinput
     *  https://help.shopify.com/api/custom-storefronts/storefront-api/reference/input_object/checkoutlineitemupdateinput
     */
    export interface AttributeInput {
        key?: string;
        value?: string;
        id?: string | number;
        quantity?: number;
        variantId?: string;
    }

    /**
     * TODO Validate schema matches js-buy
     * Derived from REST API Docs: https://help.shopify.com/api/custom-storefronts/storefront-api/reference/object/shop#fields
     */
    export interface Shop {

        description: string;
        moneyFormat: string;
        name: string;
        /**
         * TODO Add types for the Shop properties below
         * PaymentSettings, ShopPolicy etc
         */
        paymentSettings: any;
        primaryDomain: any;
        privacyPolicy: any;
        refundPolicy: any;
        termsOfService: any;
    }

    /**
     * Internal Image description
     */
    export interface Image extends GraphModel {
        id: string | number;
        created_at: string;
        position: number;
        updated_at: string;
        product_id: string;
        src: string;
        variant_ids: Array<string>;
    }

    export interface ImageVariant extends Image {
        name: string;
        dimensions: string;
        src: string;
        /**
        * Returns src URL for new image size/variant
        * @param image The image you would like a different size for.
        * @param options Image Max width and height configuration.
        */
        imageForSize(image: Image, options: ImageOptions): string;
    }

    export interface ImageOptions {
        maxWidth: number;
        maxHeight: number;
    }

    let NO_IMAGE_URI: string;

    /*
    *   Base Model for the higher level returned objects from the API using GraphQL
    */
    export interface GraphModel {
        attrs?: any
        onlineStoreUrl?: string
        hasNextPage: any;
        hasPreviousPage: any;
        variableValues: any;
    }
}

declare module "shopify-buy" {
    export = ShopifyBuy;
}
