interface RowProps {
  children: React.ReactNode;
}

export default function Row({ children }: RowProps) {
  return (
    <div className={`grid grid-cols-[40px_210mm_40px] relative group/row`}>
      {children}
    </div>
  );
}
