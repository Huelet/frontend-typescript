import type { Dispatch, SetStateAction, ReactNode } from "react";
import { Bold, Italic, Underline, BulletList } from "@fdn-ui/icons-react";
import styles from "../styles/components/Editor.module.css";

export interface EditorProps {
  value: string;
  update: Dispatch<SetStateAction<string>>; // yikes
  gfm?: boolean;
  style?: "light" | "dark";
  editable?: boolean;
  children?: ReactNode;
  classNames?: string;
}

export const Editor = ({
  value,
  update,
  gfm,
  style,
  editable,
  children,
  classNames,
}: EditorProps) => {
  const changeContent = (e: any) => {
    update(e.target.value);
  };
  return (
    <>
      <div className={styles.editor}>
        <div className={`${styles.editor__content} ${classNames}`}>
          <div className={styles.editor__contentOptions}>
            <div className={styles.editor__contentOptionsItem}>
              <Bold fill={"white"} />
            </div>
            <div className={styles.editor__contentOptionsItem}>
              <Italic fill={"white"} />
            </div>
            <div className={styles.editor__contentOptionsItem}>
              <BulletList fill={"white"} />
            </div>
          </div>
          <div className={styles.editor__contentBody}>
            <input
              contentEditable={true}
              onChange={changeContent}
              className={styles.editor__contentBodyEditor}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
