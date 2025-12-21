import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";

export const useEvents = () => {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });
};
