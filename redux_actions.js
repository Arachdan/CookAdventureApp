export function increaseExperiencePoints(num) {
    return {
        type: 'INCREASE_EXPERIENCE_POINTS',
        data: num
    };
}

export function updateExperiencePoints(num) {
    return {
        type: 'UPDATE_EXPERIENCE_POINTS',
        data: num
    };
}

export function increaseRequiredExperience(num) {
    return {
        type: 'INCREASE_REQUIRED_EXPERIENCE',
        data: num
    };
}

export function increaseLevel(num) {
    return {
        type: 'INCREASE_LEVEL',
        data: num
    };
}