import { Notyf } from "notyf";

/**
 * DATA FOR SELECT
 */
export const DIFFICULTY_SELECT_LIST = [
    {
        "option": "Easy",
        "value": "easy"
    },
    {
        "option": "Medium",
        "value": "medium"
    },
    {
        "option": "Hard",
        "value": "hard"
    }
]

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const notyf = new Notyf({
    duration: 3000,
    position: {
        x: "right",
        y: "top",
    },
    types: [
        {
            type: "success",
            backgroundColor: "#28a745",
            icon: {
                className: "notyf__icon--success",
                tagName: "i",
            },
        },
        {
            type: "error",
            backgroundColor: "#dc3545",
            icon: {
                className: "notyf__icon--error",
                tagName: "i",
            },
        }
    ]
});

export const showSuccessMessage = (message) => {
    notyf.open({
        type: "success",
        message
    });
}

export const showErrorMessage = (message) => {
    notyf.open({
        type: "error",
        message
    });
}