"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const ClientDate = ({ localizeDate }: any): JSX.Element => {
  const [localDate, setLocalDate] = useState(localizeDate);
  useEffect(() => setLocalDate(localizeDate), []);
  return <>{dayjs(localDate).format("MMM D, YYYY h:mm A")}</>;
};

export default ClientDate;
