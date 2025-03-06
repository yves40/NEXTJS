import NavbarMarketing from '@/components/NavbarMarketing'


function layout({children}) {
  return (
    <>
      <NavbarMarketing></NavbarMarketing>
      {children}
    </>
  )
}

export default layout