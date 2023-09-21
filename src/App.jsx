// libs
import { PersistGate } from "redux-persist/integration/react";
import React, { useEffect, useState } from "react";
import RootRouter from "./routes/RootRouter";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

// constants
import { SnackbarUtilConfig } from "./shared/Snackbar";
import { STRINGS_DATA } from "./shared/Constants";
import { PERSIST_STORE } from "./store";

// components
import Loader from "./components/cellls/Loader";

// styles
import "./App.css";

function App() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	
	const handleMouseMove = (e) => {
		setCursorPosition({ x: e.x, y: e.y });
	};

	useEffect(() => {
		let get_Root_Div = document.querySelector("body");
		get_Root_Div.addEventListener("mousemove", handleMouseMove);
		return () => {
			get_Root_Div.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>

			<Provider store={PERSIST_STORE.store}>
			<Loader />
				<SnackbarProvider
					anchorOrigin={{
						vertical: STRINGS_DATA.TOP,
						horizontal: STRINGS_DATA.CENTER,
					}}
					maxSnack={3}
				>
					<PersistGate persistor={PERSIST_STORE.persistor}>
						<SnackbarUtilConfig />
						<RootRouter />
					</PersistGate>
				</SnackbarProvider>
			</Provider>
		</>
	);
}

export default App;
