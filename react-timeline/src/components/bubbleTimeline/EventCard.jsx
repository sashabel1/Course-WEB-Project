const EventCard = ({ event, onClick, borderColor }) => {
  const date = [event.Month, event.Year]
    .filter((val) => val && !["Unknown"].includes(val))
    .join(" ");

  return (
    <div
      className="min-w-[200px] border-2 rounded-xl p-4 bg-white cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl flex-shrink-0"
      style={{ borderColor }}
      onClick={onClick}
    >
      <div className="font-bold mb-2 text-[#555]">{date}</div>
      <div className="text-lg font-semibold text-[#371f1f]">
        {event["Name of Incident"]}
      </div>
    </div>
  );
};

export default EventCard;
