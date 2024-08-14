import { Link } from "react-router-dom";

const ModalComponent = ({ toggleModal, header, content }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-[24px] font-montserrat font-medium mb-4">
            {header}
          </h2>
          <p>{content}</p>
          <div className="mt-4 flex justify-end gap-4">
            {header === "Confirm Submit" && (
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={toggleModal}
              >
                Cancel
              </button>
            )}
            <Link
              to="/afterexam"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={toggleModal}
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
