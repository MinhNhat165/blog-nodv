import axios from 'axios';
import axiosClient, { axiosClientPrivate } from './axiosClient';

const url = '/posts';

const postApi = {
	getPosts: ({ page = 0, limit = 5, topic, title }) =>
		axiosClient.get(url, {
			params: {
				page,
				limit,
				topic,
				title,
			},
		}),

	getPostsTrending: (limit = 6) =>
		axiosClient.get(`${url}/trending?limit=${limit}`),

	getPostById: (id) => axiosClient.get(`${url}/${id}`),
	getPostsByUserId: (id) => axiosClient.get(`${url}/user/${id}`),

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

	hidePost: (id) => axiosClientPrivate.patch(`/blackLists/${id}`, null),

	getListPostHided: () => axiosClientPrivate.get('/blackLists/list'),

	getPostsRecommend: async (id) => {
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER_RECOMMEND_URL}/api/posts/${id}/recommend`
		);
		return response.data;
	},
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
	getPostsTrending,
	getPostsByUserId,
	hidePost,
	getListPostHided,
	getPostsRecommend,
} = postApi;

export default postApi;
