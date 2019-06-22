import React from "react";

const Tab = props => {
    const onClick = () => {
        const {label, onClick} = props;
        onClick(label);
    };

    let className = "tab-list-item";

    if (props.activeTab === props.label) {
        className += " tab-list-active";
    }
    return (
        <li className={className} onClick={onClick}>
            {props.label}
        </li>
    );
};

const Tabs = props => {
    const [activeTab,
        setActiveTab] = React.useState(props.children[0].props.label);
    const onClickTabItem = tab => {
        setActiveTab(tab);
    };
    return (
        <div className="container-fluid">
            <div className="tabs">
                <div
                    className="container-fluid"
                    style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
                }}>
                    <div className="container">
                        <ol className="tab-list">
                            {props
                                .children
                                .map(child => {
                                    const {label} = child.props;
                                    return (<Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem}/>);
                                })}
                        </ol>
                    </div>

                </div>
                <div className="container">
                    <div className="tab-content">
                        {props
                            .children
                            .map(child => {
                                if (child.props.label !== activeTab) 
                                    return undefined;
                                return child.props.children;
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
