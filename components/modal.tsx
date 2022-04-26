import type { ReactChildren, ReactNode } from "react";
import styles from "../styles/Modal.module.css"; 

export interface ModalProps {
  contents: ReactNode;
  trigger: ReactChildren;
  modalType: "fullscreen" | "toast";
  closeAllowed?: boolean;
  light?: boolean;
  className?: string;
}

export const Modal = ({ contents, type, closeAllowed, light, className }: ModalProps) => {
  return (
    <div className={`${styles.modalBg}`}>
      <div className={`${light ? styles.modalLight : styles.modalDark}`}>
      {contents}
      </div>
    </div>
  )
}