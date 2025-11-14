import React, { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
    open: boolean;
    className?: string;
    title?: React.ReactElement | string;
    closeModal: () => void;
}

function Modal({ children, open, className, title, closeModal }: PropsWithChildren<IModalProps>) {
    const baseClass = 'modal';

    return (
        <div className={`${baseClass} ${open && 'active'}`}>
            <div className="modal__overlay">
                <div className="modal__wrapper">
                    <div className="modal__title">{title}</div>

                    <div className={`modal__body ${className}`}>
                        {children}
                    </div>

                    <div className="modal__close" onClick={closeModal}>&#x2715;</div>
                </div>
            </div>
        </div>
    );
}

function PortalledModal(props: PropsWithChildren<IModalProps>) {
    return createPortal(<Modal {...props} />, document.body);
}

export default PortalledModal;