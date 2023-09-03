// libs
import React from 'react'
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import "./style.css"

// constants
import { IMAGES } from '../../../shared/Images';
import { STRINGS_DATA } from '../../../shared/Constants';

const CommonUploadButton = ({
	id, 
	name,
	imageUrl,
	onChange = () => {},
	handleView = () => {},
	handleDelete = () => {},
}) => {
	return (
    <>
		<p>Please upload your profile photo</p>
		<div className="d-flex justify-content-start align-items-center upload-class">
			
			{imageUrl ? (
				<div className="d-flex justify-content-between align-items-center action-upload">
					<img className='image-design' src={imageUrl} alt="" />
					<span className='px-3'
						onClick={handleDelete}
					><FontAwesomeIcon icon={faClose} /></span>
				</div>
			): (
				<label  
					className="form-label upload_file mb-0 cursor-pointer" 
					htmlFor={id}
					onChange={onChange}
				> 
					<img src={IMAGES.uploadPNG} alt="" /> {STRINGS_DATA.UPLOAD_FILE}
					<input className='form-control' hidden name={name} type="file" id={id} />
				</label>
			)}
		</div>
    </>
  )
}

export default CommonUploadButton