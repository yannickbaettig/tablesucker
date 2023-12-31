

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl xl:text-4xl font-bold">{children}</h1>
  );
}
