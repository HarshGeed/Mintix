import { EventStatus } from "@/types/event";

export const getEventStatus = (
    startDate: string | Date, 
    endDate: string | Date
) : EventStatus => {
    const now = new Date();
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);

    if(now < start) return "UPCOMING";
    if(now >= start && now <= end) return "ONGOING"
    return "COMPLETED"
}