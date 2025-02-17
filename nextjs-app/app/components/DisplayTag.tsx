interface DisplayTagProps {
  label: string;
  value: string;
}

export default function DisplayTag({ label, value }: DisplayTagProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-gray-500 tracking-tighter w-fit">
        {label}
      </span>
      <span className="bg-gray-100 px-2 py-0.5 rounded-full">{value}</span>
    </div>
  );
}
