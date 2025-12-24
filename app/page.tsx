"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useEvents } from "@/hooks/useEvents";
import DashboardCard from "@/components/DashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { getEventStatus } from "@/lib/event-status";

export default function EventsDashboardPage() {
  const { data, isLoading, error } = useEvents();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  if (isLoading) return <p className="text-white p-10">Loading events...</p>;

  if (error) return <p className="text-red-500 p-10">Failed to load events</p>;

  const total = data!.length;
  const upcoming = data!.filter(
    (e) => getEventStatus(e.startDate, e.endDate) === "UPCOMING"
  ).length;
  const ongoing = data!.filter(
    (e) => getEventStatus(e.startDate, e.endDate) === "ONGOING"
  ).length;
  const completed = data!.filter(
    (e) => getEventStatus(e.startDate, e.endDate) === "COMPLETED"
  ).length;

  /* ---------- Search + Pagination ---------- */
  const filteredEvents = data!.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE);

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Event Management</h1>
        <button
          onClick={() => router.push("/events/create")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          + Create Event
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Events" value={total} />
        <DashboardCard title="Upcoming Events" value={upcoming} />
        <DashboardCard title="Ongoing Events" value={ongoing} />
        <DashboardCard title="Completed Events" value={completed} />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by event or location"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 w-64 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none"
      />

      {/* Events Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="text-left px-6 py-4">Event Name</th>
              <th className="text-left px-6 py-4">Date & Time</th>
              <th className="text-left px-6 py-4">Location</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event) => {
              const status = getEventStatus(
                event.startDate,
                event.endDate
              );

              return (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">
                    {new Date(event.startDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {event.isOnline ? "Online" : event.location}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={status} />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/events/${event.id}/edit`)
                      }
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        if (!confirm("Delete event?")) return;
                        deleteMutation.mutate(event.id);
                      }}
                      className="text-red-400 hover:text-red-300"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-4 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-white/5 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-white/5 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </main>
  );
}
