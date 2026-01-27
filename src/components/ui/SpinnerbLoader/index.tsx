import React from "react";
import s from "./SpinnerbLoader.module.css";
import cn from "clsx";
import { Container } from "lucide-react";

const SpinnerbLoader = ({ className }: any) => {
  return (
    <div className={cn(s.loaderWrapper, className)}>
      <div className={s.containerIcon}>
        <Container size={48} strokeWidth={1.5} className={s.icon} />
        <div className={s.progressLine}></div>
      </div>
      <div className={s.loadingText}>Loading Prime Containers...</div>
    </div>
  );
};

export default SpinnerbLoader;
