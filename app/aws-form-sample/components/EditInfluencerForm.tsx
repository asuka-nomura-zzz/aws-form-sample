import { useState } from 'react'
import { Influencer } from '@/app/types/Influencer'

type EditFormProps = {
  influencer: Influencer
  timeslots: any[]
  onSubmit: (updatedData: Influencer) => void
  onClose: () => void
}

const EditInfluencerForm: React.FC<EditFormProps> = ({ influencer, timeslots, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Influencer>(influencer)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Influencer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label>Kana Name</label>
            <input
              type="text"
              name="kana_name"
              value={formData.kana_name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label>Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label>Timeslot</label>
            <select
              name="timeslot"
              value={formData.timeslot}
              onChange={handleChange}
              className="w-full border p-2"
            >
              {timeslots.map((timeslot) => (
                <option key={timeslot.id} value={timeslot.id}>
                  {timeslot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label>Number of Attendees</label>
            <input
              type="number"
              name="number_of_attendees"
              value={formData.number_of_attendees}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditInfluencerForm
