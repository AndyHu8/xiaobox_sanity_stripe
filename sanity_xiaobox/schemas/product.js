//Product Schema
export default {
    name: "product",
    title: "Product",
    type: "document",

    //Mehrere Images (Array)
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",

            //Array of images
            of: [{ type: "image" }],
            options: {
                //Besseres Positioning der Images beim Upload
                hotspot: true
            }
        },
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                //Generate unique slug based on name prop
                source: "name",
                maxLength: 90,
            }
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "beschreibung",
            title: "Beschreibung",
            type: "string"
        },
        {
            name: "geschlecht",
            title: "Geschlecht",
            type: "string"
        },
        {
            name: "farbe",
            title: "Farbe",
            type: "string"
        },
        {
            name: "material",
            title: "Material",
            type: "string"
        }
    ]
}