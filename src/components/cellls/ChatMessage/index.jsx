// libs
import { useSelector } from 'react-redux';
import React, { useState } from 'react'
import { v4 as uuid } from "uuid";

// firebase
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase';

// collections
import { COLLECTIONS } from '../../../shared/Constants';

const ChatMessage = ({ scroll }) => {
	const [message, setMessage] = useState("");

	const chat_Id_Red = useSelector((state) => state?.auth?.chat_id)
	const sender_Id_Red = useSelector((state) => state?.auth?.sender_id)
	const receiver_Id_Red = useSelector((state) => state?.auth?.receiver_id)

	const sendMessage = async (event) => {
		event.preventDefault();
		if (message.trim() === "") {
			alert("Enter valid message");
			return;
		}

		await updateDoc(doc(db, COLLECTIONS.CONVERSATIONS, chat_Id_Red), {
			messages: arrayUnion({
				id: uuid(),
				content: message,
				senderId: sender_Id_Red,
				date: Timestamp.now(),
			}),
		});


		await updateDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, sender_Id_Red), {
			[chat_Id_Red + ".lastMessage"]: {
				content: message,

			},
			[chat_Id_Red + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, receiver_Id_Red), {
			[chat_Id_Red + ".lastMessage"]: {
				content: message,
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
				<div className="input-group-prepend margin-search" onClick={sendMessage}>
					<span className="input-group-text">Send</span>
				</div>
			</div>
		</>
	)
}

export default ChatMessage