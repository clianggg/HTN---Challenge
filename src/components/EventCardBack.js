import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';

const SpeakersTitle = styled.h5`
	margin: 0;
`;

const SpeakersContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProfilePic = styled.img`
	height: 100px;
	width: 100px;
	margin-bottom: 15px;
	margin-top: 15px;
	border-radius: 100%;
`;

const ButtonContainer = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
`;

const BackButton = styled.button`
	background: rgb(242, 211, 211);
	border: none;
	border-radius: 18px;
	color: black;
	padding: 15px 25px;
	width: 120px;
	align-self: flex-end;
`;

export const EventCardBack = (props) => {
	return (
		<>
			<h5>Details:</h5>
			<p>{props.data.description}</p>
			{props.data.speakers.length === 0 ? null : (
				<SpeakersTitle>Speakers:</SpeakersTitle>
			)}
			<div>
				{props.data.speakers.map((speaker) => (
					<SpeakersContainer>
						{speaker.profile_pic ? (
							<ProfilePic src={`${speaker.profile_pic}`} />
						) : null}
						<p>{speaker.name}</p>
					</SpeakersContainer>
				))}
			</div>
			<ButtonContainer>
				<BackButton
					onClick={() => {
						props.setIsCardFlipped(false);
					}}
				>
					{<BsArrowLeft />}
				</BackButton>
			</ButtonContainer>
		</>
	);
};
