import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className=" lg:max-w-xl lg:mx-auto">
        <h1 className="text-center mt-10 mb-10 text-4xl text-blue-600 italic font-semibold">This is the main page.jsx</h1>
        <p className=" mx-10">
          Often called the landing page. When requesting the / path, the user
          will see that page.
          From there he can navigate to any authorized page, depending on the profile he's been assigned.
          Profiles may be : 
        </p>
        <ul className=" mx-32 my-6">
          <li>Administrator</li>
          <li>Guest</li>
          <li>Registered customer</li>
          <li>Developer</li>
        </ul>
        <p className=" my-10 mx-10 border-blue-300">
          ESAPI (The OWASP Enterprise Security API) is a free, open source, web application security control library that makes it easier for programmers to write lower-risk applications. The ESAPI libraries are designed to make it easier for programmers to retrofit security into existing applications. The ESAPI libraries also serve as a solid foundation for new development.
          Allowing for language-specific differences, all OWASP ESAPI versions have the same basic design:          
        </p>
      </div>
    </div>
  );
}
