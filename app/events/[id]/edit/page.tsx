"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import EventForm from "@/components/EventForm";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["event", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/events/${params.id}`);
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => router.push("/"),
  });

  if (!data) return null;

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="text-xl font-semibold mb-6">Edit Event</h1>
      <EventForm
        initialData={data}
        onSubmit={(d) => mutation.mutate(d)}
      />
    </div>
  );
}
