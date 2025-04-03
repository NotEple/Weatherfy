import { motion } from "framer-motion";
import { ReactNode } from "react";

export const AnimateEntry = ({
  children,
  index,
}: {
  children: ReactNode;
  index?: number;
}): JSX.Element => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        index
          ? {
              duration: 1.5,
              delay: 0.1 * index,
            }
          : null
      }
    >
      {children}
    </motion.div>
  );
};
