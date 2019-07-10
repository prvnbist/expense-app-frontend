import React from 'react'

const ModalMain = ({children}) => <main>{children}</main>;
const ModalFooter = ({children}) => <footer>{children}</footer>;

class Modal extends React.Component {
    static Main = ModalMain;
    static Footer = ModalFooter;
    render() {
        return (
            <div className="modal__bg">
                <div className="modal__card">
                    <header>
                        <span className="modal__title">{this.props.title}</span>
                        <i className="material-icons" onClick={() => this.props.closeModal(false)}>close</i>
                    </header>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;