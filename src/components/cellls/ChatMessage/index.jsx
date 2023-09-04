// libs
import { useSelector } from 'react-redux';
import React, { useState } from 'react'
import { v4 as uuid } from "uuid";
import debounce from 'lodash.debounce';


// firebase
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';

// collections
import { COLLECTIONS, STRINGS_DATA } from '../../../shared/Constants';
import ReactEmoji from '../../atoms/ReactEmoji';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faSearch, faSmile } from '@fortawesome/free-solid-svg-icons';

const ChatMessage = ({ scroll }) => {
	const [message, setMessage] = useState("");

	const chat_Id_Red = useSelector((state) => state?.auth?.chat_id)
	const sender_Id_Red = useSelector((state) => state?.auth?.sender_id)
	const receiver_Id_Red = useSelector((state) => state?.auth?.receiver_id)

	const [toggleEmoji, setToggleEmoji] = useState(false)

	const debouncedSendMessage = debounce((event) => {
		event.preventDefault();
		// Your existing sendMessage logic here
		// This function will be called after a delay once the last click event occurs
		// Make sure to pass the event object if needed
		sendMessage()
	  }, 500);


	const sendMessage = async (event) => {
		// event.preventDefault();
		let message_data =  message?.trim()
		setMessage(STRINGS_DATA.EMPTY_STRING)
		if (message_data === "") {
			alert("Enter valid message");
			return;
		}

		await updateDoc(doc(db, COLLECTIONS.CONVERSATIONS, chat_Id_Red), {
			messages: arrayUnion({
				id: uuid(),
				content: message_data,
				senderId: sender_Id_Red,
				date: Timestamp.now(),
			}),
		});


		await updateDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, sender_Id_Red), {
			[chat_Id_Red + ".lastMessage"]: {
				content: message_data,

			},
			[chat_Id_Red + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, receiver_Id_Red), {
			[chat_Id_Red + ".lastMessage"]: {
				content: message_data,
			},
			[chat_Id_Red + ".date"]: serverTimestamp(),
		});


		setMessage("");
	};
	return (
		<>
			<div className="input-group mb-0">
				<input 
					type="text" 
					value={message}
					onChange={(e) => setMessage(e.target.value)} 
					className="form-control border" 
					placeholder="Enter text here..." 
				/>
				{toggleEmoji ? (
					<>
						<i className="fa fa-cogs" 
							onClick={() => setToggleEmoji((prev) => !prev)}
						> 
                            <FontAwesomeIcon icon={faKeyboard} />
                        </i>
					</>
				) :(
					<i className="fa fa-cogs" 
						onClick={() => setToggleEmoji((prev) => !prev)}
					> 
						<FontAwesomeIcon icon={faSmile} />
					</i>
				)}
				<div className="input-group-prepend margin-search cursor-pointer" onClick={debouncedSendMessage}>
					<span className="input-group-text">Send</span>
				</div>
			</div>
				{toggleEmoji &&<ReactEmoji 
					onEmojiClick={(e) => {
						console.log(e)
						setMessage((prev) => prev + e?.emoji)
					}}
				/>}
		</>
	)
}

export default ChatMessage