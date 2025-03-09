import { PortableTextBlock } from "@portabletext/types";
import PortableText from "./PortableText";

interface CalloutProps {
  value: {
    content: PortableTextBlock[];
  };
}

export default function Callout({ value }: CalloutProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-12 my-16 callout">
      <PortableText value={value.content} />
    </div>
  );
}
