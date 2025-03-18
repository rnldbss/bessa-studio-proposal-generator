interface ProposalHeaderProps {
  proposalDate: string;
}

export default function Header({ proposalDate }: ProposalHeaderProps) {
  return (
    <div className="flex justify-between items-center px-1">
      <span className="font-cal text-xl leading-0">Bessa Studio</span>
      <span className="text-xs">{proposalDate || "Feb, 2025"}</span>
    </div>
  );
}
