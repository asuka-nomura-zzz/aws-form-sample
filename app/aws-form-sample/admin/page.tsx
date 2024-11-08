"use client";

import { useAppContext } from "@/app/hooks/useAppContext";
import React, { useState } from "react";
import EditInfluencerForm from "../components/EditInfluencerForm";
import EditTimeslotForm from "../components/EditTimeslotForm";
import { Influencer } from "@/app/types/Influencer";
import { Timeslot } from "@/app/types/Timeslot";

const AdminPage = () => {
  const { timeslotsFromAws: timeslots, influencersFromAws: influencers } =
    useAppContext();
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot | null>(
    null
  );

  const handleInfluencerEditSubmit = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/influencers/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Influencer data updated successfully!");
      } else {
        alert("Failed to update influencer data");
      }
    } catch (error) {
      console.error("Error updating influencer:", error);
    }
  };

  const handleTimeslotEditSubmit = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/timeslots/${updatedData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Timeslot data updated successfully!");
      } else {
        alert("Failed to update timeslot data");
      }
    } catch (error) {
      console.error("Error updating timeslot:", error);
    }
  };

  // Influencerの削除処理
  const handleDeleteInfluencer = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this influencer?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/influencers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Influencer deleted successfully!");
        // 削除後、表示されているインフルエンサーリストを更新
        // 必要なら再取得やstateの更新を行う
      } else {
        alert("Failed to delete influencer");
      }
    } catch (error) {
      console.error("Error deleting influencer:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Influencers */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Influencers</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Full Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Kana Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs w-[150px]">Birthdate</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Is Attend</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Timeslot</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Number of Attendees</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">First Companion Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Second Companion Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {influencers?.map((influencer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-xs truncate">{influencer.full_name}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs truncate">{influencer.kana_name}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.email}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.birthdate}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.is_attend ? "Yes" : "No"}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.timeslot}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.number_of_attendees}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.first_companion_name}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs">{influencer.second_companion_name}</td>
                <td className="border border-gray-200 px-4 py-2 text-xs flex gap-2">
                  <button
                    onClick={() => setSelectedInfluencer(influencer)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteInfluencer(influencer.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Timeslots */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Timeslots</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">ID</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">Stock</th>
              <th className="border border-gray-200 px-4 py-2 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeslots?.map((timeslot, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm">{timeslot.id}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{timeslot.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">{timeslot.stock}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  <button
                    onClick={() => setSelectedTimeslot(timeslot)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Edit
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
    </div>
  );
};

export default AdminPage;
