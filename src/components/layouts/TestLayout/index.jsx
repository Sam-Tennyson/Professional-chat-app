import { faChildren } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const TestLayout = ({ children }) => {
	return (
		<div className="container side-button">
			<div className='d-flex '>
				<button className='my-btn'>LOGIN
				</button>
				<button className='my-btn'>
					signup
				</button>
			</div>
		</div>
	)

}

export default TestLayout