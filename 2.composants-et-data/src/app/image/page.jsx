import React from 'react'

async function page() {

  const cat = await fetch('https://cataas.com/cat');
  const cats10 = await fetch('https://cataas.com/api/cats?limit=4');
  const mycats = await cats10.json();

  // const res = await fetch("https://jsonplaceholder.typicode.com/photos/3")
  // const imgdata = await res.json();
  // console.log(imgdata);
  // via site no longer working
  console.log(cat);
  
  // console.log(mycats);  // Does not give the URL !!  

  return (
    <div>
      <h1 className=' m-10'>Une image</h1>
      <img className=' w-[500px] h-[500px] object-cover border-none rounded-2xl m-10' src={cat.url} alt="a cat" />
      <ul>
        {
          mycats.map( (one, idx) => (
            <li key={one.id}>
              <span>{idx} - {one.tags[0]}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default page