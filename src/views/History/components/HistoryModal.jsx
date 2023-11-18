import React, { useEffect } from "react";
import { columns, data } from "./data";

const Modal = ({ transaction, onClose }) => {
  const modalClassName = transaction
    ? "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity ease-in-out duration-300"
    : "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 z-50 pointer-events-none transition-opacity ease-in-out duration-300";

  const modalContentClassName =
    "bg-white rounded-lg p-6 w-1/2 relative transition-all transform scale-0 opacity-0";

  useEffect(() => {
    if (transaction) {
      // Timeout to ensure the transition classes are applied after the component is mounted
      const timeoutId = setTimeout(() => {
        document.getElementById("modal-content").classList.remove("scale-0", "opacity-0");
        document.getElementById("modal-content").classList.add("scale-100", "opacity-100");
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [transaction]);

  return (
    <div className={modalClassName} onClick={onClose}>
      <div
        id="modal-content"
        className={modalContentClassName}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl mb-4">Transaction Details</h2>
        {/* Assuming 'columns' and 'transaction' are defined */}
        {columns.map((column) => (
          <div key={column.index} className="mb-3">
            <strong>{column.title}: </strong> {transaction[column.index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
