import { ComponentProps, ReactNode } from "react";

type SectionProps = ComponentProps<"section"> & {
  children: ReactNode;
};

export default function Section({ children, ...props }: SectionProps) {
  return (
    <section {...props}>
      <div className="pt-20 ms:pt-32 pb-24 max-w-6xl mx-auto  text-gray-50">{children}</div>
    </section>
  );
}
