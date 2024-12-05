import React from 'react';
import '../styles/change-unit-button.css';

function ChangeUnitButton({onButtonClicked} : {onButtonClicked: (e: React.MouseEvent) => void}) {
    return(
        <button
            className='unit-change-btn'
            onClick={onButtonClicked}
        >
            Change Unit
        </button>
    );
}

export default ChangeUnitButton;