import { useState } from 'react'
// import { Influencer } from '@/app/types/Influencer'
import { InfluencerWithId } from '@/app/types/InfluencerWithId'
import { Timeslot } from '@/app/types/Timeslot'
import { updateInfluencerOnAws } from '@/app/utils/updateInfluencerOnAws'

type EditFormProps = {
  influencer: InfluencerWithId | null
  timeslots: Timeslot[]
  onSubmit: (updatedData: InfluencerWithId) => void
  onClose: () => void
}

const EditInfluencerForm: React.FC<EditFormProps> = ({ influencer, timeslots, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<InfluencerWithId>({
    id: influencer?.id || '',  // id が必要なので、デフォルト値として空文字を設定
    created_at: influencer?.created_at || 0,  // created_at はタイムスタンプなので、0 で初期化
    full_name: influencer?.full_name || '',
    kana_name: influencer?.kana_name || '',
    email: influencer?.email || '',
    birthdate: influencer?.birthdate || '',
    is_attend: influencer?.is_attend || false,
    timeslot: influencer?.timeslot || undefined,
    number_of_attendees: influencer?.number_of_attendees || undefined,
    first_companion_name: influencer?.first_companion_name || '',
    second_companion_name: influencer?.second_companion_name || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!influencer) {
      return
    }

    try {
      await updateInfluencerOnAws(
        formData.id,
        formData.full_name,
        formData.kana_name,
        formData.email,
        formData.birthdate,
        formData.is_attend,
        formData.timeslot,
        formData.number_of_attendees,
        formData.first_companion_name,
        formData.second_companion_name
      );
    } catch(error) {
      console.log(error)
    }
    onSubmit(formData)
    onClose()
  }

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-background") {
      onClose()
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
        <h2 className="text-xl font-semibold mb-4">インフルエンサーを編集</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">お名前</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">かな</label>
            <input
              type="text"
              name="kana_name"
              value={formData.kana_name}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Eメールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">生年月日</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">参加時間帯</label>
            <select
              name="timeslot"
              value={formData.timeslot}
              onChange={handleChange}
              className="w-full border y-1 px-22"
            >
              {timeslots.map((timeslot) => (
                <option key={timeslot.id} value={timeslot.id}>
                  {timeslot.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="text-sm">参加人数</label>
            <input
              type="number"
              name="number_of_attendees"
              value={formData.number_of_attendees}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">1人目の同行者様</label>
            <input
              type="text"
              name="first_companion_name"
              value={formData.first_companion_name}
              onChange={handleChange}
              className="w-full border py-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">2人目の同行者様</label>
            <input
              type="text"
              name="second_companion_name"
              value={formData.second_companion_name}
              onChange={handleChange}
              className="w-full border py-1 px-2"
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

export default EditInfluencerForm