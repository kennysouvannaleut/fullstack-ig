import React, { useState } from 'react'

const SetBio = props => {
    const {addBio, prevBio, handleToggle} = props

    const [bioInput, setBioInput] = useState(prevBio)

    const handleBioChange = e => {
        const {value} = e.target
        setBioInput(value)
    }

    const handleBioSubmit = e => {
        e.preventDefault()
        addBio(bioInput);
        handleToggle && handleToggle('bio')
    }

    return (
        <form onSubmit={handleBioSubmit}>
            <div>
                <textarea value={bioInput} placeholder='About me' onChange={handleBioChange}></textarea>
            </div>
            <button>Set bio!</button>
        </form>
    )
}

export default SetBio