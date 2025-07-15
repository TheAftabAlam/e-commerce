import SectionHeading from '../SectionHeading/SectionHeading'
import Card from '../../Card/Card'

const Category = ({ title, data }) => {
  return (
    <>
      <SectionHeading title={title} />
      <div className="flex flex-wrap px-8">
        {data && data.map((ele, index) => (
          <Card
            key={ele?.id || index}  // Prefer a unique id if available!
            title={ele?.title}
            description={ele?.description}
            imagePath={ele?.image}
            actionArrow={true}
            height="280px"
            width="240px"
          />
        ))}
      </div>
    </>
  )
}

export default Category
