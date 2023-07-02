import React from 'react';

const Slider = ({ speed, onSpeedChange }) => {
	const handleChange = e => onSpeedChange(e.target.value);

	return (
		<input
			type='range'
			min='10'
			max='1000'
			step='10'
			value={speed}
			onChange={handleChange}
		/>
	);
};

export default Slider;