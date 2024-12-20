import { useState } from 'react'

type EditTimeslotFormProps = {
  timeslot: { id: string; name: string; stock: number }
  onSubmit: (updatedData: any) => void
  onClose: () => void
}

const EditTimeslotForm: React.FC<EditTimeslotFormProps> = ({ timeslot, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(timeslot)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  // モーダル外をクリックしたときにモーダルを閉じる処理
  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-background") {
      onClose() // モーダルを閉じる
    }
  }
  

  return (
    <div 
      id="modal-background" 
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">時間帯と残り枠を編集</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>時間帯</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-4">
            <label>枠の残り数</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              更新する
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTimeslotForm