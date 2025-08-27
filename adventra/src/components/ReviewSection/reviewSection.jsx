import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedSection from "../../features/tours/components/tour/mainContent/animatedSection";
import { Star, Pencil, Trash2, Send, X } from "lucide-react";
import {
  CreateFeedbackService,
  DeleteFeedbackService,
  UpdateFeedbackService,
} from "../../api/feedBackService";
import {
  selectFeedbackBucket,
  selectFeedbackOps,
  setFeedbacksFor,
} from "../../hooks/feedBackSlice";

/**
 * Props:
 * - type: 'group_trip' | 'event' | 'guide'
 * - entityId: number
 * - feedbacks: array (initial list from the parent detail response)
 * - currentUserId?: number (to show edit/delete for own feedback)
 */
export default function ReviewsSection({
  type,
  entityId,
  feedbacks,
  currentUserId,
  onUserModalToggle, // New prop to handle modal state at parent level
}) {
  const dispatch = useDispatch();

  // Seed Redux bucket for this entity on mount or when 'feedbacks' changes
  useEffect(() => {
    if (Array.isArray(feedbacks)) {
      dispatch(setFeedbacksFor({ type, id: entityId, feedbacks }));
    }
  }, [dispatch, type, entityId, feedbacks]);

  const { items } = useSelector((state) =>
    selectFeedbackBucket(state, type, entityId)
  );
  const { creating, updating, deleting, lastError } =
    useSelector(selectFeedbackOps);

  // Local state for new review
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // Local state for editing
  const [editId, setEditId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editHover, setEditHover] = useState(0);
  const [editComment, setEditComment] = useState("");

  // Flag to prevent auto-filling after user cancels
  const [manualCancel, setManualCancel] = useState(false);

  // Modal state - now controlled by parent
  const [selectedUser, setSelectedUser] = useState(null);

  // Notify parent when modal state changes
  useEffect(() => {
    if (onUserModalToggle) {
      onUserModalToggle(!!selectedUser);
    }
  }, [selectedUser, onUserModalToggle]);

  // Detect current user's feedback (if any)
  const myFeedback = useMemo(
    () => items.find((f) => f?.user?.id === currentUserId),
    [items, currentUserId]
  );

  // Auto-fill edit fields only if not manually canceled
  useEffect(() => {
    if (myFeedback && !editId && !manualCancel) {
      setEditId(myFeedback.id);
      setEditRating(Number(myFeedback.rating || 0));
      setEditComment(myFeedback.comment || "");
    }
  }, [myFeedback, editId, manualCancel]);

  const averageRating = useMemo(() => {
    if (!items.length) return 0;
    const sum = items.reduce((acc, f) => acc + Number(f.rating || 0), 0);
    return (sum / items.length).toFixed(1);
  }, [items]);

  // Handlers
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newRating || !newComment.trim()) return;
    dispatch(
      CreateFeedbackService({
        id: Number(entityId),
        type,
        rating: Number(newRating),
        comment: newComment.trim(),
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setNewRating(0);
        setNewComment("");
      }
    });
  };

  const startEdit = (f) => {
    setEditId(f.id);
    setEditRating(Number(f.rating || 0));
    setEditComment(f.comment || "");
    setManualCancel(false);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditRating(0);
    setEditComment("");
    setManualCancel(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editId) return;
    dispatch(
      UpdateFeedbackService({
        feedbackId: editId,
        rating: Number(editRating),
        comment: editComment.trim(),
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        cancelEdit();
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(DeleteFeedbackService({ feedbackId: id }));
  };

  // Star renderer
  const DisplayStars = ({ value }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(Number(value || 0))
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  // Star picker
  const StarPicker = ({
    value,
    hover,
    setValue,
    setHover,
    size = "w-5 h-5",
  }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < (hover || value);
        return (
          <button
            type="button"
            key={i}
            className="focus:outline-none"
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setValue(i + 1)}
            aria-label={`Rate ${i + 1} stars`}
          >
            <Star
              className={`${size} ${
                filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <AnimatedSection delay={500}>
      <section className="mt-12 bg-gradient-to-br dark:bg-[#1a1f2e]">
        <div className="flex items-end justify -between mb-6">
          <div>
            <h2 className="text-2x l dark:text-white font-bold text-gray-900">
              What Travelers Say
            </h2>
            <p className="text-sm dark:text-white text-gray-600 mt-1">
              {items.length} review{items.length !== 1 ? "s" : ""} • Avg{" "}
              {averageRating}/5
            </p>
          </div>
          {lastError && (
            <span className="text-sm text-red-600">{lastError}</span>
          )}
        </div>

        {/* CREATE FORM */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl mb-8 shadow-sm">
          <form onSubmit={handleCreate} className="grid gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Add your review
            </label>
            <StarPicker
              value={newRating}
              hover={hoverRating}
              setValue={setNewRating}
              setHover={setHoverRating}
            />
            <textarea
              className="w-full rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#519489] focus:border-transparent outline-none"
              rows={3}
              placeholder="Share your experience..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={creating || !newRating || !newComment.trim()}
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl bg-[#519489] text-white font-semibold shadow-sm hover:opacity-90 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {creating ? "Posting..." : "Post review"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((feedback) => {
            const mine = String(feedback?.user?.id) === String(currentUserId);
            const isEditing = editId === feedback.id;

            const userImage = feedback.user?.image?.[0]?.url?.[0];

            return (
              <div
                key={feedback.id}
                className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br from-[#519489] to-[#6ba89d] text-white font-bold"
                    onClick={() => setSelectedUser(feedback.user)}
                  >
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={feedback.user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      feedback.user?.name?.charAt(0) || "A"
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {feedback.user?.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <DisplayStars value={feedback.rating} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feedback.rating}
                      </span>
                    </div>
                  </div>
                  {mine && !isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(feedback)}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 dark:text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        disabled={deleting}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feedback.comment}
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                      {feedback.date
                        ? new Date(feedback.date).toLocaleDateString()
                        : ""}
                    </p>
                  </>
                ) : (
                  <form onSubmit={handleUpdate} className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-white">
                        Update your review
                      </span>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                    <StarPicker
                      value={editRating}
                      hover={editHover}
                      setValue={setEditRating}
                      setHover={setEditHover}
                    />
                    <textarea
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-[#519489] focus:border-transparent outline-none"
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={updating || !editComment.trim()}
                      className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl bg-[#519489] text-white font-semibold shadow-sm hover:opacity-90 disabled:opacity-50"
                    >
                      {updating ? "Saving..." : "Save changes"}
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>

        {/* USER MODAL - Render modal content only */}
        {selectedUser && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 flex flex-col items-center max-w-sm w-full relative mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setSelectedUser(null)}
              >
                <X className="w-5 h-5" />
              </button>
              {selectedUser.image?.[0]?.url?.[0] ? (
                <img
                  src={selectedUser.image[0].url[0]}
                  alt={selectedUser.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-[#519489] to-[#6ba89d] text-white text-3xl font-bold mb-4">
                  {selectedUser.name?.charAt(0) || "A"}
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedUser.name}
              </h3>
            </div>
          </div>
        )}
      </section>
    </AnimatedSection>
  );
}
