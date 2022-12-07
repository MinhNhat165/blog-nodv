import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComment } from "../../../../api/commentApi";
import { createNotification } from "../../../../api/notificationApi";
import { updateCountNotifications } from "../../../../api/userApi";
import { NotificationType } from "../../../../config/dataType";
import {
  addComment,
  setComments,
  updateComment,
} from "../../../../redux/slices/commentSlice";
import { callApiCreateNotification } from "../../../../utils/generationNotification";
import CommentEditor from "../CommentEditor";
import CommentList from "../CommentList";
import CommentContainerHeader from "./CommentContainerHeader";

const CommentContainer = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.data);
  const userId = useSelector((state) => state.user?.data?.info?.id);

  const rootComments = useSelector(
    (state) => state.comment.commentsByParentId[null]
  );
  useQuery(["comments", post.id], () => getComment(post.id), {
    onSuccess: (data) => {
      dispatch(setComments(data));
    },
  });
  const createNewComment = useMutation(createComment);

  const updateUserIncreaseNumOfNotification = useMutation(
    updateCountNotifications
  );
  const createNewNotificationComment = useMutation(createNotification);
  const handleCreateComment = (comment) => {
    createNewComment.mutate(comment);
    const data = comment;
    data.postUserId = post.userId;
    callApiCreateNotification(
      comment,
      NotificationType.COMMENT,
      createNewNotificationComment,
      userId
    );
    const Increase = {
      isIncrease: true,
      userId: data.postUserId,
    };
    updateUserIncreaseNumOfNotification.mutate(Increase);
  };
  const initialComment = {};
  const updateLocalListComment = (updatedComment) => {
    dispatch(addComment(updatedComment));
  };
  const handleReceiveCommentSocket = (payload) => {
    const comment = JSON.parse(payload.body);
    updateLocalListComment(comment);
  };
  const updateLocalComment = (updatedComment) => {
    dispatch(updateComment(updatedComment));
  };
  const handleReceiveUpdateCommentSocket = (payload) => {
    const comment = JSON.parse(payload.body);
    updateLocalComment(comment);
  };
  useEffect(() => {
    const topic = `/topic/posts/${post?.id}/comment`;
    const update = `/topic/posts/${post?.id}/updatecomment`;
    // const delete = `/topic/posts/${post?.id}/deletecomment`;
    if (socket) {
      socket.subscribe(topic, handleReceiveCommentSocket, { id: topic });
      socket.subscribe(update, handleReceiveUpdateCommentSocket, {
        id: update,
      });
      //socket.subscribe(delete, handleReceiveDeleteCommentSocket, { id: delete });
    }
    return () => {
      if (socket) {
        socket.unsubscribe(topic);
        socket.unsubscribe(update);
      }
    };
  }, [post?.id, socket]);

  return (
    <div className="w-[414px]">
      <CommentContainerHeader onClose={onClose} />
      <CommentEditor
        initialComment={initialComment}
        onSubmit={handleCreateComment}
        post={post}
      />
      {rootComments != null && rootComments.length > 0 && (
        <div className="mt-4">
          <CommentList comments={rootComments} post={post} />
        </div>
      )}
    </div>
  );
};

export default CommentContainer;
