const ButtonComponent = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-8 py-2 text-[16px] border-black/10 border-2xl rounded-2xl hover:scale-105 hover:border-black"
            }`}
        >
            {label}
        </button>
    );
};

export default ButtonComponent;
