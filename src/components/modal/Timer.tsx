import { useEffect, useState, useMemo, FC } from "react";
import { Box, Typography } from "@mui/material";

const less = (time: number) => {
  return time < 10 ? `0${time}` : time;
};

interface Props {
  dateOpened: string;
  dateClosed: string;
}

export const TimeDetails: FC<Props> = ({ dateOpened, dateClosed }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [datetime, setDatetime] = useState<string>("");

  const date: Date | undefined = useMemo(
    () => (dateOpened ? new Date(dateOpened) : undefined),
    [dateOpened]
  );
  const dateClose: Date | undefined = useMemo(
    () => (dateClosed ? new Date(dateClosed) : undefined),
    [dateClosed]
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const activeTimeClosed =
      (dateClose ? dateClose.getTime() : 0) - (date ? date.getTime() : 0);
    const secondsClosed = Math.floor(activeTimeClosed / 1000) % 60;
    const minutesClosed = Math.floor(activeTimeClosed / 60000);
    const hoursClosed = Math.floor(minutesClosed / 60);
    const activeTimeClosedText = `${less(hoursClosed)}:${less(
      minutesClosed % 60
    )}:${less(secondsClosed)}`;

    setDatetime(activeTimeClosedText);
  }, [dateClose, currentDate, date]);

  return (
    <Box>
      <Typography variant="caption">{datetime}</Typography>
    </Box>
  );
};
