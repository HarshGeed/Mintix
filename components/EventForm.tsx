"use client";

import { useState } from "react";

type EventFormData = {
  title: string;
  description: string;
  location?: string;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  capacity?: number;
  price?: string;
};

type Props = {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  isLoading?: boolean;
};

export default function EventForm({
  initialData,
  onSubmit,
  isLoading,
}: Props) {
  const [form, setForm] = useState<EventFormData>(
    initialData ?? {
      title: "",
      description: "",
      location: "",
      isOnline: false,
      startDate: "",
      endDate: "",
      capacity: undefined,
      price: "",
    }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        className="input"
        placeholder="Event title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />

      <input
        className="input"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.isOnline}
          onChange={(e) => setForm({ ...form, isOnline: e.target.checked })}
        />
        Online Event
      </label>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="datetime-local"
          className="input"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="input"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          className="input"
          placeholder="Capacity"
          value={form.capacity ?? ""}
          onChange={(e) =>
            setForm({ ...form, capacity: Number(e.target.value) })
          }
        />
        <input
          className="input"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>

      <button
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2"
      >
        {isLoading ? "Saving..." : "Save Event"}
      </button>
    </form>
  );
}
