export const required = (message = 'com.validate.required') =>
    (value, allValues, props) => value ? undefined : props.translate(message);
export const maxLength = (max, message = 'com.validate.too_large') =>
    (value, allValues, props) => value && value.length > max ? props.translate(message) : undefined;
export const number = (message = 'com.validate.must_be_number') =>
    (value, allValues, props) => value && isNaN(Number(value)) ? props.translate(message) : undefined;
export const minValue = (min, message = 'com.validate.too_small') =>
    (value, allValues, props) => value < min ? props.translate(message) : undefined;
