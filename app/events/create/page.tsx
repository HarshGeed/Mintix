"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Event</h1>
            <p className="text-gray-400">Fill in the details below to create a new event</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl">
            <EventForm
              onSubmit={(data) => mutation.mutate(data)}
              isLoading={mutation.isPending}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
