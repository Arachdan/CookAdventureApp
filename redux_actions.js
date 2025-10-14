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

export function handleExperienceAndLeveling() {
    return function handleExperienceAndLevelingThunk(dispatch, getState) {
        dispatch(increaseExperiencePoints(20));

        const state = getState();
        if(state.exp >= state.requiredExp) {
            dispatch(increaseLevel(1));
            const updatedExperiencePoints = state.exp - state.requiredExp;
            dispatch(increaseRequiredExperience(1.2));
            dispatch(updateExperiencePoints(updatedExperiencePoints));
        }
    }
}

export function updatePersonalGoal(string) {
    return {
        type: 'UPDATE_PERSONAL_GOAL',
        data: string
    };
}

export function updatePlayerName(string) {
    return {
        type: 'UPDATE_PLAYER_NAME',
        data: string
    }
}