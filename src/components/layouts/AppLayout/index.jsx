import Gossip from "../Gossip"
import "./style.css"

const AppLayout = ({ children }) => {
	return (
		<>
			<div className="container layout-class">
				<Gossip />
				{children}
			</div>
		</>
	)
}

export default AppLayout