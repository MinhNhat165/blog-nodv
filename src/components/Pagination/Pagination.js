import { Pagination as MuiPagination } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ prefix, size }) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get('page') || '1', size);
	return (
		<MuiPagination
			page={page}
			count={10}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/${prefix}${item.page === 1 ? '' : `?page=${item.page}`}`}
					{...item}
				/>
			)}
		/>
	);
};

export default Pagination;
