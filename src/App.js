import { useState } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
		<div>
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<Home
								isAuthenticated={isAuthenticated}
								setIsAuthenticated={setIsAuthenticated}
							/>
						}
					/>
					<Route
						path='/login'
						element={<Login setIsAuthenticated={setIsAuthenticated} />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
