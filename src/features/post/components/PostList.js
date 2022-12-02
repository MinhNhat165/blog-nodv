import PostPreview from "./PostPreview";
import { useMutation, useQueryClient } from "react-query";
import { deletePost, publishPost, unpublishPost } from "../../../api/postApi";
import { toast } from "react-toastify";
import { updatePostToBookmark } from "../../../api/bookmarkApi";
import { useDispatch } from "react-redux";
import { updateBookmark } from "../../../redux/slices/bookmarkSlice";

export const PostList = ({
  postList = [],
  postIdsBookmark = [],
  storeKey = "posts",
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const updateLocalPost = (updatedPost) => {
    queryClient.setQueryData("posts", (oldData) =>
      oldData.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      })
    );
  };
  const deleteLocalPost = (postId) => {
    queryClient.setQueryData("posts", (oldData) => {
      const newPostList = oldData.filter((post) => post.id !== postId);
      return newPostList;
    });
  };
  const deletePostMutation = useMutation(deletePost, {
    onSuccess: (id) => {
      deleteLocalPost(id);
      toast.success("Post deleted successfully");
    },
  });

  const publishPostMutation = useMutation(publishPost, {
    onSuccess: (data) => {
      updateLocalPost(data);
      toast.success("Post was published");
    },
  });

  const unpublishPostMutation = useMutation(unpublishPost, {
    onSuccess: (data) => {
      updateLocalPost(data);
      toast.success("Post was unpublished ");
    },
  });

  const updateBookmarkMutation = useMutation(updatePostToBookmark, {
    onSuccess: (data) => {
      // console.log('data ', data);
      dispatch(updateBookmark({ postIds: data, posts: postList }));
    },
  });
  return (
    <div className="flex flex-col">
      {postList?.length ? (
        postList?.map((post) => (
          <div key={post.id} className="border-b pt-8 first:pt-0">
            <PostPreview
              post={post}
              isBookmarked={postIdsBookmark?.includes(post.id)}
              onUpdateBookmark={updateBookmarkMutation.mutate}
              onDelete={deletePostMutation.mutate}
              onPublish={publishPostMutation.mutate}
              onUnpublish={unpublishPostMutation.mutate}
            />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No posts found</div>
      )}
    </div>
  );
};

export default PostList;
