import React from 'react'

const Select = props => {
	const [visibility, setVisibility] = React.useState(false);
	const [selectedOption, setSelectedOption] = React.useState("");
	const [search, setSearch] = React.useState("");
	return (
		<div
			className="select__component"
			onClick={e => {
				setVisibility(!visibility);
				setSearch("");
				e.currentTarget.children[0].children[1].innerHTML = visibility
					? "arrow_drop_down"
					: "arrow_drop_up";
			}}
		>
			<div className="selected-option">
				<span
					title={
						selectedOption === ""
							? props.category
							: selectedOption
					}
					style={{color: selectedOption === "" ? "#A9A0A0" : "#0066DC"}}
				>
					{selectedOption === ""
						? props.placeholder
						: selectedOption.length <= 20
						? selectedOption
						: `${selectedOption.slice(0, 20)}...`}
				</span>
				<i className="material-icons">arrow_drop_down</i>
			</div>
			{visibility && (
				<div className="options">
					<div className="search-options">
						<input
							type="text"
							placeholder={`Search and ${props.placeholder}`}
							defaultValue={search}
							onClick={e => e.stopPropagation()}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<ul>
						<li
							data-value="default"
							onClick={() => setSelectedOption("")}
						>
							{props.placeholder}
						</li>
						{props.options
							.filter(option =>
								option
									.toLowerCase()
									.includes(search.toLowerCase())
							)
							.map((option, index) => (
								<li
									key={index}
									className={
										selectedOption === option
											? "active-option"
											: null
									}
									onClick={() => {
										setSelectedOption(option);
										props.selected(option);
									}}
								>
									{option}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Select;