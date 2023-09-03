// libs
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

// style
import "./style.css"

const CommonSearch = (props) => {

    const { handleSearch, handleKey, onChange, search, placeholder } = props

    return (
        <>
            <div className="input-group">
                <input
                    value={search}
                    onChange={onChange}
                    onKeyDown={handleKey}
                    type="text"
                    className="form-control border "
                    placeholder={placeholder || "Search..."}
                />
                <div className="input-group-prepend margin-search"
                    onClick={handleSearch}
                >
                    <span className="input-group-text"><i className="fa fa-search"><FontAwesomeIcon icon={faSearch} /></i></span>
                </div>
            </div>
        </>
    )
}

export default CommonSearch