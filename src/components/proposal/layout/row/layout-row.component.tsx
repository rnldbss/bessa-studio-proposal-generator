import type { RowData } from "./layout-row.model";

export default function LayoutRow({ children }: RowData) {
  return (
    <div className={`grid grid-cols-[40px_210mm_40px] relative group/row`}>
      {children}
    </div>
  );
}
