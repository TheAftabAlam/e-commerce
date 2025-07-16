import ArrowIcon from "../common/ArrowIcon"

const Card = ({ imagePath, title, description, actionArrow, height, width }) => {
  return (
    <div className="flex flex-col p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 group w-fit">
      {/* Image */}
      <img
        src={imagePath}
        alt={title}
        width={width ?? "200"}
        height={height ?? "220"}
        style={{
          height: height ?? "220px",
          width: width ?? "200px",
          objectFit: "cover",
        }}
        className="rounded-lg border hover:scale-105 transition-transform duration-300 cursor-pointer"
      />

      {/* Title and Description */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex flex-col">
          <p className="text-base font-medium text-gray-800">{title}</p>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>

        {/* Optional Arrow Icon */}
        {actionArrow && (
          <span className="pr-2 cursor-pointer hover:text-black/80">
            <ArrowIcon />
          </span>
        )}
      </div>
    </div>

  )
}

export default Card
