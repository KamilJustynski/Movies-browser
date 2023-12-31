import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    data: [],
    loading: false,
    error: null,
    peopleId: null,
  },
  reducers: {
    fetchPeopleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPeopleSuccess: (state, action) => {
      state.loading = false;
      state.data.push(...action.payload);
    },
    fetchPeopleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllPeopleSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    handlePeopleClick: (state, action) => {
      state.peopleId = action.payload;
    },
  },
});

const selectPeopleState = (state) => state.people;
export const selectData = (state) => selectPeopleState(state).data;
export const selectLoading = (state) => selectPeopleState(state).loading;
export const selectError = (state) => selectPeopleState(state).error;
export const selectPersonId = (state) => selectPeopleState(state).peopleId;

export const selectPeopleByQuery = (state, query) => {
  const people = selectData(state);
  const seen = {};
  if (!query || query.trim() === "") {
    return people;
  }
  return people
    .filter((person) => {
      if (!seen[person.name]) {
        seen[person.name] = true;
        return true;
      }
      return false;
    })
    .filter((person) =>
      person.name.toUpperCase().includes(query.trim().toUpperCase())
    );
};

export const {
  fetchPeopleRequest,
  fetchPeopleSuccess,
  fetchPeopleFailure,
  fetchAllPeopleSuccess,
  handlePeopleClick,
} = peopleSlice.actions;

export default peopleSlice.reducer;
