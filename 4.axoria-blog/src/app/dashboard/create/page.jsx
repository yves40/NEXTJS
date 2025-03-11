"use client"

export default function () {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className='u-main-container bg-white p-7 mt-32 mb-44'>
      <h1 className=' text-4xl mb-4'>Write an article ✏️</h1>
      <form action="" onSubmit={handleSubmit} className=' mb-6'>
        <label htmlFor="title" className='f-label'>Title</label>
        <input type="text" name="title" className=" shadow border rounded w-full p-3 mb-7 text-gray-700" 
          id="title" required placeholder="Your article title"/>
      </form>
    </main>
  )
}
