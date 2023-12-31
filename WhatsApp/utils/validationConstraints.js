import { validate} from 'validate.js';

export const validateString = (inputId, inputValue) => { 
    const constraints = {
        presence: { allowEmpty: false },
    };

    if (inputValue !== "") {
        constraints.format = {
            pattern: "[a-z0-9]+",
            flags: "i",
            message: "value can contain only letters!"
        }
    }

    const validationResult = validate({ [inputId]: inputValue },
        { [inputId]: constraints });

    return validationResult && validationResult[inputId];
}

export const validateLength = (inputId, inputValue, minLength, maxLength, allowEmpty) => { 
    const constraints = {
        presence: { allowEmpty },
    };

    if (!allowEmpty || inputValue !== "") {
        constraints.length = {

        }

        if (minLength != null) {
            constraints.length.minimum = minLength;
        }

        if (maxLength != null) {
            constraints.length.maximum = maxLength;
        }
    }

    const validationResult = validate({ [inputId]: inputValue },
        { [inputId]: constraints });

    return validationResult && validationResult[inputId];
}

export const validateEmail = (inputId, inputValue) => { 
    const constraints = {
        presence: { allowEmpty: false },
    };

    if (inputValue !== "") {
        constraints.email = true;
    }

    const validationResult = validate({ [inputId]: inputValue },
        { [inputId]: constraints });

    return validationResult && validationResult[inputId];
}

export const validatePassword = (inputId, inputValue) => { 
    const constraints = {
        presence: { allowEmpty: false },
    };

    if (inputValue !== "") {
        constraints.length = {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    }

    const validationResult = validate({ [inputId]: inputValue },
        { [inputId]: constraints });

    return validationResult && validationResult[inputId];
}