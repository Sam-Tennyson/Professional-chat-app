// libs
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCogs } from '@fortawesome/free-solid-svg-icons';

// constants
import { RESPONSIVE, STRINGS_DATA } from '../../../shared/Constants';
import { IMAGES } from '../../../shared/Images';

const ChatHeader = (props) => {
    let {selectedUser,setSelectedUser} = props
      

    const [isMobile, setIsMobile] = useState(false)
    const handleWindowDimensions = () => {
		if (window.innerWidth <= RESPONSIVE.BREAKPOINT_MOBILE.MAX_WIDTH) {
			setIsMobile(true)
            return;
		}
        setIsMobile(false)
	}

	useEffect(() => {
		handleWindowDimensions()
	}, [])

    return (
        <>
            {selectedUser ? (
                <>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="profile-header d-flex justify-content-start align-items-center">
                        <img 
                            src={selectedUser?.photoURL || IMAGES.userIcon} 
                            alt="avatar" 
                        />
                        
                        <div className="chat-about ms-3">
                            <h6 className="m-b-0">{selectedUser?.displayName}</h6>
                            {/* <small>Last seen: 2 hours ago</small> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end text-right">
                        {/* <a className="btn btn-outline-info mx-2"><i className="fa fa-cogs"><FontAwesomeIcon icon={faCogs} /></i></a> */}

                        <a className={`my-btn-outline-danger ${isMobile ? "": "d-none"} `} id="back-button"
                            onClick={() => setSelectedUser(STRINGS_DATA.EMPTY_STRING)}
                        ><i className="fa fa-cogs" > 
                            <FontAwesomeIcon icon={faClose} />
                        </i></a>
                    </div>

                </div>
                </>
            ): null}
        </>
    )
}

export default ChatHeader