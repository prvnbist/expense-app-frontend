import React from "react";

const RadioGroup = props => {
	const [checkedOption, setcheckedOption] = React.useState("");
	return (
		<div className="radio__group__component">
			{props.options.map((option, index) => (
				<div className="radio__option" key={index}>
					<input
						type="radio"
						id={option.value}
						name={props.name}
						value={option.value}
						checked={checkedOption === option.value}
						onChange={e => {
                            setcheckedOption(e.target.value);
                            props.selected(e.target.value);
                        }}
						onClick={() =>
							checkedOption === option.value
								? setcheckedOption("")
								: null
						}
					/>
					<label htmlFor={option.value}>{option.text}</label>
				</div>
			))}
		</div>
	);
};

export default RadioGroup;