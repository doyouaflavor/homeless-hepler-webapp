function matchEvent(e0, e1) {
  return (
    e0.year() === e1.year() &&
    e0.month() === e1.month() &&
    e0.date() === e1.date()
  );
}

export {
  matchEvent,
}
