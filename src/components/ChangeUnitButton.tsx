import React from 'react';
import '../styles/change-unit-button.css';

function ChangeUnitButton({onUnitChange} : {onUnitChange: (e: React.MouseEvent) => void}) {
    return(
        <button
            className='unit-change-btn'
            onClick={onUnitChange}
        >
            Change Unit
        </button>
    );
}

export default ChangeUnitButton;