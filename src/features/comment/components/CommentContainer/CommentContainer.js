import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { addComment } from '../../../../redux/slices/commentSlice';
import CommentEditor from '../CommentEditor';
import CommentList from '../CommentList';
import CommentContainerHeader from './CommentContainerHeader';

const CommentContainer = ({ onClose }) => {
	const dispatch = useDispatch();
	const rootComments = useSelector(
		(state) => state.comment.commentsByParentId[undefined]
	);

	const handleCreateComment = (comment) => {
		dispatch(addComment(comment));
	};

	const initialComment = { id: uuid(), createdAt: new Date() };

	return (
		<div className="w-[414px]">
			<CommentContainerHeader onClose={onClose} />
			<CommentEditor
				initialComment={initialComment}
				onSubmit={handleCreateComment}
			/>
			{rootComments != null && rootComments.length > 0 && (
				<div className="mt-4">
					<CommentList comments={rootComments} />
				</div>
			)}
		</div>
	);
};

export default CommentContainer;