"use client";
import dayjs, { Dayjs } from "dayjs";
import { createContext, useEffect, useState } from "react";

interface DashboardContextType {
  period: { from: Dayjs; to: Dayjs };
  setPeriod: React.Dispatch<React.SetStateAction<{ from: Dayjs; to: Dayjs }>>;
}
export const DashboardContext = createContext<DashboardContextType | null>(
  null
);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}: DashboardProviderProps) => {
  const [period, setPeriod] = useState<{ from: Dayjs; to: Dayjs }>({
    from: dayjs().subtract(1, "month").startOf("M"),
    to: dayjs(),
  });
  useEffect(() => {
    if (period) console.log("period", period);
  }, [period]);

  return (
    <DashboardContext.Provider value={{ period, setPeriod }}>
      {children}
    </DashboardContext.Provider>
  );
};
