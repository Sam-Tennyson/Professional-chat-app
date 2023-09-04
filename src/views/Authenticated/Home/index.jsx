// libs
import React, { useEffect, useRef, useState } from 'react'

// components
import Sidebar from '../../../components/cellls/Sidebar'
import ChatHeader from '../../../components/cellls/ChatHeader'
import ChatHistory from '../../../components/cellls/ChatHistory'
import ChatMessage from '../../../components/cellls/ChatMessage'
import { IMAGES } from '../../../shared/Images'

// styles
import "./style.css"
import Profile from '../Profile'

const Home = () => {
	const scroll = useRef();


	const [selectedUser, setSelectedUser] = useState("");
	const [profileClick, setProfileClick] = useState(false);

	console.log(selectedUser, "-",profileClick);
	return (
		<>
			<div className="row clearfix position-relative my-2">
				<div className="col-lg-12">
					<div className="card chat-app ">
						<div id="plist" className={`people-list ${selectedUser || profileClick ? "d-none d-sm-block": ""}`}>
							<Sidebar
								setSelectedUser={setSelectedUser}
								setProfileClick={setProfileClick}
							/>
						</div>
						{selectedUser  ? (
							<div className="chat">
								<div className="chat-header clearfix">
									<ChatHeader
										selectedUser={selectedUser}
										setSelectedUser={setSelectedUser}
									/>
								</div>
								<div className="chat-history chat-container " 
									id={"chat-history"}>
									<ChatHistory />
								</div>
								<div className="chat-message clearfix p-2">
									<ChatMessage scroll={scroll} />
								</div>
							</div>

						) : (
							<div className="chat">
								<div className={`chat-history   ${!profileClick  ? "chat-container d-flex justify-content-center align-items-center": ""}`}>
									{profileClick ? (
										<Profile 
											setProfileClick={setProfileClick}
											setSelectedUser={setSelectedUser}
										/>
									): (

										<img src={IMAGES?.chatSvg} alt="chat_svg" />
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Home