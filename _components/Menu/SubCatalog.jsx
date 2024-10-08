
import Link from 'next/link'
export default function SubCatalog({data , localActive}){
  return (
         <div className="sub-catalog">
          <div className='sub-catalog-items'>
          {data && data.subCategories.map((subCategory , index) => (
          <div key={index} className="catalog-item">
            <Link href={`${data.category}/${subCategory.url}`}>
              {subCategory.name[localActive && localActive]}
            </Link>
          </div>
        ))}
          </div>
        </div>
  )
}
