"use client";

import { useState } from "react";
import PcCard from "../components/PcCard";
import BookingModal from "../components/BookingModal";

type PcType = "standard" | "vip" | "console";

type SelectedPc = {
  name: string;
  type: PcType;
};

export default function PCsPage() {
  const [tab, setTab] = useState<PcType>("standard");
  const [selectedPc, setSelectedPc] = useState<SelectedPc | null>(null);

  return (
    <div className="pcsPage">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={tab === "standard" ? "tab active" : "tab"}
          onClick={() => setTab("standard")}
        >
          Standard
        </button>
        <button
          className={tab === "vip" ? "tab active" : "tab"}
          onClick={() => setTab("vip")}
        >
          VIP
        </button>
        <button
          className={tab === "console" ? "tab active" : "tab"}
          onClick={() => setTab("console")}
        >
          Console
        </button>
      </div>

      {/* Title */}
      <h2 className="pcsTitle">
        {tab === "standard" && "Стандартные ПК"}
        {tab === "vip" && "VIP Bootcamp"}
        {tab === "console" && "PlayStation 5"}
      </h2>

      {/* Cards */}
      <div className="pcsGrid">
        {tab === "standard" &&
          Array.from({ length: 16 }).map((_, i) => (
            <PcCard
              key={`standard-${i}`}
              name={`Toxic${i + 1}`}
              type="standard"
              onClick={() =>
                setSelectedPc({
                  name: `Toxic${i + 1}`,
                  type: "standard",
                })
              }
            />
          ))}

        {tab === "vip" &&
          Array.from({ length: 5 }).map((_, i) => (
            <PcCard
              key={`vip-${i}`}
              name={`VIP${i + 1}`}
              type="vip"
              onClick={() =>
                setSelectedPc({
                  name: `VIP${i + 1}`,
                  type: "vip",
                })
              }
            />
          ))}

        {tab === "console" && (
          <PcCard
            key="console-ps5"
            name="PlayStation 5"
            type="console"
            onClick={() =>
              setSelectedPc({
                name: "PlayStation 5",
                type: "console",
              })
            }
          />
        )}
      </div>

      {/* Booking Modal */}
      {selectedPc && (
        <BookingModal
          open={true}
          pcName={selectedPc.name}
          pcType={selectedPc.type}
          onClose={() => setSelectedPc(null)}
        />
      )}
    </div>
  );
}
