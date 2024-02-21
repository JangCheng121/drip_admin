/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    var formerData = [];
    var newData = []
    if (params.data && params.data.media) {
        if (params.data.media.length) {
            // only freshly dropped pictures are instance of File
            // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
            // if parameter `multiple` is false, then data.pictures is not an array, but single object
            formerData = params.data.media.filter(p => !(p.rawFile instanceof File));
            newData = params.data.media.filter(p => p.rawFile instanceof File);
        }
        else  {
            if(params.data.media.rawFile instanceof File) {
                newData.push(params.data.media)
            }
        }            
        return Promise.all(newData.map(convertFileToBase64))
        .then(base64Data => base64Data.map((data64, index) => ({
            src: data64,
            title: `${newData[index].title}`,
        })))
        .then(transformedData => requestHandler(type, resource, {
            ...params,
            data: {
                ...params.data,
                media: formerData.length? [...transformedData, ...formerData]:[...transformedData],
            },
        }));
    } 

    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;