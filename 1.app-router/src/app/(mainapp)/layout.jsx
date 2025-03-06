import Navbar from '@/components/Navbar'


function layout({children}) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  )
}

export default layout