import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDeedsState {
  deeds: [];
}

const initialState: IDeedsState = {
    deeds: [],
};

const deedsSlice = createSlice({
  name: "deads",
  initialState,
  reducers: {
    setDeeds(state, { payload: deeds }: PayloadAction<any>) {
      return { ...state, deeds };
    },
  },
});

export const { setDeeds } = deedsSlice.actions;
export default deedsSlice.reducer;