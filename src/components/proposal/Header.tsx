interface ProposalHeaderProps {
  proposalDate: string;
}

export default function Header({ proposalDate }: ProposalHeaderProps) {
  return (
    <div className="flex justify-between">
      <span>Bessa Studio</span>
      <span>{proposalDate || "Feb. 2025"}</span>
    </div>
  );
}
