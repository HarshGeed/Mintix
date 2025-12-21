import { EventStatus } from "@/types/event";

export const getEventStatus = (
    startDate: string, 
    endDate: string
) : EventStatus => {
    const now = new Date();
    const start = new Date(startDate)
    const end = new Date(endDate)

    if(now < start) return "UPCOMING";
    if(now >= start && now <= end) return "ONGOING"
    return "COMPLETED"
}