import axiosClient, { axiosClientPrivate } from './axiosClient';

const url = '/posts';

const postApi = {
	getPosts: ({ page = 0, limit = 5, topic = 'all' }) =>
		axiosClient.get(url + `?page=${page}&limit=${limit}&topic=${topic}`),
	getPostById: (id) => axiosClient.get(`${url}/${id}`),

	getOwnedPosts: (isPublish) =>
		axiosClientPrivate.get(
			`${url}/me${!!isPublish ? '?isPublish=' + isPublish : ''}`
		),

	createPost: (post) => axiosClientPrivate.post(url, post),

	updatePost: (post) => {
		return axiosClientPrivate.put(`${url}/${post.id}`, post);
	},

	deletePost: (id) => axiosClientPrivate.delete(`${url}/${id}`),

	publishPost: (id) => axiosClientPrivate.patch(`${url}/${id}/publish`, null),

	unpublishPost: (id) =>
		axiosClientPrivate.patch(`${url}/${id}/unpublished`, null),

	likePost: (id) => axiosClientPrivate.patch(`${url}/${id}/like`, null),

	unLikePost: (id) => axiosClientPrivate.patch(`${url}/${id}/unlike`, null),
};

export const {
	getPosts,
	createPost,
	getPostById,
	getOwnedPosts,
	deletePost,
	publishPost,
	unpublishPost,
	likePost,
	unLikePost,
	updatePost,
} = postApi;

export default postApi;
