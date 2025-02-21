interface StepComponentProps {
    onNext: () => void
  }
export const MapCandidates = ({ onNext }: StepComponentProps) => (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Map Candidates</h2>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Select Candidates</label>
          <select className="border rounded-md p-2">
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Bob Johnson</option>
          </select>
        </div>
        <button onClick={onNext} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
          Next Step
        </button>
      </div>
    </div>
  )