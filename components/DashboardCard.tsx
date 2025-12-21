import { motion } from "framer-motion";

export default function DashboardCard({ title, value }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-white/5 p-5 border border-white/10"
    >
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl mt-2">{value}</h2>
    </motion.div>
  );
}
