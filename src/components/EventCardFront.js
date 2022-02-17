import React, { useState } from 'react';
import styled from 'styled-components';
import { EventCardBack } from './EventCardBack';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	width: 24em;
	border-radius: 0.6em;
	padding: 2em;
	margin: 1em;
	box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const CardTitle = styled.h2`
	color: rgb(0, 65, 113);
	font-weight: 700;
`;

const EventTime = styled.p`
	color: rgb(148, 148, 148);
`;

const CardBody = styled.div`
	margin-bottom: 25px;
`;

const CardDescription = styled.p`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 5;
	overflow: hidden;
`;

const ButtonContainer = styled.div`
	flex-grow: 1;
	display: flex;
`;

const JoinButton = styled.button`
	background: rgb(0, 65, 113);
	border: none;
	border-radius: 18px;
	color: white;
	padding: 15px 25px;
	margin-right: 20px;
	align-self: flex-end;
`;

const MoreDetailsButton = styled.button`
	background: rgb(242, 211, 211);
	border: none;
	border-radius: 18px;
	color: black;
	padding: 15px 25px;
	align-self: flex-end;
`;

const LoginCardContainer = styled.div`
	background-color: rgba(199, 216, 237, 0.5);
	min-height: 150px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 18px;
	text-align: center;
	padding: 15px;
`;

export const EventCardFront = (props) => {
	const [isCardFlipped, setIsCardFlipped] = useState(false);
	const handleRedirect = () => {
		if (props.isAuthenticated && props.data.private_url) {
			window.open(`${props.data.private_url}`);
		} else {
			window.open(`${props.data.public_url}`);
		}
	};
	const formatTime = (start_time, end_time) => {
		const start = new Date(start_time).toLocaleString('en-US', {
			timeZone: 'EST',
		});
		const end = new Date(end_time).toLocaleTimeString('en-US', {
			timeZone: 'EST',
		});
		return start + '-' + end;
	};
	return (
		<CardContainer>
			{isCardFlipped ? (
				<EventCardBack data={props.data} setIsCardFlipped={setIsCardFlipped} />
			) : (
				<>
					<CardTitle>{props.data.name}</CardTitle>
					<EventTime>
						{formatTime(props.data.start_time, props.data.end_time)}
					</EventTime>
					{props.hideDetails ? (
						<LoginCardContainer>
							<Link to={'/login'}>
								Login to see more details {<BsArrowRight />}
							</Link>
						</LoginCardContainer>
					) : (
						<>
							<CardBody>
								<CardDescription>{props.data.description}</CardDescription>
							</CardBody>
							<ButtonContainer>
								<JoinButton onClick={() => handleRedirect()}>
									Take me there!
								</JoinButton>
								<MoreDetailsButton
									onClick={() => {
										setIsCardFlipped(true);
									}}
								>
									More Details
								</MoreDetailsButton>
							</ButtonContainer>
						</>
					)}
				</>
			)}
		</CardContainer>
	);
};
