import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventCardFront } from './EventCardFront';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

const NavContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100vw;
`;

const NavRightContainer = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
`;

const HomePage = styled.div`
	height: 100vh;
	width: 100%;
`;

const LoginButton = styled.button`
	background: rgb(0, 65, 113);
	border: none;
	border-radius: 15px;
	color: white;
	padding: 10px 25px;
	margin-right: 30px;
`;

export const Home = (props) => {
	const navigate = useNavigate();
	const [eventData, setEventData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const handleAuthentication = () => {
		if (!props.isAuthenticated) {
			navigate('/login');
		} else {
			props.setIsAuthenticated(false);
		}
	};
	useEffect(() => {
		fetch('https://api.hackthenorth.com/v3/events')
			.then((response) => response.json())
			.then((data) => {
				setEventData(data);
				eventData.sort((a, b) => {
					return a.start_time - b.start_time;
				});
				setFilteredData(data);
			});
	}, []);
	return (
		<HomePage>
			<Navbar bg='light' sticky='top'>
				<NavContainer>
					<NavDropdown title='Filter by event'>
						<NavDropdown.Item
							onClick={() => {
								setFilteredData(
									eventData.filter((event) => {
										return event.event_type === 'workshop';
									})
								);
							}}
						>
							Workshop
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								setFilteredData(
									eventData.filter((event) => {
										return event.event_type === 'activity';
									})
								);
							}}
						>
							Activity
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								setFilteredData(
									eventData.filter((event) => {
										return event.event_type === 'tech_talk';
									})
								);
							}}
						>
							Tech Talk
						</NavDropdown.Item>
						<NavDropdown.Item
							onClick={() => {
								setFilteredData(eventData);
							}}
						>
							All events
						</NavDropdown.Item>
					</NavDropdown>
					<NavRightContainer>
						<LoginButton onClick={() => handleAuthentication()}>
							{props.isAuthenticated ? 'Logout' : 'Login'}
						</LoginButton>
					</NavRightContainer>
				</NavContainer>
			</Navbar>
			<Container>
				<Row xs={1} md={2} lg={4}>
					{filteredData.map((data) => (
						<EventCardFront
							key={data.id}
							data={data}
							isAuthenticated={props.isAuthenticated}
							hideDetails={
								!props.isAuthenticated && data.permission === 'private'
							}
						/>
					))}
				</Row>
			</Container>
		</HomePage>
	);
};
