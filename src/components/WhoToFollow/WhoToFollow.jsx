import { Chip, ListItemSecondaryAction } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonFollow from '../ButtonFollow/ButtonFollow';

const lstFollower = [
	{
		id: 1,
		name: 'KimOanh',
		content:
			'Student PTITHCM VIETNAM',
		followed: true,
		avatar: 'https://i1.sndcdn.com/avatars-000299868797-urkzpd-t500x500.jpg',
		path: '/picture',
	},
	{
		id: 2,
		name: 'NguyenKim',
		content: 'Dev Pro',
		followed: false,
		avatar: 'data:image/jpeg;base64,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',
		path: '/picture',
	},
	{
		id: 3,
		name: 'TrungDuc',
		content: 'Technical Leader',
		followed: false,
		avatar: 'https://cdn1.iconfinder.com/data/icons/business-finance-174/132/business-24-512.png',
		path: '/picture',
	},
];

const WhoToFollow = () => {
	return (
		<>
			<div>
				<h2 className="m-0 mb-5 block px-4 text-base font-medium leading-5">
					Who To Follow
				</h2>
				{lstFollower.map((item) => (
					<div
						className="relative flex w-full items-center justify-between pt-4"
						key={item.id}
					>
						<div className="container-left">
							<Link to={item.path}>
								<img
									src={item.avatar}
									alt="TanDat"
									className="t-0 absolute block h-12 w-12 rounded-full"
								/>
							</Link>
							<Link to={item.path}>
								<div className="ml-16 mr-8 block">
									<h2 className="break-all text-base font-bold">{item.name}</h2>
									<div className="mt-1 block  break-words">
										<p className=" color break-all text-sm font-normal line-clamp-2">
											{item.content}
										</p>
									</div>
								</div>
							</Link>
						</div>
						<div>
							<ButtonFollow isFollowed={item.followed} />
						</div>
					</div>
				))}
			</div>
			<span className="cursor-pointer">See all</span>
		</>
	);
};

export default WhoToFollow;
