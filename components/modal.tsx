import { ReactNode, useState } from "react";
import { Close } from "@fdn-ui/icons-react";
import styles from "../styles/components/Modal.module.css";

export interface ModalProps {
  children: ReactNode;
  trigger: ReactNode;
  modalType: "fullscreen" | "toast";
  closeAllowed?: boolean;
  light?: boolean;
  classNames?: string;
}

export const Modal = ({
  children,
  trigger,
  modalType,
  closeAllowed,
  light,
  classNames,
}: ModalProps) => {
  const [modalOpen, setOpen] = useState(false);
  return (
    <>
      <div className={`${styles.modalTrigger}`} onClick={() => setOpen(true)}>
        {trigger}
      </div>
      <div
        className={`${styles.modalBg} ${modalOpen ? null : styles.modalHidden}`}
      >
        <div
          className={`${
            light ? styles.modalLight : styles.modalDark
          } ${classNames}`}
        >
          <div className={styles.modalClose}>
            {closeAllowed ? null : (
              <div
                className={styles.modalCloseIcon}
                onClick={() => setOpen(false)}
              >
                <Close fill={"white"} />
              </div>
            )}
          </div>
          <div className={`${styles.modalContent}`}>{children}</div>
        </div>
      </div>
    </>
  );
};
