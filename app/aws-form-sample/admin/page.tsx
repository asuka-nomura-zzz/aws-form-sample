"use client";

import { useAppContext } from "@/app/hooks/useAppContext";
import React, { useState } from "react";
import EditInfluencerForm from "../components/EditInfluencerForm";
import EditTimeslotForm from "../components/EditTimeslotForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
// import { Influencer } from "@/app/types/Influencer";
import { Timeslot } from "@/app/types/Timeslot";
import toast from "react-hot-toast";
import { InfluencerWithId } from "@/app/types/InfluencerWithoutId";

const AdminPage = () => {
  const { timeslotsFromAws: timeslots, influencersFromAws: influencers } =
    useAppContext();
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<InfluencerWithId | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingInfluencerId, setDeletingInfluencerId] = useState<string | null>(null);

  const handleInfluencerEditSubmit = async (updatedData: any) => {
    try {
      // const response = await fetch(`/api/influencers/${updatedData.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updatedData),
      // });

      // if (response.ok) {
      //   alert("Influencer data updated successfully!");
      // } else {
      //   alert("Failed to update influencer data");
      // }
      console.log('influencer edited')
      toast.success('Influencer data updated successfully')
    } catch (error) {
      console.error("Error updating influencer:", error);
      toast.success('Failed to update influencer data')
    }
  };

  const handleTimeslotEditSubmit = async (updatedData: any) => {
    try {
      // const response = await fetch(`/api/timeslots/${updatedData.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(updatedData),
      // });

      // if (response.ok) {
      //   alert("Timeslot data updated successfully!");
      // } else {
      //   alert("Failed to update timeslot data");
      // }
      console.log('update succeeded') // for mock
      toast.success("timeslot data updated successfully!")
    } catch (error) {
      console.error("Error updating timeslot:", error)
      toast.success('Failed to update timeslot data')
    }
  };

  // Influencerの削除処理
  const handleDeleteInfluencer = (id: string) => {
    setDeletingInfluencerId(id);
    setShowDeleteModal(true); // モーダルを表示
  };

  const confirmDelete = async () => {
    if (!deletingInfluencerId) return;

    try {
      // 実際に削除処理を行う
      // const response = await fetch(`/api/influencers/${deletingInfluencerId}`, {
      //   method: "DELETE",
      // });

      console.log('delete succeeded');
      toast.success("Influencer deleted successfully!");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting influencer:", error);
      toast.error("Failed to delete influencer");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // モーダルを閉じる
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl text-center font-semibold text-gray-800 mb-6">
        管理画面
      </h1>

      {/* Influencers */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">インフルエンサーの一覧</h2>
      <div className="overflow-x-auto bg-white rounded-lg-lg shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                お名前
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                かな
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                Eメールアドレス
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs w-[150px]">
                生年月日
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                出席
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                参加時間帯
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                参加人数
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                1人目の同行者様
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                2人目の同行者様
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {influencers?.map((influencer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-xs truncate">
                  {influencer.full_name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs truncate">
                  {influencer.kana_name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.email}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.birthdate}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.is_attend ? "Yes" : "No"}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.timeslot}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.number_of_attendees}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.first_companion_name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs">
                  {influencer.second_companion_name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-xs text-center">
                  <button
                    onClick={() => setSelectedInfluencer(influencer)}
                    className="mb-1 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-400 transition duration-200"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDeleteInfluencer(influencer.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-400 transition duration-200 ml-2"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Timeslots */}
      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        時間帯と残り枠の一覧
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg-lg shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">
                ID
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">
                時間帯
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">
                枠の残り数
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {timeslots?.map((timeslot, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {timeslot.id}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {timeslot.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {timeslot.stock}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => setSelectedTimeslot(timeslot)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200"
                  >
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Influencer編集モーダル */}
      {selectedInfluencer && (
        <EditInfluencerForm
          influencer={selectedInfluencer}
          timeslots={timeslots}
          onSubmit={handleInfluencerEditSubmit}
          onClose={() => setSelectedInfluencer(null)}
        />
      )}

      {/* Timeslot編集モーダル */}
      {selectedTimeslot && (
        <EditTimeslotForm
          timeslot={{
            ...selectedTimeslot,
            id: String(selectedTimeslot.id),
          }}
          onSubmit={handleTimeslotEditSubmit}
          onClose={() => setSelectedTimeslot(null)}
        />
      )}

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          message="本当に削除しますか？"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AdminPage;
