export function Availability({ isCheckedOut }: { isCheckedOut: boolean }) {
  return (
    <span
      className={`${
        isCheckedOut ? "bg-red-400" : "bg-green-400"
      } px-2 py-1 rounded-full`}
    >
      {isCheckedOut ? "Checked Out" : "Available"}
    </span>
  )
}
