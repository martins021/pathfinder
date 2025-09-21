const LaunchBtn = ({ onClick, title, selected }) => {
  return(
    <button 
      onClick={onClick} 
      className="text-black bg-customWhite rounded-lg text-sm p-3 pl-10 pr-10 font-bold 
        hover:bg-customRed hover:text-customWhite transition-all duration-300"
    >
      {title}
    </button>
  )
};

export default LaunchBtn;