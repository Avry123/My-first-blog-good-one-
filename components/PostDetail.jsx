import React from "react";
import moment from "moment"
import { CalendarIcon } from '@heroicons/react/outline';

function PostDetail({post}) {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }
      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>)
      }
      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>)
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };


  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
     <div className="relative overflow-hidden shadow-md mb-6">
       <img 
         src={post.featuredImage.url}
         alt={post.title}
         className='object-top h-full w-full rounded-t-lg' />
       <div className="h-full w-full flex  px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full h-auto md: justify-around">
          {/* <div className="block lg:flex text-center items-center justify-center mb-8 w-full"> */}
        <div className="flex items-center justify-center w-full">
          <img
           className="align-middle rounded-full" 
            width="30px"
            height="30px"
            src={post.author.photo.url}
            alt={post.author.name}
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
        </div>
        <div className="flex items-center justify-center font-medium text-gray-700 w-full">
          <CalendarIcon className="h-6 w-6 text-pink-500" />
          {moment(post.createAt).format('MMM DD, YYYY')}
        </div>
      {/* </div> */}
          </div>
       </div>
     </div>
     <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
     {post.content.raw.children.map((typeObj , index) => {
       const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
       return getContentFragment(index, children, typeObj, typeObj.type)
     })}
    </div>
  )
}

export default PostDetail