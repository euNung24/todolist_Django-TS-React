export const SET_DATE = "date/SET_DATE" as const;

export const setDate = (date: string) => ({
  type: SET_DATE,
  payload: { date },
});

export type DateAction = ReturnType<typeof setDate>;
