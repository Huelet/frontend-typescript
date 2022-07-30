import * as React from "react";
import { Add, WarningFilled } from "@fdn-ui/icons-react";
import { Alert } from "@mantine/core";
import styles from "../../styles/components/Buttons/Follow.module.css";

export interface FollowProps {
	chonky?: boolean;
}

export const Follow = ({ chonky }: FollowProps) => {
	return (
		<>
			<div className={styles.buttonContainer}>
				<Add fill={"white"} />
				<p className={styles.buttonText}>Follow</p>
			</div>
		</>
	);
};
