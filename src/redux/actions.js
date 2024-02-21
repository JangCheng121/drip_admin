//스킴이 갱신된 경우
export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = theme => ({
    type: CHANGE_THEME,
    payload: theme,
});

