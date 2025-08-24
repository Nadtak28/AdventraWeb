import { createSlice } from "@reduxjs/toolkit";
import {
  CreateFeedbackService,
  UpdateFeedbackService,
  DeleteFeedbackService,
} from "../api/feedBackService";

/**
 * key generator to separate feedback lists by entity
 */
export const feedbackKey = (type, id) => `${type}:${id}`;

const initialState = {
  // map of key -> { items: [], loading: false, error: null }
  buckets: {},
  // global operation states (optional)
  creating: false,
  updating: false,
  deleting: false,
  lastError: null,
};

const ensureBucket = (state, key) => {
  if (!state.buckets[key]) {
    state.buckets[key] = { items: [], loading: false, error: null };
  }
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // Seed/replace the list for a given entity (used when you already fetched details)
    setFeedbacksFor(state, action) {
      const { type, id, feedbacks } = action.payload;
      const key = feedbackKey(type, id);
      ensureBucket(state, key);
      state.buckets[key].items = Array.isArray(feedbacks) ? feedbacks : [];
      state.buckets[key].error = null;
    },
    // Optional: clear errors
    clearFeedbackError(state) {
      state.lastError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(CreateFeedbackService.pending, (state) => {
        state.creating = true;
        state.lastError = null;
      })
      .addCase(CreateFeedbackService.fulfilled, (state, action) => {
        state.creating = false;
        // We expect backend to return the created feedback with type + entity id?
        // If not, we rely on the caller to dispatch setFeedbacksFor afterward, OR
        // we can allow the UI to specify the insertion bucket via meta.arg
        const created = action.payload;
        const { id: entityId, type } = action.meta.arg; // from the original call payload
        const key = feedbackKey(type, entityId);
        ensureBucket(state, key);
        // put newest first
        state.buckets[key].items = [created, ...state.buckets[key].items];
      })
      .addCase(CreateFeedbackService.rejected, (state, action) => {
        state.creating = false;
        state.lastError = action.payload || "Failed to create feedback.";
      })

      // UPDATE
      .addCase(UpdateFeedbackService.pending, (state) => {
        state.updating = true;
        state.lastError = null;
      })
      .addCase(UpdateFeedbackService.fulfilled, (state, action) => {
        state.updating = false;
        const updated = action.payload;
        // We must find the bucket that contains this feedback.
        // Since backend doesn’t echo type/entity, we’ll search all buckets.
        for (const key of Object.keys(state.buckets)) {
          const idx = state.buckets[key].items.findIndex(
            (f) => f.id === updated.id
          );
          if (idx !== -1) {
            state.buckets[key].items[idx] = {
              ...state.buckets[key].items[idx],
              ...updated,
            };
            break;
          }
        }
      })
      .addCase(UpdateFeedbackService.rejected, (state, action) => {
        state.updating = false;
        state.lastError = action.payload || "Failed to update feedback.";
      })

      // DELETE
      .addCase(DeleteFeedbackService.pending, (state) => {
        state.deleting = true;
        state.lastError = null;
      })
      .addCase(DeleteFeedbackService.fulfilled, (state, action) => {
        state.deleting = false;
        const { feedbackId } = action.payload;
        for (const key of Object.keys(state.buckets)) {
          state.buckets[key].items = state.buckets[key].items.filter(
            (f) => f.id !== feedbackId
          );
        }
      })
      .addCase(DeleteFeedbackService.rejected, (state, action) => {
        state.deleting = false;
        state.lastError = action.payload || "Failed to delete feedback.";
      });
  },
});

export const { setFeedbacksFor, clearFeedbackError } = feedbackSlice.actions;
export default feedbackSlice.reducer;

/**
 * Selectors
 */
export const selectFeedbackBucket = (state, type, id) =>
  state.feedback.buckets[feedbackKey(type, id)] || { items: [], error: null };

export const selectFeedbackOps = (state) => ({
  creating: state.feedback.creating,
  updating: state.feedback.updating,
  deleting: state.feedback.deleting,
  lastError: state.feedback.lastError,
});
