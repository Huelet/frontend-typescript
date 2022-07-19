import styles from "../styles/components/Pill.module.css";

export interface PillProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "transparent";
  className?: string;
}

export const Pill = ({ children, className, type }: PillProps) => {
  return (
    <div
      className={`${styles.pill} ${
        type === "primary"
          ? styles.primary
          : "" || type === "secondary"
          ? styles.secondary
          : "" || type === "transparent"
          ? styles.transparent
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
