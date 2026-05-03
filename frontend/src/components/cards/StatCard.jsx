export default function StatCard({ title, value, color }) {
  return (
    <div className="rounded-2xl p-5 shadow-lg text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`
      }}
    >
      <h3 className="text-sm opacity-80">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>

      {/* subtle glow */}
      <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-white opacity-10 rounded-full"></div>
    </div>
  );
}