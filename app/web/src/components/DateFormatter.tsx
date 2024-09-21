import React from "react";

interface DateFormatterProps {
  date: Date | number;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date }) => {
  const formatDate = (inputDate: Date | number): string => {
    const dateObject =
      inputDate instanceof Date ? inputDate : new Date(inputDate);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dateObject);
  };

  return <span>{formatDate(date)}</span>;
};

export default DateFormatter;
