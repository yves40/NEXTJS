"use client"

export default function () {

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.forEach( (data, idx) => {
      console.log(data);
    })
    for(const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  }

  return (
    <main className='u-main-container bg-white p-7 mt-32 mb-44'>
      <h1 className=' text-4xl mb-4'>Write an article ✏️</h1>
      <form action="" onSubmit={handleSubmit} className=' mb-6'>
        <label htmlFor="title" className='f-label'>Title</label>
        <input type="text" name="title" className=" shadow border rounded w-full p-3 mb-7 text-gray-700
        focus:outline-slate-400" 
          id="title" required placeholder="Your article title"/>
        <label htmlFor="markdownArticle" className="f-label">
          Write your article. Use markdown to get a smart view for users</label>
        <a className="block mb-4 text-blue-600" target="_blank" href="https://www.markdownguide.org/cheat-sheet/">
          How to use markdown syntax ?</a>
        <textarea name="markdownArticle" id="markdownArticle" 
          className=" min-h-44 text-xl shadow appearance-none border rounded w-full p-8
         text-gray-700 mb-4 focus:outline-slate-400"></textarea>
        <button className=" min-w-44 bg-indigo-500 hover:bg-indigo-700 text-white font-bold
         py-3 px-4 rounded border-none mb-4">
          Submit
        </button>
      </form>
    </main>
  )
}
