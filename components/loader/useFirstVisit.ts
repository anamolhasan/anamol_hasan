"use client";
import { useEffect, useState } from "react";

export function useFirstVisit() {
  const [state, setState] = useState({ isFirstVisit: false, checked: false });

  useEffect(() => {
    const visited = sessionStorage.getItem("has_visited");
    const isFirst = !visited;
    if (isFirst) sessionStorage.setItem("has_visited", "true");

    // sessionStorage (external system) এর সাথে sync করছি, এটাই effect এর সঠিক ব্যবহার
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ isFirstVisit: isFirst, checked: true });
  }, []);

  return state;
}