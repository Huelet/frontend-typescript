import styles from "../styles/components/Card.module.css";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  chonky?: boolean;
  full?: boolean;
  cursor?: boolean;
  padding?: number;
}

export const Card = ({
  children,
  title,
  subtitle,
  className,
  chonky,
  full,
  cursor,
  padding,
}: CardProps) => {
  return (
    <div className={`${full ? "main-si" : ""} ${cursor ? "cursor" : ""}`}>
      <div className={`${styles.cardOuter} ${className}`}>
        <div
          className={`${styles.cardInner}`}
          style={{ padding: `${padding ? padding : "7em"}` }}
        >
          {title ? (
            <>
              <div className={`mainText`}>
                <h2 className={styles.mainText}>{title}</h2>
                {subtitle ? (
                  <h3 className={styles.subText}>{subtitle}</h3>
                ) : null}
              </div>
              <div className={styles.divider}></div>
            </>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};
