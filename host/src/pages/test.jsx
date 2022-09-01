import  Load from "../../loader";

// const c = dynamic(loadScope("remote1","./widget"))

// const Component = Load("http://localhost:4000/remoteEntry.js","remote1","./widget")

export default function Home({ data }) {
  return (
   
    <div>
      Test
      <div id="container"></div>
      <Load url="http://localhost:4000/remoteEntry.js" scope="remote1" module="./widget"/>
    </div>
  );
}






