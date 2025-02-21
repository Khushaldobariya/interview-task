interface StepComponentProps {
    onNext: () => void
  }
export const SendInterviewLetter = ({ onNext }: StepComponentProps) => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Send Interview Letter</h2>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Letter Template</label>
          <textarea className="border rounded-md p-2 h-32" placeholder="Enter letter content..." />
        </div>
        <button onClick={onNext} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
          Next Step
        </button>
      </div>
    </div>
  )